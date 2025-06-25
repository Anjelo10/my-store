import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="h-screen bg-hero sm:bg-white">
      <div className=" h-full  flex items-center">
        <div className=" px-6 md:px-16 lg:px-32">
          <h1 className="text-shadow-lg sm:text-2xl text-xl">Make Love with</h1>
          <h1 className="text-shadow-lg text-6xl sm:text-8xl text-yellow-500 font-extrabold">
            KESYANG
          </h1>
          <p className="text-shadow sm:w-md text-md sm:text-lg">
            Ciptakan Kebahagiaan dengan cemilan enbal sejuta rasa
          </p>
          <Link href="#product">
            <button className="text-white text-xl bg-yellow-500 px-2 rounded-sm mt-7 shadow-lg cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
