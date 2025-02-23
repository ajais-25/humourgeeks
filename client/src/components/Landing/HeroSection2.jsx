import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [isTaglineVisible, setIsTaglineVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsTaglineVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="min-h-screen font-[Reighteous] bg-[#F5F5F5] text-zinc-900 flex flex-col items-center justify-center px-4 relative overflow-hidden pt-20 pb-48">
      <div className="text-center max-w-6xl mx-auto">
        <div className="relative inline-block">
          <div className="absolute -left-16 top-0 w-16 h-18 transition-transform duration-300">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/humourgeeks1-ooShGaSQU43SXjZTK4rmnuJqRSjqfS.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <h1
            className="text-5xl md:text-9xl font-black tracking-tight leading-none mb-12 font-righteous animate-title relative"
            style={{ color: "#F3D723" }}
          >
            <span className="inline-block animate-fade-in">DISRUPTING</span>
            <br />
            <span className="inline-block animate-fade-in [animation-delay:500ms]">
              ORDINARY
            </span>
          </h1>

          <div className="absolute -right-16 top-0 w-20 h-20 transition-transform duration-300">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/humourgeeks2-SnwQvutNOq2ncts6b5FBIWxaH2qTGj.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -left-12 top-1/2 w-16 h-16 transition-transform duration-300">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/humourgeeks3-IlOqYft2xGERuPWVv93VEXK8b1nf2T.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute -right-12 top-1/2 w-16 h-16 transition-transform duration-300 rotate-12">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fire@2xhumourgeeks5-XRjeZiP3tVphBLAvHw2GNU3bsK142W.webp"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <p
            className={`text-orange-500 text-xl md:text-2xl font-bold font-poppins transition-all duration-700 ${
              isTaglineVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            }`}
          >
            No Stage? No Problem! Practice Your Comedy Anytime, Anywhere!
          </p>

          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-poppins mt-8">
            HumourGeeks is an AI-powered comedy practicing platform where
            aspiring comedians refine their jokes, timing, and delivery. Get
            real-time feedback, test your punchlines, and perfect your sets
            before hitting the stage. Elevate your comedy game with intelligent
            insights and seamless practice sessions!
          </p>

          {/* <a href="#preview-section">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/humourgeeks4-TfHtD9b8BUdqF1gKbRiaj6bjj39Ybc.png"
              alt="Scroll down"
              className="w-24 h-24 mx-auto mb-8"
            />
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
