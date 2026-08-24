const apiUrl = import.meta.env.VITE_AI_API_URL || '/api/chat'

export async function sendChatMessage(messages) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) {
    throw new Error(`AI request failed (${response.status})`)
  }

  const data = await response.json()
  const reply = data.reply || data.message?.content || data.choices?.[0]?.message?.content

  if (!reply) {
    throw new Error('The AI API returned no reply.')
  }

  return reply
}
