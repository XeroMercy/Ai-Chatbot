function TreasureChest({ isThinking }) {
  return (
    <div
      className={`treasure-chest ${isThinking ? "thinking" : ""}`}
      aria-label={isThinking ? "The chest is pondering" : "The chest is ready"}
    >
      <svg
        className="question-arc"
        viewBox="0 0 240 70"
        role="img"
        aria-label={isThinking ? "Pondering" : "Ask A Question"}
      >
        <path
          id="question-arc-path"
          d="M 20 58 Q 120 0 220 58"
          fill="none"
        />

        <text>
          <textPath
            href="#question-arc-path"
            startOffset="50%"
            textAnchor="middle"
          >
            {isThinking ? "Pondering" : "Ask A Question"}
          </textPath>
        </text>
      </svg>

      <div className="chest-lid">
        <span className="chest-lock"></span>
      </div>

      <div className="chest-base">
        <span className="chest-glow"></span>
      </div>
    </div>
  )
}

export default TreasureChest