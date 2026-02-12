'use client'
import React, { useState, useRef } from "react";
import Confetti from "react-confetti"; // npm install react-confetti

export default function Valentine() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: "auto", left: "auto" });
  const [noClicked, setNoClicked] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const yesRef = useRef(null);

  const steps = [
    {
      title: "Will You Be My Valentine? 💖",
      text: "You make my world brighter every single day.",
      gif: "gip1.gif",
    },
    {
      title: "Are You Serious About This? 🥺",
      text: "Think again... I promise I'm worth it.",
      gif: "gip2.gif",
    },
    {
      title: "Think again Pretty.. Please! 😭💘",
      text: "This could be the start of something magical.",
      gif: "gip3.gif",
    },
    {
      title: " Don't Break My Heart 💔",
      text: "Say yes and make this story beautiful.",
      gif: "gip4.gif",
    },
  ];

  const handleNoHover = () => {
    if (step >= 3) {
      setHoverCount((prev) => prev + 1);
      if (hoverCount + 1 >= 3) return;

      const yesBtn = yesRef.current;
      let randomTop, randomLeft;
      let safe = false;

      while (!safe) {
        randomTop = Math.random() * 95 + "%";
        randomLeft = Math.random() * 95 + "%";

        if (yesBtn) {
          const yesRect = yesBtn.getBoundingClientRect();
          const noX = (parseFloat(randomLeft) / 100) * window.innerWidth;
          const noY = (parseFloat(randomTop) / 100) * window.innerHeight;

          if (
            Math.abs(noX - (yesRect.left + yesRect.width / 2)) > 80 &&
            Math.abs(noY - (yesRect.top + yesRect.height / 2)) > 80
          ) {
            safe = true;
          }
        } else {
          safe = true;
        }
      }

      setNoPosition({ top: randomTop, left: randomLeft });
    }
  };

  const handleNo = () => {
    if (step < steps.length - 1) {
      setStep(step + 1); // next step → GIF + text update
    } else {
      setNoClicked(true);
    }
  };

  const handleYes = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      setYesClicked(true);
    }, 3500);
  };

  const handleMessageMe = () => {
    window.open("https://instagram.com/_shahriear", "_blank");
  };

  // Stars
  const stars = Array.from({ length: 40 });

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-black via-[#0f172a] to-black text-white">
      
      {/* Stars */}
      {stars.map((_, i) => {
        const sizes = ["2px", "3px", "4px"];
        return (
          <span
            key={i}
            className="absolute bg-white rounded-full animate-blink"
            style={{
              width: sizes[Math.floor(Math.random() * sizes.length)],
              height: sizes[Math.floor(Math.random() * sizes.length)],
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              boxShadow: "0 0 8px #fff,0 0 15px #fff",
              animationDelay: Math.random() * 5 + "s",
            }}
          ></span>
        );
      })}

      {/* Fireworks + hearts */}
      {showCelebration && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={350}
            gravity={0.2}
            colors={["#FF5C5C", "#FFD700", "#FF69B4", "#00FFFF", "#00FF00"]}
            recycle={false}
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-pink-500 text-2xl animate-float"
                style={{
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 2 + "s",
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </>
      )}

      {/* Proposal Box */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {!yesClicked && !showCelebration ? (
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl text-center shadow-2xl transition-all duration-500 animate-fadeIn">

            {/* GIF */}
            <div className="w-48 h-48 mx-auto mb-4">
              <img
                src={steps[step].gif}
                alt="Valentine GIF"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Text */}
            <h1 className="text-4xl font-bold mb-4 transition-all duration-500">
              {steps[step].title}
            </h1>
            <p className="opacity-80 mb-8 transition-all duration-500">
              {steps[step].text}
            </p>

            {/* Buttons */}
            <div className="relative flex justify-center gap-6">
              <button
                ref={yesRef}
                onClick={handleYes}
                className="bg-pink-500 px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-110"
                style={{ transform: `scale(${1 + step * 0.2})` }}
              >
                Yes 💕
              </button>

              {hoverCount < 3 && (
                <button
                  onClick={handleNo}
                  onMouseEnter={handleNoHover}
                  className={`bg-gray-700 px-8 py-3 rounded-full text-lg transition-all duration-300 ${
                    noClicked ? "animate-shake scale-110" : ""
                  }`}
                  style={{
                    position: step >= 3 ? "absolute" : "relative",
                    top: noPosition.top,
                    left: noPosition.left,
                  }}
                >
                  No 💔
                </button>
              )}
            </div>

            {noClicked && !yesClicked && hoverCount < 3 && (
              <p className="mt-4 text-yellow-300 animate-pulse">
                Oops! Try hovering me 😏
              </p>
            )}
          </div>
        ) : null}
        {/* After celebration */}
        {yesClicked && !showCelebration && (
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl text-center shadow-2xl transition-all duration-500 animate-fadeIn">
            <div className="w-48 h-48 mx-auto mb-4">
              <img
                src='gip5.gif'
                alt="Valentine GIF"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 animate-bounce">
              Yay! I knew you love me! 😍
            </h1>
            <p>I used to dream about this moment, but having you say yes is better than any dream I've ever had.</p>
            <button
              onClick={handleMessageMe}
              className="mt-6 bg-pink-500 px-8 py-3 rounded-full text-lg hover:scale-110 transition-all duration-300"
            >
              Message Me 💌
            </button>
          </div>
        )}
      </div>

      {/* CSS */}
      <style jsx>{`
        .animate-blink {
          animation: blink 2s infinite ease-in-out;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-200px) rotate(180deg); opacity: 0.7; }
          100% { transform: translateY(0) rotate(360deg); opacity: 1; }
        }

        .animate-shake {
          animation: shake 0.5s infinite;
        }
        @keyframes shake {
          0% { transform: translate(0,0); }
          25% { transform: translate(-5px, 0); }
          50% { transform: translate(5px, 0); }
          75% { transform: translate(-5px, 0); }
          100% { transform: translate(0,0); }
        }
      `}</style>
    </div>
  );
}



