import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { messages } = req.body

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages are required.' })
    }

    const input = messages.map((message) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: message.text,
    }))

    const response = await client.responses.create({
      model: 'gpt-5.6',
      input,
    })

    return res.status(200).json({
      reply: response.output_text,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'The AI could not respond right now.',
    })
  }
}