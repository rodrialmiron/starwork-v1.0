import React from "react";

const Loader = () => {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-gray-200">
      <div className="flex justify-center items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-custom-blueOscuro animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-custom-blueOscuro animate-bounce-delay-300"></div>
        <div className="w-4 h-4 rounded-full bg-custom-blueOscuro animate-bounce-delay-500"></div>
      </div>
    </section>
  );
};

export default Loader;