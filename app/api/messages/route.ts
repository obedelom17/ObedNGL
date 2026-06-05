import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const redis = Redis.fromEnv();

export async function GET() {
  try {
    const messages = (await redis.get('messages')) as any[] || [];
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }

    const messages = (await redis.get('messages')) as any[] || [];

    const newMessage = {
      id: Date.now().toString(),
      name: name?.trim() || 'Anonyme',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    await redis.set('messages', [newMessage, ...messages]);
    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
