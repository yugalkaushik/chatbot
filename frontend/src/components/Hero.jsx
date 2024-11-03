import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-screen h-screen bg-primary flex flex-col justify-center items-center text-center px-4">
      <h1 className="font-text text-4xl font-bold text-white absolute top-4 left-8">
        nova
      </h1>
      <div className="max-w-4xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
          Ask. Discover. Master.
        </h1>
        <p className="text-white text-lg md:text-xl mb-8">
          Our AI-powered recommendation system helps you discover the best
          websites tailored to your specific tasks and interests.
        </p>
        <Link
          to="/chatbot"
          className="bg-white text-primary font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
