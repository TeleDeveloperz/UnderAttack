import { useEffect, useState } from "react";
import ChallengeComponent from "../components/ChallengeComponent";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Null as default value
  const [challenge, setChallenge] = useState("");
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const res = await fetch("http://localhost:5000/");
      if (!res.ok) {
        throw new Error("Failed to fetch challenge");
      }
      const data = await res.json();
      setChallenge(data.challenge);
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch challenge. Please try again.");
    }
  };

  const handleSolve = async (response) => {
    try {
      const verification = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ challenge, response }),
      });

      if (!verification.ok) {
        throw new Error("Verification failed");
      }

      setLoading(false);
    } catch (err) {
      setError("Verification failed. Please try again.");
    }
  };

  if (!jsEnabled) {
    return (
      <noscript>
        <div>Please enable JavaScript to access this site.</div>
      </noscript>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {loading ? (
        <ChallengeComponent challenge={challenge} onSolve={handleSolve} />
      ) : (
        <div>Verification successful! Welcome to the site.</div>
      )}
    </div>
  );
}
