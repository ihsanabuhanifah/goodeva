import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getRecommendation(problem_desc: string): Promise<string> {
    if (!problem_desc) return 'Deskripsi masalah tidak ditemukan.';

    const prompt = `
    Kamu adalah asisten ahli yang memberikan solusi praktis terhadap masalah teknis.
    Masalah: ${problem_desc}
    Berikan saran atau solusi singkat dan jelas untuk masalah tersebut .
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content || 'Tidak ada rekomendasi ditemukan.';
  }
}
