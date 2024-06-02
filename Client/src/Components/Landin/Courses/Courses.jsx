import React from "react";
import Course1 from "../../../assets/Course1.jpg";
import Course2 from "../../../assets/Course2.jpg";
import Course3 from "../../../assets/Course3.jpg";

const Courses = () => {
 return (
  <section className="flex justify-evenly gap-x-24 py-6 px-6">
   <div className="max-w-sm rounded-xl border border-gray-400 overflow-hidden shadow-xl transition duration-300 hover:shadow-2xl hover:shadow-gray-800 dark:hover:shadow-white">
    <img className="w-full h-48 object-cover" src={Course1} alt="Course" />
    <div className="px-6 py-4">
     <p className="text-gray-700 text-base dark:text-white">
      Nuestra capacitación en cultivo sostenible está diseñada para enseñar a
      agricultores y profesionales del sector las últimas técnicas y prácticas
      agrícolas que promueven la eficiencia y la conservación del medio
      ambiente. A través de esta capacitación, los participantes aprenderán a
      maximizar el rendimiento de sus cultivos de forma sostenible, minimizando
      el impacto negativo en el entorno.
     </p>
    </div>
   </div>
   <div className="max-w-sm rounded-xl border border-gray-400 overflow-hidden shadow-xl transition duration-300 hover:shadow-2xl hover:shadow-gray-800 dark:hover:shadow-white">
    <img className="w-full h-48 object-cover" src={Course2} alt="Course" />
    <div className="px-6 py-4">
     <p className="text-gray-700 text-base dark:text-white">
     Esta capacitación está dirigida a trabajadores y empleadores de industrias que buscan garantizar un entorno laboral seguro y saludable. Cubrimos temas como normas de higiene, prevención de riesgos laborales, gestión de emergencias y buenas prácticas de seguridad industrial. Nuestro objetivo es promover un ambiente de trabajo seguro y productivo para todos los empleados.
     </p>
    </div>
   </div>
   <div className="max-w-sm rounded-xl border border-gray-400 overflow-hidden shadow-xl transition duration-300 hover:shadow-2xl hover:shadow-gray-800 dark:hover:shadow-white">
    <img className="w-full h-48 object-cover" src={Course3} alt="Course" />
    <div className="px-6 py-4">
     <p className="text-gray-700 text-base dark:text-white">
     Nuestra capacitación en el manejo de máquinas con PLC está diseñada para profesionales que deseen adquirir habilidades en la programación y operación de máquinas industriales con controladores lógicos programables (PLC). Los participantes aprenderán a programar, configurar y mantener máquinas automatizadas, lo que les permitirá mejorar la eficiencia y la productividad en entornos industriales.
     </p>
    </div>
   </div>
  </section>
 );
};

export default Courses;