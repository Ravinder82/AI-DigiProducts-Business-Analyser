import { GoogleGenAI, Type } from "@google/genai";
import type { MarketAnalysisResult, CompetitorAnalysisResult, GoToMarketStrategyResult, TrendDiscoveryResult, AgentSolutionResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Trend Discovery Agent (Agent 0) ---
export const getTrendingTopics = async (areaOfInterest: string): Promise<TrendDiscoveryResult> => {
  const prompt = `
    You are a trend-spotting expert for new business and product ideas.
    Your task is to analyze the provided "Area of Interest" to identify 5 distinct, emerging trends, products, or user needs that are gaining traction right now.
    Use your web search capabilities to look at Google Trends, popular forums (like Reddit), tech news, and social media discussions to find what's current.

    **Area of Interest:**
    "${areaOfInterest}"

    **Your Mission:**
    1.  **Deep Research:** Conduct web research to find specific, actionable trends within the given area. Avoid generic topics. Focus on new software, apps, websites, or specific user problems being discussed.
    2.  **Identify 5 Trends:** Curate a list of the 5 most promising trends.
    3.  **Provide Details:** For each trend, you must provide:
        - A concise \`topicName\`.
        - A \`reasonForTrend\`, explaining why this is gaining traction now.
        - An \`exampleDiscussion\`, which is a realistic quote you might find on a forum like Reddit or Twitter discussing this topic.

    **Output Format:**
    You MUST respond with a single, valid JSON object. Do not add any commentary or markdown formatting before or after the JSON. The JSON structure MUST be as follows:
    {
      "trendingTopics": [
        {
          "topicName": "The name of the specific trend.",
          "reasonForTrend": "A brief explanation of why this is a growing trend.",
          "exampleDiscussion": "A realistic user quote expressing a need or opinion on this topic."
        }
      ]
    }
  `;

  // FIX: Hoist response variable to be accessible in the catch block.
  let response: any;
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a trend-spotting expert for new business ideas. Your goal is to identify emerging trends based on web research. Your output must be a single, valid JSON object following the specified structure, containing a 'trendingTopics' array.",
        tools: [{googleSearch: {}}],
      },
    });

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let jsonText = response.text.trim();

    if (jsonText.startsWith("```json")) {
        jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.substring(3, jsonText.length - 3).trim();
    }

    const parsedData = JSON.parse(jsonText);
    
    if (!parsedData.trendingTopics || !Array.isArray(parsedData.trendingTopics)) {
        throw new Error("Invalid data structure received from API: missing trendingTopics array.");
    }
    return { ...parsedData, groundingMetadata };
  } catch (error) {
    console.error("Error fetching or parsing trend discovery:", error);
    if (error instanceof SyntaxError) {
      // FIX: response is now in scope, allowing access to the raw response text for debugging.
      const rawResponseText = response.text; // Assume response is in scope
      console.error("Failed to parse JSON. Raw AI response:", rawResponseText);
      throw new Error("Failed to parse the AI's response (invalid JSON). Check the console for the raw output.");
    }
    throw new Error("An unexpected error occurred communicating with the AI service.");
  }
};


// --- Market Verification Agent ---
const marketAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    painPoints: {
      type: Type.ARRAY,
      description: "Top 5 pain points that people in the specified industry express online.",
      items: {
        type: Type.OBJECT,
        properties: {
          point: { type: Type.STRING, description: "A concise summary of the pain point." },
          exampleQuote: { type: Type.STRING, description: "A realistic, representative quote from a persona expressing this need." },
          emotionalImpact: { type: Type.STRING, description: "The emotional toll or frustration this problem causes." },
          workaround: { type: Type.STRING, description: "The current, often inefficient, method people use to solve this." },
          cost: { type: Type.STRING, description: "The estimated time or money this problem costs the individual or business." },
        },
        required: ["point", "exampleQuote", "emotionalImpact", "workaround", "cost"]
      }
    },
    insufficientSolutions: { type: Type.STRING, description: "An analysis of existing solutions, explaining why they are insufficient." },
    undervaluedSegment: { type: Type.STRING, description: "A specific audience segment that is most overlooked or underserved." },
    idealSolution: { type: Type.STRING, description: "A description of what an ideal digital product would look like for this audience." },
    confirmationMethods: { type: Type.STRING, description: "Actionable steps to confirm the existence of this market gap before building." }
  },
  required: ["painPoints", "insufficientSolutions", "undervaluedSegment", "idealSolution", "confirmationMethods"]
};

