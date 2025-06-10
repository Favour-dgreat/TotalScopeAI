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
    const {
      contentType,
      tokenName,
      tokenSymbol,
      niche,
      contentIdea,
      targetAudience,
      tone,
      cta,
    } = await req.json();

    if (!contentType || !tokenName || !tokenSymbol || !niche) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Received request:', {
      contentType,
      tokenName,
      tokenSymbol,
      niche,
      contentIdea,
      targetAudience,
      tone,
      cta,
    });

    const prompt = generatePrompt(
      contentType,
      tokenName,
      niche,
      contentIdea,
      targetAudience,
      tone,
      cta
    );
    console.log('Generated prompt:', prompt);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
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
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to generate content',
      },
      { status: 500 }
    );
  }
}

function generatePrompt(
  contentType: ContentType,
  tokenName: string,
  niche: string,
  contentIdea?: string,
  targetAudience?: string,
  tone?: string,
  cta?: string
): string {
  const baseDetails = `${tokenName} in the ${niche} space${
    targetAudience ? `, targeting ${targetAudience}` : ''
  }.`;

  const style = tone ? ` Use a ${tone.toLowerCase()} tone.` : '';
  const callToAction = cta ? ` End with a CTA: ${cta}` : '';

  switch (contentType) {
    case 'tweet':
      return `You are the Social media manager, please create 5 engaging tweets for ${baseDetails}${
        contentIdea ? ` taking an example from: ${contentIdea}.` : ''
      }${style}${callToAction} Include relevant hashtags and keep each tweet under 500 characters. Make them sound really good, and based on the content idea provided.`;

    case 'announcement':
      return `Create 3 professional community announcements for ${baseDetails}${
        contentIdea ? ` Focus on: ${contentIdea}.` : ''
      }${style}${callToAction} These announcements are for Discord or Telegram. Include emoji where appropriate and make the formatting easy to read.`;

    case 'narrative':
      return `Write 3 compelling crypto narratives for ${baseDetails}${
        contentIdea ? ` Focus on: ${contentIdea}.` : ''
      }${style}${callToAction} Each should be a short, story-driven post that aligns with current market trends and highlights the project's unique value proposition and potential impact.`;

    case 'hashtag':
      return `Generate 3 sets of trending hashtags for ${baseDetails}${style}. Each set should contain 8-10 hashtags, combining specific and broad crypto/web3-related keywords to maximize reach.`;

    default:
      return `Generate content about ${baseDetails}${style}${callToAction}`;
  }
}

function parseResponse(response: string, contentType: ContentType) {
  const lines = response.split('\n').filter((line) => line.trim());
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
