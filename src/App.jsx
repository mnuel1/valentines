import { useState } from "react";
import { motion } from "framer-motion";
import bg from '../public/heart.mp4';

import flower1 from '../public/flower1.svg';
import flower2 from '../public/flower2.svg';
import flower3 from '../public/flower3.svg';

import boque from '../public/boqu.png';

// Create more flowers and random starting positions
const flowers = Array.from({ length: 30 }).map(() => {
  const imgs = [flower1, flower2, flower3];
  return {
    src: imgs[Math.floor(Math.random() * imgs.length)],
    left: Math.random() * 100,
    bottom: Math.random() * 200 - 100,
    duration: 3 + Math.random() * 3,
    xDirection: (Math.random() - 0.5) * 100
  };
});

// Generate multiple confetti pieces
const confettis = Array.from({ length: 30 }).map(() => ({
  left: Math.random() * 80 + 10,
  color: `hsl(${Math.random() * 360}, 80%, 60%)`,
  size: 6 + Math.random() * 6,
  x: (Math.random() - 0.5) * 200,
  y: 50 + Math.random() * 50 // lower y so confetti pops horizontally
}));

function App() {
  const [answer, setAnswer] = useState(null);

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bg} type="video/mp4" />
      </video>

      {flowers.map((f, i) => (
        <motion.img
          key={i}
          src={f.src}
          className="flower"
          style={{ left: `${f.left}%`, bottom: `${f.bottom}px` }}
          animate={{ y: [-f.bottom, -900], x: [0, f.xDirection], rotate: [0, 360] }}
          transition={{ duration: f.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="card">
        <h1 className="title">Can I be your Valentine?</h1>
        <p className="subtitle">This is gonna be my formal invitation for my sweet wife.</p>

        {!answer && (
          <div className="buttons">
            <button onClick={() => setAnswer("yes")} className="btn yes">Yes 💖</button>
            <button onClick={() => setAnswer("no")} className="btn no">No 🙈</button>
          </div>
        )}

        {answer === "yes" && (
          <div className="response yes">
            Good girl, mwa
            <div className="popup">
              <img src={boque} className="popup-bouquet" />
            
            </div>
          </div>
        )}

        {answer === "no" && <div className="response no">Kahit naman mag no ka alam ko sa puso mo na <b>YES</b> ang iyong sagot.</div>}
      </motion.div>

      <style>{`
        .app {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background: black;
        }
        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .flower {
          position: absolute;
          width: 30px;
          opacity: 0.9;
          z-index: 1;
        }
        .card {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 2.5rem;
          padding: 3rem;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          max-width: 600px;
          width: 90%;
        }
        .title {
          font-size: 2rem;
          font-weight: 800;
          color: #c026d3;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: #ec4899;
          margin-bottom: 2rem;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        .btn {
          padding: 0.75rem 2rem;
          font-size: 1rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .btn:hover { transform: scale(1.05); }
        .btn.yes { background: #ec4899; color: white; border: none; }
        .btn.no { background: white; color: #ec4899; border: 2px solid #f9a8d4; }
        .response {
          margin-top: 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          position: relative;
        }
        .response.yes { color: #be185d; }
        .response.no { color: #f472b6; }
        .popup {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
        }
        .popup-bouquet {
          width: 180px;
          z-index: 3;
        }
        .confetti {
          position: absolute;
          border-radius: 50%;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}

export default App;