export const getMarketAnalysis = async (industry: string, isDeeper: boolean = false): Promise<MarketAnalysisResult> => {
  const userPrompt = `Analyze the market for the "${industry}" industry. Provide a detailed report following the specified JSON format. For each pain point, create a realistic, representative quote of someone expressing this need and present it in quote format. ${isDeeper ? "Please perform a deeper, more nuanced analysis, uncovering subtle trends and less obvious pain points." : ""}`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are a world-class market research specialist. Your goal is to identify unmet needs in a given industry that could be addressed with a digital product. You must provide detailed, actionable insights based on analyzing online discussions, market trends, and existing solutions. Your analysis must be structured, objective, and backed by plausible examples. Your output must strictly adhere to the provided JSON schema.",
        responseMimeType: "application/json",
        responseSchema: marketAnalysisSchema,
      },
    });
    const parsedData = JSON.parse(response.text.trim());
    if (!parsedData.painPoints || !Array.isArray(parsedData.painPoints)) {
        throw new Error("Invalid data structure received from API: missing painPoints array.");
    }
    return parsedData as MarketAnalysisResult;
  } catch (error) {
    console.error("Error fetching or parsing market analysis:", error);
    if (error instanceof SyntaxError) throw new Error("Failed to parse the AI's response (invalid JSON).");
    throw new Error("An unexpected error occurred communicating with the AI service.");
  }
};

// --- Competitor Analysis Agent ---
const competitorAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    competitors: {
      type: Type.ARRAY,
      description: "The top 5 competing products that solve the specified problem.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the competing product." },
          usp: { type: Type.STRING, description: "Their unique selling proposition." },
          pricing: { type: Type.STRING, description: "Price structure and market positioning." },
          keyFeatures: { type: Type.STRING, description: "The key features they heavily focus on." },
          customerLikes: { type: Type.STRING, description: "What customers praise, based on reviews/testimonials." },
          customerComplaints: { type: Type.STRING, description: "What they fall short of; common customer complaints." },
          marketingStrategy: { type: Type.STRING, description: "Their content and marketing strategy." },
          featureCompleteness: { type: Type.NUMBER, description: "A numerical score from 1 to 100 representing how complete their feature set is for solving the target problem." }
        },
        required: ["name", "usp", "pricing", "keyFeatures", "customerLikes", "customerComplaints", "marketingStrategy", "featureCompleteness"]
      }
    },
    marketGaps: {
      type: Type.ARRAY,
      description: "3 specific, actionable gaps in the market based on the competitor analysis.",
      items: {
          type: Type.OBJECT,
          properties: {
              gap: { type: Type.STRING, description: "A concise summary of the market gap (e.g., 'Lack of a mobile-first solution', 'No entry-level pricing tier')."},
              description: { type: Type.STRING, description: "A detailed explanation of the gap, citing weaknesses in competitor offerings." }
          },
          required: ["gap", "description"]
      }
    }
  },
  required: ["competitors", "marketGaps"]
};

