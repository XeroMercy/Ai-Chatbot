import { useState } from 'react'
import { sendChatMessage } from './api'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || isLoading) return

    const userMessage = { id: Date.now(), role: 'user', text: trimmedQuestion }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setQuestion('')
    setError('')
    setIsLoading(true)

    try {
      const reply = await sendChatMessage(nextMessages)
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: Date.now() + 1, role: 'assistant', text: reply },
      ])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="chat-app">
      <section id="center" className="chat-panel">
        <div className="chat-heading">
          <span className="status-dot" aria-hidden="true"></span>
          <div>
            <p className="eyebrow">AI assistant</p>
            <h1>What can I help you with?</h1>
          </div>
        </div>

        <div className="messages" aria-live="polite">
          {messages.length === 0 ? (
            <p className="empty-message">Ask a question to start the conversation.</p>
          ) : (
            messages.map((message) => (
              <div className={`${message.role}-bubble`} key={message.id}>
                {message.text}
              </div>
            ))
          )}
          {isLoading && <p className="loading-message">Thinking...</p>}
          {error && <p className="error-message" role="alert">{error}</p>}
        </div>

        <form className="question-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="question">
            Your question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Type your question..."
            rows="1"
          />
          <button
            type="submit"
            aria-label="Send question"
            disabled={!question.trim() || isLoading}
          >
            <span aria-hidden="true">&#8593;</span>
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
