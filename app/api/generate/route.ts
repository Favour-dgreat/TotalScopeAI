export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ContentType } from '@/lib/types';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define a threshold for document summarization (e.g., 5000 characters)
// Documents longer than this will be summarized before being passed to the main prompt.
const SUMMARIZATION_THRESHOLD_CHARS = 5000;

/**
 * Summarizes a given document content using the Gemini model.
 * @param document The full text content of the document to summarize.
 * @returns A promise that resolves to the summarized text.
 */
async function summarizeDocument(document: string): Promise<string> {
  console.log('Summarizing document...');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Please summarize the following document concisely, focusing on key features, value propositions, and information relevant for creating marketing and social media content. The summary should be no more than 500 words.

<DOCUMENT_TO_SUMMARIZE>
${document}
</DOCUMENT_TO_SUMMARIZE>

Provide only the summary, without any conversational text or introductions.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const summary = result.response.text();
    if (!summary) {
      console.warn('Summarization returned an empty response.');
      return 'Could not generate a summary.'; // Fallback summary
    }
    console.log('Document summarized successfully.');
    return summary;
  } catch (error) {
    console.error('Error during document summarization:', error);
    // Return a fallback or re-throw depending on desired error handling
    return 'Failed to summarize document. Using original content (if within limits) or generating without specific document context.';
  }
}


/**
 * Handles POST requests to generate content.
 * Integrates document content for AI generation, with summarization for large documents.
 * @param req The NextRequest object containing the request body.
 * @returns A NextResponse object with the generated content or an error.
 */
export async function POST(req: NextRequest) {
  // 1. API Key Validation
  if (!process.env.GEMINI_API_KEY) {
    console.error('Gemini API key is missing');
    return NextResponse.json(
      { error: 'Gemini API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // 2. Destructure Request Body
    const {
      contentType,
      tokenName,
      // tokenSymbol is not used in generatePrompt, consider if it's truly needed or remove
      niche,
      contentIdea,
      targetAudience,
      tone,
      cta,
      documentContent // Optional: The text content of the uploaded document
    } = await req.json();

    // 3. Input Validation
    // Basic validation for essential fields. DocumentContent is optional.
    if (!contentType || !tokenName || !niche) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, tokenName, or niche' },
        { status: 400 }
      );
    }

    console.log('Received request:', {
      contentType,
      tokenName,
      niche,
      contentIdea,
      targetAudience,
      tone,
      cta,
      documentContent: documentContent ? `[Document Content Received, length: ${documentContent.length}]` : 'No document content', // Log presence and length
    });

    // **Optimization: Summarize large documents before passing to the main prompt**
    let processedDocumentContent = documentContent;
    if (documentContent && documentContent.length > SUMMARIZATION_THRESHOLD_CHARS) {
      console.log(`Document content exceeds ${SUMMARIZATION_THRESHOLD_CHARS} characters. Attempting summarization.`);
      processedDocumentContent = await summarizeDocument(documentContent);
      console.log(`Summarized document length: ${processedDocumentContent.length}`);
    } else if (documentContent) {
      console.log('Document content is within threshold, using as-is.');
    }


    // 4. Generate AI Prompt
    const prompt = generatePrompt(
      contentType,
      tokenName,
      niche,
      contentIdea,
      targetAudience,
      tone,
      cta,
      processedDocumentContent // Pass the potentially summarized document content
    );
    console.log('Generated prompt (first 500 chars):', prompt.substring(0, 500) + (prompt.length > 500 ? '...' : ''));

    // 5. Initialize Generative Model
    // Using gemini-2.5-flash for its balance of performance and cost.
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    // 6. Call Gemini API
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    // 7. Process AI Response
    const response = result.response.text();

    if (!response) {
      throw new Error('No text response received from Gemini API');
    }

    console.log('Gemini raw response (first 500 chars):', response.substring(0, 500) + (response.length > 500 ? '...' : ''));

    // 8. Parse and Return Content
    const items = parseResponse(response, contentType);
    console.log('Parsed items:', items);

    return NextResponse.json({ items });

  } catch (error) {
    // 9. Centralized Error Handling
    console.error('Error generating content:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while generating content',
      },
      { status: 500 }
    );
  }
}

/**
 * Generates a tailored prompt for the AI based on content type and parameters,
 * crucially integrating document content if provided.
 * @param contentType The type of content to generate (tweet, announcement, narrative, hashtag).
 * @param tokenName The name of the token.
 * @param niche The niche of the token.
 * @param contentIdea Optional: A specific idea or topic for the content.
 * @param targetAudience Optional: The target audience for the content.
 * @param tone Optional: The desired tone of the content.
 * @param cta Optional: A call to action to include.
 * @param documentContent Optional: The full text content of the uploaded document (or its summary).
 * @returns A string representing the prompt for the AI.
 */