export const getCompetitorAnalysis = async (industry: string, problem: string): Promise<CompetitorAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a business analyst conducting competitor analysis for a digital product in the "${industry}" industry. The product is meant to solve this specific problem: "${problem}". Provide a strategic analysis, including a numerical 'featureCompleteness' score from 1-100 for each competitor. Adhere strictly to the JSON schema.`,
      config: {
        systemInstruction: "You are a senior business analyst specializing in competitive intelligence for digital products. Your analysis must be sharp, strategic, and actionable. For the given industry and problem, you will identify top competitors, dissect their strategies, and provide a numerical score (1-100) for their feature completeness. Your primary goal is to uncover exploitable gaps in the market. Your output must be structured, objective, and strictly adhere to the provided JSON schema.",
        responseMimeType: "application/json",
        responseSchema: competitorAnalysisSchema,
      },
    });
    const parsedData = JSON.parse(response.text.trim());
    if (!parsedData.competitors || !Array.isArray(parsedData.competitors)) {
        throw new Error("Invalid data structure received from API: missing competitors array.");
    }
    return parsedData as CompetitorAnalysisResult;
  } catch (error) {
    console.error("Error fetching or parsing competitor analysis:", error);
    if (error instanceof SyntaxError) throw new Error("Failed to parse the AI's response (invalid JSON).");
    throw new Error("An unexpected error occurred communicating with the AI service.");
  }
};


// --- Go-to-Market Strategy Agent ---
export const getGoToMarketStrategy = async (
  marketAnalysis: MarketAnalysisResult,
  competitorAnalysis: CompetitorAnalysisResult
): Promise<GoToMarketStrategyResult> => {
  const prompt = `
    You are a senior Go-to-Market strategist and venture capitalist. Your expertise is in evaluating new business ideas based on market data.
    Your task is to analyze the provided market and competitor data to first identify a precise target audience and their core problems, then produce a list of crucial market indicators and strategic red flags.

    **Market Verification Data (Agent 1 Output):**
    ${JSON.stringify(marketAnalysis, null, 2)}

    **Competitor Analysis Data (Agent 2 Output):**
    ${JSON.stringify(competitorAnalysis, null, 2)}

    **Your Mission:**
    1.  **Synthesize and Research:** Synthesize the data above. Use your deep research and web search capabilities to refine the "undervaluedSegment", "painPoints", and "marketGaps" into a concrete user profile.
    2.  **Define Audience & Problems:** Clearly define the most promising target audience and summarize the specific problems they face that a new product could solve.
    3.  **Generate Strategic Outline:** Based on your new definition of the audience and problems, and the competitive landscape, generate:
        - 5 specific, actionable signals that would confirm strong market interest.
        - 5 critical red flags that suggest the idea should be pivoted or abandoned.

    **Output Format:**
    You MUST respond with a single, valid JSON object. Do not add any commentary or markdown formatting before or after the JSON. The JSON structure MUST be as follows:
    {
      "targetAudience": "A detailed description of the most promising target audience, synthesized from the provided data and your research.",
      "identifiedProblems": "A summary of the specific, high-priority problems this audience faces, derived from pain points, market gaps, and your research.",
      "marketInterestIndicators": [
        {
          "indicator": "A concise summary of the market interest indicator.",
          "description": "A detailed explanation of what to look for and how to measure it."
        }
      ],
      "redFlags": [
        {
          "flag": "A concise summary of the red flag.",
          "description": "A detailed explanation of the warning sign and its implications."
        }
      ]
    }
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior Go-to-Market strategist and venture capitalist. Your expertise lies in evaluating new business ideas based on market data. Your task is to analyze the provided competitor analysis and target audience profile to produce a list of crucial market indicators and strategic red flags. Your insights must be sharp, actionable, and directly tied to the data provided. Your output must strictly adhere to the provided JSON structure.",
        tools: [{googleSearch: {}}],
      },
    });

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let jsonText = response.text.trim();

    if (jsonText.startsWith("```json")) {
        jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.substring(3, jsonText.length - 3).trim();
    }

    const parsedData = JSON.parse(jsonText);
    
     if (!parsedData.targetAudience || !parsedData.identifiedProblems || !parsedData.marketInterestIndicators || !parsedData.redFlags) {
        throw new Error("Invalid data structure received from API.");
    }
    return { ...parsedData, groundingMetadata };
  } catch (error) {
    console.error("Error fetching or parsing GTM strategy:", error);
    throw new Error("An unexpected error occurred communicating with the AI service.");
  }
};


