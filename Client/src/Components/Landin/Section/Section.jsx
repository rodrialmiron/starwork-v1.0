import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Section = () => {
 //!Numero de prubea
 const phoneNumber = "+543865316687";
 const message = "Hola, me gustaría iniciar una conversación contigo.";

 return (
  <section
   id="contact"
   className=" bg-gray-900 shadow-xl h-24 flex items-center dark:bg-gray-300 transition duration-300"
  >
   <div className="text-white flex justify-evenly w-full dark:text-black">
    <p className="mt-auto mb-auto text-lg font-semibold">
     Si te gustaría contactarnos y hablar con un representante, por favor haz
     click en el icono <span className="inline-block w-3"></span>
     <FontAwesomeIcon icon={faArrowRight} size="lg"/>
    </p>

    <a
     href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
     target="_blank"
     rel="noopener noreferrer"
    >
     <button className="cursor-pointer relative group overflow-hidden border-2 px-3 py-2 border-green-500 rounded-full">
      <span
       title="CONTACTANOS"
       className="font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500"
      >
       <FontAwesomeIcon
        icon={faWhatsapp}
        className="text-white text-[30px] dark:text-black"
       />
      </span>
      <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
      <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>
      <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
      <span className="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
     </button>
    </a>
   </div>
  </section>
 );
};

export default Section;