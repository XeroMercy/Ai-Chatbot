import { useState } from 'react'
import { sendChatMessage } from './api'
import TreasureChest from './treasurechest/TreasureChest'
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
      <div className="bubble-field" aria-hidden="true">
        <span className="water-bubble bubble-a"></span>
        <span className="water-bubble bubble-b"></span>
        <span className="water-bubble bubble-c"></span>
        <span className="water-bubble bubble-d"></span>
        <span className="water-bubble bubble-e"></span>
        <span className="water-bubble bubble-f"></span>
        <span className="water-bubble bubble-g"></span>
      </div>
      <section id="center" className="chat-panel">
        <div className="chat-heading">
          <span className="status-dot" aria-hidden="true"></span>
          <div>
            <p className="eyebrow"></p>
          </div>
        </div>
        <TreasureChest isThinking={isLoading} />

        <div className="messages" aria-live="polite">
          {messages.length > 0 && (
            messages.map((message) => (
              <div className={`${message.role}-bubble`} key={message.id}>
                {message.text}
              </div>
            ))
          )}
          {isLoading && <p className="loading-message">Thinking...</p>}
          {error && <p className="error-message" role="alert">{error}</p>}
        </div>

        <div className="input-area">
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
        </div>
      </section>
    </main>
  )
}

export default App
