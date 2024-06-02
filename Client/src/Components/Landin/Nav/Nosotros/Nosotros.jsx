import React from "react";
import Icono from "../../../../assets/Icono.png";
import { Link } from "react-router-dom";

//?ICONOS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

//?EQUIPO DE DESARROLLO
import Emma from "../../../../assets/Emma.png";
import Agustin from "../../../../assets/Agustin.png";
import Valentino from "../../../../assets/Valentino.png";
import Gonza from "../../../../assets/Gonza.png";
import Alejandro from "../../../../assets/Alejandro.png";
import Cristofer from "../../../../assets/Cristofer.png";
import Ludmila from "../../../../assets/Ludmila.png";

const Nosotros = () => {
  return (
    <div className="p-6 bg-gray-800 flex flex-col items-center h-screen overflow-auto">
      <section className="flex justify-between ">
        <section className="mr-44">
          <img src={Icono} alt="Icono" className="h-24 -mt-2" />
        </section>

        <section className="mr-44">
          <div className="-mt-7 flex justify-center items-center">
            <h1 className="mt-14 text-5xl font-bold text-custom-blueClaro uppercase">
              Sobre nosotros:
            </h1>
          </div>
        </section>

        <section className="ml-32">
          <Link to="/">
            <button className="justify-end -mt-11 w-10 h-9 rounded-lg bg-custom-blue hover:bg-custom-blueOscuro transition duration-200 text-white font-bold">
              <FontAwesomeIcon icon={faHouse} size="lg" />
            </button>
          </Link>
        </section>
      </section>

      <section className="mb-6 font-semibold text-center">
        <p className="text-lg text-gray-300">
          <span className="text-2xl text-custom-blueClaro font-bold">
            Starwork
          </span>{" "}
          es una innovadora startup educativa con una amplia reputación en el
          sector. Nos especializamos en la creación de soluciones de aprendizaje
          ágiles y efectivas para microemprendimientos y pymes con un máximo de
          25 personas, que buscan dar el{" "}
          <span className="text-xl text-custom-blueClaro font-bold">
            salto cualitativo hacia la industrialización.
          </span>{" "}
          Nuestro enfoque se centra en las pymes productivas, ofreciendo un
          método de enseñanza revolucionario: el microlearning. Con este método,
          presentamos contenido educativo en cápsulas que se consumen de manera
          similar a las historias de Instagram.
        </p>

        <p className="text-lg text-gray-300">
          Utilizamos formularios configurados para crear una experiencia
          educativa tipo storytelling, que es atractiva, breve y directa al
          grano. Esto permite a los colaboradores{" "}
          <span className="text-xl text-custom-blueClaro font-bold">
            aprender de manera efectiva en poco tiempo
          </span>
          , adaptándose a las demandas de un mundo empresarial en constante
          evolución. En Starwork, nos enorgullecemos de brindar un servicio de
          excelencia a nuestros clientes.
        </p>
        <p className="text-lg text-gray-300">
          Nos comprometemos a ofrecer un{" "}
          <span className="text-xl text-custom-blueClaro font-bold">
            contacto directo y personalizado
          </span>{" "}
          para aquellos interesados en contratar nuestros servicios.
        </p>
        <p className="text-lg text-gray-300">
          Creemos en la importancia de establecer relaciones cercanas con
          nuestros clientes, comprendiendo sus necesidades específicas y
          ofreciendo soluciones adaptadas a ellas.
        </p>
        <p className="text-lg text-gray-300">
          Creemos que la formación del recurso humano es clave para el éxito de
          cualquier empresa. Por eso, nos esforzamos por ofrecer{" "}
          <span className="text-xl text-custom-blueClaro font-bold">
            soluciones innovadoras
          </span>{" "}
          que ayuden a las pymes a crecer y{" "}
          <span className="text-xl text-custom-blueClaro font-bold">
            alcanzar su máximo potencial en la era digital.
          </span>
        </p>
      </section>

      <h1 className="mt-4 text-4xl font-bold text-custom-blueClaro">
        Este es nuestro equipo de desarrollo:
      </h1>
      <section>
        <div className="flex flex-wrap justify-center overflow-auto mt-3">
          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Emma}
                alt="Emma"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Emmanuel Villalba
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Backend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/emmanuelvillalba"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/devemmanuelvillalba/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.instagram.com/emas9"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
            </div>
          </div>

          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Agustin}
                alt="Agustin"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Agustin Lozada Zerpa
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Backend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/zerseph"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/agustinlozada/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.instagram.com/ajoslz"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
            </div>
          </div>

          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Alejandro}
                alt="Alejandro"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Alejandro Agüero
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Frontend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/AlejandroAgueroDev"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/alejandroaguerodev/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.instagram.com/alejandro_.aguero/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
            </div>
          </div>

          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Valentino}
                alt="Valentino"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Valentino Montecinos
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Frontend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/VMontecinos"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/vmontecinos/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
            </div>
          </div>

          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Gonza}
                alt="Gonza"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Gonzalo Baez
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Backend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/Namilog7"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/gonzalo-baez-854082224/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://instagram.com/gonzalo.baeznoriega"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
            </div>
          </div>

          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Cristofer}
                alt="Cristofer"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Cristofer Crego
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Frontend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/cristofer-crego"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/cristofer-crego-611998288/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.instagram.com/cristofercrego/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
            </div>
          </div>

          <div className="bg-custom-blue w-52 p-6 border-4 border-custom-blueOscuro shadow-md rounded-lg text-center text-white font-poppins transform transition-all duration-300 hover:-translate-y-2 m-2">
            <div className="w-26 h-36 border-4 border-custom-blueOscuro rounded-full flex items-center justify-center mx-auto overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={Ludmila}
                alt="Ludmila"
              />
            </div>
            <p className="mt-5 font-bold text-black text-lg">
              Ludmila Almiron
              <span className="block font-medium text-base text-black">
                Full-Stack web developer orientado al Frontend
              </span>
            </p>
            <div className="relative mt-5 space-x-4">
              <a
                href="https://github.com/ludmila-almiron"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              <a
                href="https://www.linkedin.com/in/ludmila-almiron-6bb598183/"
                target="_blank"
                className="relative"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" className="w-5" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
              </a>
              {/* <a href="#" className="relative">
        <FontAwesomeIcon icon={faInstagram} size="xl" className="w-5" />
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-24 bg-black text-white text-xs font-semibold py-1 px-2 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-32"></span>
       </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
