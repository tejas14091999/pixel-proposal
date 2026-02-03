import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import catHeartGif from "@/assets/cat_heart.gif";
import heartsBg from "@/assets/hearts-bg.png";

const loveMessage = `My Guddu, I don't always find the right words, but I never doubt what I feel.

In the short time we've been together, you've changed me in ways I didn't even know I needed. You've made me more aware—of myself, of my emotions, of the kind of man I want to be. Through you, I've truly understood the power of love. Not the loud kind, but the deep, grounding kind that reshapes you quietly from within.

You've shown me what it means to be better—not for the world, but for the woman you love. And I don't take that lightly.

It's rare to find someone who is beautiful in every sense of the word—inside and out. Your selflessness, your depth, the way you give so much of yourself… it humbles me. I honestly pray that life makes me capable of loving you the way you deserve to be loved, because that's something I want to earn every day.

I thank the gods above—if there are any—for crossing our paths. And sometimes, standing beside you, I feel imperfect. But instead of fear, that feeling fills me with pride, love, and pure awe.

You are fascinating. You are magical. And yes—every once in a while, I just think, fuck yeah, because I get to choose you.

I want to mark this moment as the beginning of something real. The start of a long, long journey together—built on honesty, growth, and choosing each other every day. I'm genuinely excited for everything that lies ahead of us, for the future we get to create side by side.

So this Valentine's Day, I don't just want to celebrate love—I want to choose it, with you.`;

const QuestionPage = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  // Remove entering animation after mount
  useState(() => {
    setTimeout(() => setIsEntering(false), 100);
  });

  const handleYesClick = () => {
    setYesScale((prev) => Math.min(prev + 0.1, 1.5));
    setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => navigate("/success"), 500);
    }, 200);
  };

  const handleNoHover = () => {
    // Move the button to a random position
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 120;
    const maxY = containerRect.height - 60;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
      style={{
        backgroundImage: `url(${heartsBg})`,
        backgroundSize: "200px",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className={`w-full max-w-lg transition-all duration-500 ${
          isEntering
            ? "opacity-0 scale-90"
            : isLeaving
            ? "opacity-0 scale-110"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Card/Window Frame */}
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl border-4 border-primary/30 shadow-2xl p-6 md:p-8">
          {/* Cat GIF */}
          <div className="flex justify-center mb-4">
            <img
              src={catHeartGif}
              alt="Cute cat with heart"
              className="w-24 h-24 md:w-32 md:h-32 object-contain animate-float"
            />
          </div>

          {/* Scrollable Message Area */}
          <div className="bg-background/50 rounded-xl p-4 mb-6 max-h-48 md:max-h-64 overflow-y-auto border-2 border-border">
            <p className="text-foreground text-sm md:text-base whitespace-pre-line leading-relaxed">
              {loveMessage}
            </p>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-6 animate-heartbeat">
            Will you be my Valentine? 💕
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
            {/* Yes Button */}
            <button
              onClick={handleYesClick}
              style={{ transform: `scale(${yesScale})` }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg 
                         shadow-lg hover:shadow-xl transition-all duration-200 hover:brightness-110
                         border-b-4 border-primary/70 active:border-b-2 active:translate-y-0.5"
            >
              Yes! 💖
            </button>

            {/* No Button (Runaway!) */}
            <button
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
              className="px-8 py-3 bg-muted text-muted-foreground rounded-xl font-bold text-lg 
                         shadow-lg transition-all duration-300 ease-out
                         border-b-4 border-muted-foreground/30 hover:animate-wiggle"
            >
              No 😢
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
