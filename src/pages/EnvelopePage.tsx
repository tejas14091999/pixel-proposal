import { useState } from "react";
import { useNavigate } from "react-router-dom";
import envelopeImg from "@/assets/envelope.png";
import heartsBg from "@/assets/hearts-bg.png";

const EnvelopePage = () => {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      navigate("/question");
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-500"
      style={{
        backgroundImage: `url(${heartsBg})`,
        backgroundSize: "400px",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className={`flex flex-col items-center transition-all duration-500 ${
          isLeaving ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      >
        {/* Envelope */}
        <button
          onClick={handleClick}
          className="cursor-pointer hover:scale-105 transition-transform duration-300 focus:outline-none mb-8"
          aria-label="Open letter"
        >
          <img
            src={envelopeImg}
            alt="Love letter envelope"
            className="w-48 h-auto md:w-64 animate-pulse-envelope drop-shadow-lg"
          />
        </button>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-heartbeat">
          ♡ Letter for You ♡
        </h1>

        {/* Personal Message */}
        <p className="text-center text-muted-foreground max-w-sm md:max-w-md text-xl md:text-2xl font-medium leading-relaxed px-4">
          I know I'm not perfect, I mess up sometimes and act stupid, but I hope
          you know how deeply I'm falling in love with you my lil babbiieee
        </p>

        {/* Tap hint */}
        <p className="mt-8 text-sm text-muted-foreground animate-float">
          ✨ Tap the envelope to open ✨
        </p>
      </div>
    </div>
  );
};

export default EnvelopePage;