// --- Agent Solution (Final Agent) ---
export const getAgentSolution = async (
    trendResult: TrendDiscoveryResult,
    marketResult: MarketAnalysisResult,
    competitorResult: CompetitorAnalysisResult,
    gtmResult: GoToMarketStrategyResult
): Promise<AgentSolutionResult> => {
    const prompt = `
    You are the final brain of a multi-agent AI system, a master strategist with the combined knowledge of a world-class software architect, a venture capitalist, a research scientist like Stephen Hawking, a creative problem-solver like Einstein, and a web researcher with the skills of a black-hat hacker.
    Your mission is to synthesize all the intelligence gathered from the previous agents to produce the world's most detailed, organized, and actionable implementation blueprint for a new digital product.

    **INTELLIGENCE BRIEFING (DATA FROM PREVIOUS AGENTS):**

    **1. Trend Discovery:**
    ${JSON.stringify(trendResult.trendingTopics, null, 2)}

    **2. Market Verification:**
    ${JSON.stringify(marketResult, null, 2)}

    **3. Competitor Analysis:**
    ${JSON.stringify(competitorResult, null, 2)}

    **4. Go-to-Market Strategy:**
    ${JSON.stringify(gtmResult, null, 2)}

    **YOUR DIRECTIVES:**

    1.  **Synthesize and Envision:** Review all the data above. Formulate a single, cohesive vision for the ideal solution.
    2.  **Conduct Deep Research:** Use your advanced web search capabilities to find the most modern, efficient, and powerful tools to build this solution. Look for cutting-edge technologies, APIs, and frameworks that competitors are not using.
    3.  **Architect the Blueprint:** Construct a detailed implementation plan. Address every small point and provide concrete solutions.

    **OUTPUT FORMAT:**
    You MUST respond with a single, valid JSON object. Do not add any commentary or markdown formatting. The JSON structure MUST be as follows:
    {
      "solutionOverview": "A high-level, inspiring summary of the product vision.",
      "coreFeatures": [
        {
          "feature": "A concise name for the core feature.",
          "description": "A detailed description of how the feature works from a user's perspective.",
          "userProblemSolved": "Clearly state which specific user pain point this feature directly solves, referencing the market analysis."
        }
      ],
      "techStack": [
        {
          "category": "Frontend | Backend | Database | AI / ML Model | Deployment | Other",
          "tool": "The specific name of the tool, library, or service (e.g., 'React', 'Node.js', 'Gemini Pro API', 'Vercel').",
          "justification": "A strong, data-driven reason for choosing this tool. Explain why it's better than alternatives for this specific project."
        }
      ],
      "implementationRoadmap": [
        {
          "phase": "e.g., 'Phase 1: MVP Launch'",
          "duration": "An estimated timeframe (e.g., '3-4 Weeks').",
          "milestones": ["A list of specific, achievable goals for this phase."]
        }
      ],
      "risksAndMitigations": [
          {
              "risk": "A potential technical, market, or execution risk.",
              "mitigation": "A proactive strategy to mitigate this risk."
          }
      ],
      "ethicalConsiderations": "A brief analysis of potential ethical issues (e.g., data privacy, algorithmic bias) and how to address them responsibly."
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a master AI strategist and solution architect. Your task is to synthesize intelligence from multiple sources and produce a detailed, structured implementation blueprint in JSON format. You must perform deep web research to inform your technical recommendations. Your output must strictly adhere to the provided JSON structure.",
                tools: [{googleSearch: {}}],
            },
        });

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        let jsonText = response.text.trim();

        if (jsonText.startsWith("```json")) {
            jsonText = jsonText.substring(7, jsonText.length - 3).trim();
        } else if (jsonText.startsWith("```")) {
            jsonText = jsonText.substring(3, jsonText.length - 3).trim();
        }

        const parsedData = JSON.parse(jsonText);
        
        if (!parsedData.solutionOverview || !parsedData.coreFeatures || !parsedData.techStack || !parsedData.implementationRoadmap) {
            throw new Error("Invalid data structure received from API for Agent Solution.");
        }
        return { ...parsedData, groundingMetadata };

    } catch (error) {
        console.error("Error fetching or parsing Agent Solution:", error);
        if (error instanceof SyntaxError) {
            throw new Error("Failed to parse the AI's response (invalid JSON) for the final blueprint.");
        }
        throw new Error("An unexpected error occurred while generating the final blueprint.");
    }
};