export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ContentType } from '@/lib/types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Gemini API key is missing');
    return NextResponse.json(
      { error: 'Gemini API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { contentType, tokenName, tokenSymbol, niche, contentIdea } = await req.json();

    if (!contentType || !tokenName || !tokenSymbol || !niche) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Received request:', { contentType, tokenName, tokenSymbol, niche, contentIdea });

    const prompt = generatePrompt(contentType, tokenName, tokenSymbol, niche, contentIdea);
    console.log('Generated prompt:', prompt);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    });

    const response = result.response.text();

    if (!response) {
      throw new Error('No response from Gemini');
    }

    console.log('Gemini response:', response);
    const items = parseResponse(response, contentType);
    console.log('Parsed items:', items);

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}

function generatePrompt(
  contentType: ContentType,
  tokenName: string,
  tokenSymbol: string,
  niche: string,
  contentIdea?: string
): string {
  switch (contentType) {
    case 'tweet':
return `Generate 5 engaging and unique tweets about ${tokenName}  which is in the ${niche} space.${
        contentIdea ? ` Focus on: ${contentIdea}.` : ''
      } Include relevant hashtags and make them sound authentic, not promotional. Each tweet should be under 280 characters.` 
          
    case 'announcement':
      return `Create 3 professional community announcements for ${tokenName} ($${tokenSymbol}) in the ${niche} niche that could be posted on Discord or Telegram. Include emoji where appropriate and format them to be easily readable.`
    
    case 'narrative':
      return `Create 3 compelling crypto narratives for ${tokenName} ($${tokenSymbol}) in the ${niche} sector. Each narrative should be a short, engaging story that positions the project within current market trends and technological developments. Focus on unique value propositions and potential market impact. Include relevant industry context and market dynamics.`
    
    case 'hashtag':
      return `Generate 3 sets of trending hashtags that would be relevant for ${tokenName} ($${tokenSymbol}) in the ${niche} space. Include both specific and general crypto/web3 hashtags to maximize reach. Each set should have 8-10 hashtags.`
    
    default:
      return `Generate content about ${tokenName} ($${tokenSymbol}) in the ${niche} space.`
  }
}

function parseResponse(response: string, contentType: ContentType) {
  const lines = response.split('\n').filter(line => line.trim());
  const items: any[] = [];

  lines.forEach((line, index) => {
    const content = line.replace(/^(Tweet|Announcement|Narrative|Hashtags):\s*/, '').trim();
    if (content) {
      items.push({
        id: (index + 1).toString(),
        type: contentType,
        content: content,
      });
    }
  });

  return items;
}
