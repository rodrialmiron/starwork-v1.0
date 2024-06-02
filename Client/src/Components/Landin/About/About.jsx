import React from "react";
import Mano from "../../../assets/Mano.png";

const About = () => {
 return (
  <section className="flex justify-between items-center">
   <div className="text-white -translate-y-40 ml-10">
    <h2 className="font-catamaran text-5xl">Somos Starwork</h2>
    <p className="font-catamaran font-md text-lg max-w-xl mt-6">
     En Starwork, entendemos que la capacitación continua es clave para el éxito
     empresarial. Por ello, colaboramos con expertos en diferentes áreas para
     ofrecer cursos actualizados y relevantes que aborden las necesidades
     específicas de cada empresa. Nuestro enfoque se centra en brindar una
     experiencia de aprendizaje efectiva y práctica que inspire a los empleados
     a alcanzar su máximo potencial.
    </p>
   </div>
   <div className="overflow-hidden">
    <img src={Mano} alt="Mano" className="max-w-full" />
   </div>
  </section>
 );
};

export default About;