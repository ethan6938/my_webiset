import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Flicker + glitch effect using CSS variables updated randomly
  useEffect(() => {
    const flicker = () => {
      const root = document.documentElement;
      root.style.setProperty('--flicker-opacity', (0.85 + Math.random() * 0.15).toFixed(2));
      root.style.setProperty('--glitch-shift', `${Math.floor(Math.random() * 3) - 1}px`);
    };
    const interval = setInterval(flicker, 75);
    return () => clearInterval(interval);
  }, []);

  const register = async () => {
    if (!username || !email || !password) {
      setError('Fill all fields!');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) throw new Error('Registration failed');
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-glow"></div>
      <form className="register-form" onSubmit={e => { e.preventDefault(); register(); }}>
        <h1 className="neon-title">Register</h1>
        {error && <div className="error-msg">{error}</div>}

        <input
          className="neon-input"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
          autoComplete="username"
        />
        <input
          className="neon-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
        />
        <input
          className="neon-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="new-password"
        />

        <button
          className="neon-button"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

        :root {
          --cyan: #00fff7;
          --pink: #ff00ff;
          --dark-bg: #0b001f;
          --flicker-opacity: 1;
          --glitch-shift: 0px;
        }

        .register-wrapper {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(45deg, #0b001f 0%, #1f0030 50%, #0b001f 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: 'Orbitron', sans-serif;
          user-select: none;
          color: var(--cyan);
        }

        /* Animated neon background behind form */
        .register-glow {
          position: absolute;
          top: -30%;
          left: -30%;
          width: 160%;
          height: 160%;
          background:
            radial-gradient(circle at 30% 30%, #ff00ff55 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, #00fff755 0%, transparent 40%);
          animation: pulse-bg 8s ease-in-out infinite;
          filter: blur(80px);
          z-index: 0;
        }
        @keyframes pulse-bg {
          0%, 100% { transform: scale(1) translate(0,0); opacity: 0.8; }
          50% { transform: scale(1.05) translate(5%, -5%); opacity: 1; }
        }

        .register-form {
          position: relative;
          z-index: 1;
          background: rgba(10, 0, 20, 0.9);
          border-radius: 30px;
          padding: 3rem 3.5rem;
          width: 420px;
          box-shadow:
            0 0 40px var(--pink),
            inset 0 0 60px var(--cyan);
          display: flex;
          flex-direction: column;
          align-items: center;
          filter: drop-shadow(0 0 15px var(--cyan));
        }

        .neon-title {
          font-size: 3rem;
          margin-bottom: 2rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 900;
          color: var(--cyan);
          animation: flicker 3s linear infinite;
          position: relative;
          text-shadow:
            0 0 8px var(--cyan),
            0 0 20px var(--pink),
            0 0 30px var(--pink),
            0 0 40px var(--pink);
        }
        /* Glitch effect on the title */
        .neon-title::before,
        .neon-title::after {
          content: attr(class);
          position: absolute;
          left: var(--glitch-shift);
          top: 0;
          width: 100%;
          height: 100%;
          color: var(--pink);
          background: transparent;
          overflow: hidden;
          clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
          animation: glitch-top 2s infinite;
          opacity: 0.6;
        }
        .neon-title::after {
          clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
          animation: glitch-bottom 2s infinite;
        }
        @keyframes glitch-top {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
            transform: translate(0);
          }
          50% {
            clip-path: polygon(0 5%, 100% 5%, 100% 25%, 0 25%);
            transform: translate(-2px, -2px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
            transform: translate(0);
          }
        }
        @keyframes glitch-bottom {
          0% {
            clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
            transform: translate(0);
          }
          50% {
            clip-path: polygon(0 65%, 100% 65%, 100% 95%, 0 95%);
            transform: translate(2px, 2px);
          }
          100% {
            clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
            transform: translate(0);
          }
        }

        .error-msg {
          background: #ff0055;
          color: white;
          font-weight: 700;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          box-shadow: 0 0 20px #ff0055;
          user-select: text;
          width: 100%;
          text-align: center;
          letter-spacing: 0.05em;
        }

        .neon-input {
          width: 100%;
          margin-bottom: 1.4rem;
          padding: 1.15rem 1.4rem;
          border-radius: 25px;
          border: 2.5px solid var(--cyan);
          background: rgba(0, 0, 0, 0.4);
          color: var(--cyan);
          font-size: 1.2rem;
          outline: none;
          box-shadow:
            inset 0 0 15px var(--cyan),
            0 0 15px var(--cyan);
          font-family: 'Orbitron', sans-serif;
          text-align: center;
          transition: all 0.3s ease;
          user-select: text;
        }
        .neon-input::placeholder {
          color: var(--cyan);
          opacity: 0.7;
          font-weight: 500;
        }
        .neon-input:focus {
          border-color: var(--pink);
          box-shadow:
            inset 0 0 35px var(--pink),
            0 0 30px var(--pink);
          color: var(--pink);
        }

        .neon-button {
          margin-top: 2rem;
          padding: 1.2rem 3.5rem;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, var(--cyan), var(--pink));
          color: #000;
          font-weight: 900;
          font-size: 1.35rem;
          cursor: pointer;
          box-shadow:
            0 0 30px var(--cyan),
            0 0 50px var(--pink),
            0 0 80px var(--pink);
          user-select: none;
          text-transform: uppercase;
          font-family: 'Orbitron', sans-serif;
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 10px var(--pink));
        }
        .neon-button:disabled {
          filter: grayscale(70%) opacity(0.6);
          cursor: wait;
          box-shadow: none;
        }
        .neon-button:hover:not(:disabled) {
          filter:
            drop-shadow(0 0 25px var(--pink))
            drop-shadow(0 0 35px var(--cyan));
          transform: scale(1.1);
          letter-spacing: 0.12em;
        }
        .neon-button:active:not(:disabled) {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
