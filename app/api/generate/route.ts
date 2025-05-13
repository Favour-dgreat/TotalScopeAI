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
    const { contentType, tokenName, tokenSymbol, niche } = await req.json();

    if (!contentType || !tokenName || !tokenSymbol || !niche) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Received request:', { contentType, tokenName, tokenSymbol, niche });

    const prompt = generatePrompt(contentType, tokenName, tokenSymbol, niche);
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
  niche: string
): string {
  switch (contentType) {
    case 'tweet':
      return `Generate 5 engaging and unique tweets about ${tokenName} ($${tokenSymbol}) which is in the ${niche} space. Include relevant hashtags and make them sound authentic, not promotional. Each tweet should be under 280 characters. Format each tweet on a new line starting with "Tweet: "`;

    case 'announcement':
      return `Create 3 professional community announcements for ${tokenName} ($${tokenSymbol}) in the ${niche} niche that could be posted on Discord or Telegram. Include emoji where appropriate and format them to be easily readable. Format each announcement starting with "Announcement: "`;

    case 'meme':
      return `Describe 3 crypto memes for ${tokenName} ($${tokenSymbol}) in the ${niche} sector. Each description should explain what the meme would look like visually, using popular crypto meme formats and templates. Be creative and humorous. Format each meme description starting with "Meme: "`;

    case 'hashtag':
      return `Generate 3 sets of trending hashtags that would be relevant for ${tokenName} ($${tokenSymbol}) in the ${niche} space. Include both specific and general crypto/web3 hashtags to maximize reach. Each set should have 8-10 hashtags. Format each set starting with "Hashtags: "`;

    default:
      return `Generate content about ${tokenName} ($${tokenSymbol}) in the ${niche} space.`;
  }
}

function parseResponse(response: string, contentType: ContentType) {
  const lines = response.split('\n').filter(line => line.trim());
  const items: any[] = [];

  lines.forEach((line, index) => {
    const content = line.replace(/^(Tweet|Announcement|Meme|Hashtags):\s*/, '').trim();
    if (content) {
      items.push({
        id: (index + 1).toString(),
        type: contentType,
        content,
        ...(contentType === 'meme' && {
          imageUrl: `https://images.pexels.com/photos/${5980866 + index}/pexels-photo-${5980866 + index}.jpeg?auto=compress&cs=tinysrgb&w=600`
        })
      });
    }
  });

  return items;
}
