function TreasureChest({ isThinking }) {
  return (
    <div
      className={`treasure-chest ${isThinking ? "thinking" : ""}`}
      aria-hidden="true"
    >
      <svg
        className="question-arc"
        viewBox="0 0 240 70"
        aria-hidden="true"
      >
        <path id="question-arc-path" d="M 20 58 Q 120 0 220 58" fill="none" />
        <text>
          <textPath href="#question-arc-path" startOffset="50%" textAnchor="middle">
            Pondering
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
  );
}

export default TreasureChest;