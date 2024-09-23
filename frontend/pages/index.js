
import { useEffect, useState } from 'react';
import ChallengeComponent from '../components/ChallengeComponent';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [challenge, setChallenge] = useState('');
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();
      setChallenge(data.challenge);
      setLoading(false);
    } catch (err) {
      setError(true);
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

      if (verification.ok) {
        setLoading(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  if (!jsEnabled) {
    return <noscript>Please enable JavaScript to access this site.</noscript>;
  }

  if (error) {
    return <div>Verification failed.</div>;
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
    