import React from "react";

const HomePage = () => {
  return (
    <div className="h-screen bg-hero">
      <div className=" h-full flex items-center">
        <div className=" px-6 md:px-16 lg:px-32">
          <h1 className="text-shadow-lg text-2xl">Make Love with</h1>
          <h1 className="text-shadow-lg text-8xl text-yellow-500 font-extrabold">
            KESYANG
          </h1>
          <p className="text-shadow-lg  w-sm text-md">
            Ciptakan Kebahagiaan dengan cemilam enbal sejuta rasa
          </p>
          <button className="text-white text-xl bg-yellow-500 px-2 rounded-sm mt-7 ">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