function generatePrompt(
  contentType: ContentType,
  tokenName: string,
  niche: string,
  contentIdea?: string,
  targetAudience?: string,
  tone?: string,
  cta?: string,
  documentContent?: string // This will now receive either original or summarized content
): string {
  // **Core Optimization: Integrating Document Content into the Prompt**
  let contextBasis: string;
  if (documentContent && documentContent.length > 0) {
    // If document content (original or summarized) exists, use it as the primary context.
    // It's crucial to instruct the AI to reference this document.
    // Wrap the document content in clear delimiters to help the AI distinguish it.
    contextBasis = `Based *strictly* on the following project documentation provided in <DOCUMENT_CONTENT> tags, generate content. Prioritize information from this document.
<DOCUMENT_CONTENT>
${documentContent}
</DOCUMENT_CONTENT>
For ${tokenName} in the ${niche} space${targetAudience ? `, targeting ${targetAudience}` : ''}.`;
  } else {
    // Fallback to previous base details if no document content is provided.
    contextBasis = `About ${tokenName} in the ${niche} space${
      targetAudience ? `, targeting ${targetAudience}` : ''
    }.`;
  }

  // Optional styling and call to action additions remain the same
  const style = tone ? ` Use a ${tone.toLowerCase()} tone.` : '';
  const callToAction = cta ? ` End with a clear Call to Action: "${cta}".` : '';

  // Instructions for AI output format (remains the same for consistency)
  const formatInstruction = 'Your response should ONLY contain the generated content, formatted as a numbered list. Do not include any conversational text, introductions, or conclusions.';

  // Construct the final prompt based on content type, now always including `contextBasis`
  switch (contentType) {
    case 'tweet':
      return `You are a highly skilled Social Media Manager. ${contextBasis}${
        contentIdea ? ` Specifically for a tweet about: "${contentIdea}".` : ''
      }${style}${callToAction} Create 5 engaging tweets. Each tweet must be a standalone item in the numbered list, under 280 characters, and include 2-3 highly relevant hashtags. Make them sound really good, and based on the content idea provided. ${formatInstruction}`;

    case 'announcement':
      return `You are a professional Community Manager. ${contextBasis}${
        contentIdea ? ` Specifically focus the announcement on: "${contentIdea}".` : ''
      }${style}${callToAction} Create 3 concise and professional community announcements for platforms like Discord or Telegram. Each announcement should be a distinct item in the numbered list. Use clear formatting (e.g., bullet points, bolding, line breaks) and include relevant emojis where appropriate to enhance readability. ${formatInstruction}`;

    case 'narrative':
      return `You are a compelling storyteller in the crypto space. ${contextBasis}${
        contentIdea ? ` Focus the narrative on: "${contentIdea}".` : ''
      }${style}${callToAction} Write 3 distinct crypto narratives. Each narrative should be a short, story-driven post (approximately 100-150 words) in the numbered list that aligns with current market trends and highlights the project's unique value proposition and potential impact. Ensure each narrative is unique and engaging. ${formatInstruction}`;

    case 'hashtag':
      // Hashtags might not directly use document content for ideas, but it provides context for relevance
      return `You are a social media optimization expert. ${contextBasis}${style} Generate 10 highly relevant and discoverable hashtags. Provide them as a numbered list, with one hashtag per line. Do not include any other text. ${formatInstruction}`;

    default:
      // Fallback prompt, still uses contextBasis for unknown types
      return `Generate content about the project described. ${contextBasis}${style}${callToAction}. ${formatInstruction}`;
  }
}

/**
 * Parses the AI's raw text response into a structured array of content items.
 * It expects the AI to return a numbered list.
 * @param response The raw text response from the AI.
 * @param contentType The type of content that was requested.
 * @returns An array of objects, each representing a generated content item.
 */
function parseResponse(response: string, contentType: ContentType) {
  // Split the response into lines and filter out empty ones.
  // Then, map each line to trim whitespace and remove common numbered list prefixes (e.g., "1. ", "2. ").
  const items = response
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // Use a regex to remove "1. ", "2) ", "1- ", etc., from the start of the line
      const cleanContent = line.replace(/^\d+\s*[.)-]?\s*/, '').trim();
      return cleanContent;
    })
    .filter((content) => content.length > 0); // Ensure content is not empty after cleaning

  // Map the cleaned content to the desired output structure
  return items.map((content, index) => ({
    id: (index + 1).toString(), // Assign a simple ID
    type: contentType, // Assign the content type
    content: content, // The cleaned content
  }));
}
