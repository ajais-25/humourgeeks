import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Preview from "../../assets/Previews1.jpg";

const HumourGeeksPreview = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const section = document.getElementById("preview-section");
      if (section) {
        const { top } = section.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="preview-section" className="py-16 px-8 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Humourgeeks Preview</h2>
        <p className="text-lg text-gray-600 mb-8">
          Take a look at our AI-powered comedy platform where you can practice,
          refine, and perfect your comedy routines with instant feedback.
        </p>
        <div className="relative flex justify-center items-center">
          <img
            src={Preview}
            alt="HumourGeeks Preview"
            className="rounded-lg shadow-lg"
            width={800}
            height={450}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HumourGeeksPreview;
