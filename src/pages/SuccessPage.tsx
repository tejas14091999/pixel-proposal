import { useState, useEffect } from "react";
import catDanceGif from "@/assets/cat_dance.gif";
import heartsBg from "@/assets/hearts-bg.png";

const rotatingMessages = [
  "Try again sweetheart! 💕",
  "I know you know it, you're almost there baby! 🥰",
  "I'm sorry Queen Sina, but try again! 😝",
];

const SuccessPage = () => {
  const [countdown, setCountdown] = useState(5);
  const [showButtons, setShowButtons] = useState(false);
  const [kissesClicked, setKissesClicked] = useState(false);
  const [giftClicked, setGiftClicked] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowButtons(true);
    }
  }, [countdown]);

  // Check if both buttons are clicked
  useEffect(() => {
    if (kissesClicked && giftClicked) {
      setShowMessage(false);
      setIsComplete(true);
    }
  }, [kissesClicked, giftClicked]);

  const handleButtonClick = (button: "kisses" | "gift") => {
    if (button === "kisses") {
      setKissesClicked(true);
    } else {
      setGiftClicked(true);
    }

    // Show rotating message if not both clicked yet
    if (!(kissesClicked && giftClicked)) {
      setShowMessage(true);
      setCurrentMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${heartsBg})`,
        backgroundSize: "200px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full max-w-lg">
        {/* Frosted Card */}
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl border-4 border-primary/30 shadow-2xl p-6 md:p-8 text-center">
          {/* Yippee Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-heartbeat">
            Yippeeee! 🎉
          </h1>

          {/* Message */}
          <p className="text-foreground text-base md:text-lg mb-6">
            You may now take out all your frustration on Tejas and beat him up
            if you want 😜
          </p>

          {/* Countdown or Buttons */}
          {countdown > 0 ? (
            <div className="flex flex-col items-center">
              <p className="text-muted-foreground mb-2">Get ready in...</p>
              <div className="text-6xl font-bold text-primary animate-pulse">
                {countdown}
              </div>
            </div>
          ) : !isComplete ? (
            <div
              className={`transition-all duration-500 ${
                showButtons
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Rotating Message */}
              {showMessage && (
                <p className="text-accent font-bold text-lg mb-4 animate-wiggle">
                  {rotatingMessages[currentMessageIndex]}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => handleButtonClick("kisses")}
                  disabled={kissesClicked}
                  className={`px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                    ${
                      kissesClicked
                        ? "bg-primary/50 text-primary-foreground/70 cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:brightness-110 hover:scale-105 border-b-4 border-primary/70"
                    }`}
                >
                  Accept 20 kisses 😘
                </button>

                <button
                  onClick={() => handleButtonClick("gift")}
                  disabled={giftClicked}
                  className={`px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                    ${
                      giftClicked
                        ? "bg-secondary/50 text-secondary-foreground/70 cursor-not-allowed"
                        : "bg-secondary text-secondary-foreground hover:brightness-110 hover:scale-105 border-b-4 border-secondary-foreground/30"
                    }`}
                >
                  Accept gift 🎁
                </button>
              </div>

              {/* Hint */}
              <p className="text-muted-foreground text-sm mt-4">
                Psst... you need to click both! 😉
              </p>
            </div>
          ) : (
            /* Celebration */
            <div className="flex flex-col items-center animate-fade-in">
              <img
                src={catDanceGif}
                alt="Dancing celebration cat"
                className="w-40 h-40 md:w-56 md:h-56 object-contain mb-4"
              />
              <p className="text-2xl font-bold text-primary">
                I love you forever! 💕
              </p>
              <p className="text-muted-foreground mt-2">
                Happy Valentine's Day, my Queen 👑
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
