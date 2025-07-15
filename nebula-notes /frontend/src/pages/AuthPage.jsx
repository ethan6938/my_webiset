import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();

  // Neon glow animation keyframes for inline style workaround
  // We'll inject a <style> tag dynamically for keyframes
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      // @keyframes neonPulse {
      //   0%, 100% {
      //     text-shadow:
      //       0 0 5px #ff00ff,
      //       0 0 15px #ff00ff,
      //       0 0 20px #ff00ff,
      //       0 0 40px #ff00ff,
      //       0 0 80px #ff00ff;
      //     color: #ff00ff;
      //   }
      //   50% {
      //     text-shadow:
      //       0 0 10px #ff69b4,
      //       0 0 30px #ff69b4,
      //       0 0 40px #ff69b4,
      //       0 0 60px #ff69b4,
      //       0 0 90px #ff69b4;
      //     color: #ff69b4;
      //   }
      // }
      // @keyframes bgShift {
      //   0% {
      //     background-position: 0% 50%;
      //   }
      //   50% {
      //     background-position: 100% 50%;
      //   }
      //   100% {
      //     background-position: 0% 50%;
      //   }
      // }
      // @keyframes glowPulse {
      //   0%, 100% {
      //     box-shadow:
      //       0 0 10px #0ff,
      //       0 0 20px #0ff,
      //       0 0 40px #0ff,
      //       0 0 80px #0ff;
      //   }
      //   50% {
      //     box-shadow:
      //       0 0 20px #0ff,
      //       0 0 40px #0ff,
      //       0 0 60px #0ff,
      //       0 0 120px #0ff;
      //   }
      // }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(270deg, #ff00ff, #00fff7, #ff00ff)',
        backgroundSize: '600% 600%',
        animation: 'bgShift 15s ease infinite',
        fontFamily: "'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4rem',
          background: 'rgba(10, 10, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 0 60px #ff00ff, 0 0 80px #00fff7',
          padding: '4rem 5rem',
          maxWidth: '900px',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'stretch',
          border: '2px solid #ff00ff',
        }}
      >
        {/* Login Card */}
        <div
          style={{
            flex: '1 1 450px',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '3rem 3rem 2.5rem',
            borderRadius: '20px',
            boxShadow: '0 0 25px #00fff7, inset 0 0 15px #ff00ff',
            border: '1.5px solid #00fff7',
            display: 'flex',
            flexDirection: 'column',
            color: '#aaffff',
          }}
        >
          <h2
            style={{
              fontWeight: '900',
              fontSize: '3rem',
              letterSpacing: '0.15em',
              marginBottom: '2rem',
              textAlign: 'center',
              animation: 'neonPulse 3s ease-in-out infinite',
              userSelect: 'none',
              fontFamily: "'Orbitron', sans-serif",
              textTransform: 'uppercase',
            }}
          >
            Welcome Back
          </h2>
          <Login onLogin={onLogin} />
        </div>

        {/* Register Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate('/register')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate('/register');
          }}
          style={{
            flex: '0 0 280px',
            background:
              'linear-gradient(135deg, #00fff7, #ff00ff, #00fff7)',
            borderRadius: '24px',
            boxShadow: '0 0 30px #00fff7, 0 0 60px #ff00ff',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4rem 3rem',
            userSelect: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            border: '2px solid #ff00ff',
            animation: 'glowPulse 3.5s ease-in-out infinite',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 0 45px #00fff7, 0 0 90px #ff00ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 30px #00fff7, 0 0 60px #ff00ff';
          }}
        >
          <h3
            style={{
              fontWeight: '900',
              fontSize: '2.6rem',
              marginBottom: '3rem',
              userSelect: 'none',
              letterSpacing: '0.18em',
              fontFamily: "'Orbitron', sans-serif",
              textTransform: 'uppercase',
              textShadow: '0 0 12px #00fff7, 0 0 20px #ff00ff',
            }}
          >
            New Here?
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/register');
            }}
            onKeyDown={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#00fff7',
              border: '2px solid #00fff7',
              borderRadius: '18px',
              padding: '1rem 3rem',
              fontSize: '1.3rem',
              fontWeight: '900',
              cursor: 'pointer',
              boxShadow: '0 0 25px #00fff7',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              fontFamily: "'Orbitron', sans-serif",
              userSelect: 'none',
              textShadow: '0 0 8px #00fff7',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.boxShadow = '0 0 45px #00fff7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = '0 0 25px #00fff7';
            }}
          >
            Register
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              stroke="#00fff7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
