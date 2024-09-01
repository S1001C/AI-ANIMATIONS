import React, { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateVideo = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/video-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate video");
      }

      const { video } = await response.json();
      setVideo(video);
    } catch (error) {
      console.error("Failed to generate video:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* Wrapper div with hover effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <img
          src="/solo-leveling-blue-5120x2880-17997.jpg" // Correctly referenced image
          alt="Background Animation"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>

      {video ? (
        // Only show the video when it's generated
        <video
          controls
          autoPlay
          className="max-w-full rounded-lg shadow-lg z-10"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        // Show the rest of the interface until the video is generated
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold mb-8 uppercase text-white">
            AI Animated Video Generator
          </h1>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your animation prompt"
            className="px-4 py-2 text-black border-2 border-gray-400 rounded-lg mb-6 w-80 text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={generateVideo}
            className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out transform ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800 hover:scale-110"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Video"}
          </button>
          {isLoading && (
            <div className="mt-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
