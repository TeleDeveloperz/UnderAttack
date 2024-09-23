import { useState } from "react";
import PropTypes from "prop-types";

ChallengeComponent.propTypes = {
  challenge: PropTypes.string.isRequired,
  onSolve: PropTypes.func.isRequired,
};

export default function ChallengeComponent({ challenge, onSolve }) {
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSolve(response);
  };

  return (
    <div role="form" aria-label="Security Challenge">
      <form onSubmit={handleSubmit}>
        <label htmlFor="challenge-input">Solve the challenge:</label>
        <input
          id="challenge-input"
          type="text"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          aria-describedby="challenge-description"
        />
        <p id="challenge-description">{challenge}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
