'use client'
import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti"; // npm install react-confetti

export default function page() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: "auto", left: "auto" });
  const [yesClicked, setYesClicked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const yesRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Track window size for confetti
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    { title: "Will You Be My Valentine? 💖", text: "You make my world brighter every single day.", gif: "gip1.gif" },
    { title: "Are You Serious About This? 🥺", text: "Think again... I promise I'm worth it.", gif: "gip2.gif" },
    { title: "Think again Pretty.. Please! 😭💘", text: "This could be the start of something magical.", gif: "gip3.gif" },
    { title: "Don't Break My Heart 💔", text: "Say yes and make this story beautiful.", gif: "gip4.gif" },
  ];

  const handleNoHover = () => {
    if (step >= 3 && noClickCount < 4) {
      let randomTop, randomLeft;
      let safe = false;
      const yesBtn = yesRef.current;

      while (!safe) {
        randomTop = Math.random() * 90 + "%";
        randomLeft = Math.random() * 90 + "%";

        if (yesBtn) {
          const yesRect = yesBtn.getBoundingClientRect();
          const noX = (parseFloat(randomLeft) / 100) * window.innerWidth;
          const noY = (parseFloat(randomTop) / 100) * window.innerHeight;

          if (
            Math.abs(noX - (yesRect.left + yesRect.width / 2)) > 100 &&
            Math.abs(noY - (yesRect.top + yesRect.height / 2)) > 80
          ) {
            safe = true;
          }
        } else safe = true;
      }

      setNoPosition({ top: randomTop, left: randomLeft });
    }
  };

  const handleNo = () => {
    if (step < steps.length - 1) setStep(step + 1);
    setNoClickCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      setYesClicked(true);
    }, 4000); // slightly longer to enjoy animation
  };

  const handleMessageMe = () => {
    window.open("https://instagram.com/_shahriear", "_blank");
  };

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

      {/* Celebration: Confetti + floating hearts */}
      {showCelebration && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={windowSize.width < 768 ? 200 : 400}
            gravity={0.2}
            colors={["#FF5C5C", "#FFD700", "#FF69B4", "#00FFFF", "#00FF00"]}
            recycle={false}
          />
          {/* Floating hearts */}
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-pink-500 text-2xl sm:text-3xl animate-floating-heart"
              style={{
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * 3 + "s",
              }}
            >
              ❤️
            </span>
          ))}
        </>
      )}

      {/* Proposal Box */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        {!yesClicked && !showCelebration && (
          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-3xl text-center shadow-2xl transition-all duration-500 animate-fadeIn w-full max-w-[90%] sm:max-w-md">

            {/* GIF */}
            <div className="w-full sm:w-48 h-auto sm:h-48 mx-auto mb-4">
              <img src={steps[step].gif} alt="Valentine GIF" className="w-full h-full object-cover rounded-xl shadow-lg"/>
            </div>

            {/* Text */}
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 transition-all duration-500">{steps[step].title}</h1>
            <p className="text-sm sm:text-base md:text-lg opacity-80 mb-8 transition-all duration-500">{steps[step].text}</p>

            {/* Buttons */}
            <div className="relative flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button ref={yesRef} onClick={handleYes} className="bg-pink-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg transition-all duration-300 hover:scale-110">
                Yes 💕
              </button>

              {noClickCount < 4 && (
                <button
                  onClick={handleNo}
                  onMouseEnter={handleNoHover}
                  className="bg-gray-700 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg transition-all duration-300"
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
          </div>
        )}

        {/* After celebration */}
        {yesClicked && !showCelebration && (
          <div className="bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-3xl text-center shadow-2xl transition-all duration-500 animate-fadeIn w-full max-w-[90%] sm:max-w-md">
            <div className="w-full sm:w-48 h-auto sm:h-48 mx-auto mb-4">
              <img src='gip5.gif' alt="Valentine GIF" className="w-full h-full object-cover rounded-xl shadow-lg"/>
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 animate-bounce">Yay! I knew you love me! 😍</h1>
            <p className="text-sm sm:text-base md:text-lg mb-6">I used to dream about this moment, but having you say yes is better than any dream I've ever had.</p>
            <button onClick={handleMessageMe} className="mt-2 sm:mt-6 bg-pink-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg hover:scale-110 transition-all duration-300">Message Me 💌</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-blink { animation: blink 2s infinite ease-in-out; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }

        .animate-floating-heart {
          animation: floatHeart 4s ease-in-out infinite;
        }
        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg); opacity:1; }
          50% { transform: translateY(-250px) rotate(180deg); opacity:0.7; }
          100% { transform: translateY(0) rotate(360deg); opacity:1; }
        }
      `}</style>
    </div>
  );
}
