import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="flex pb-4 gap-x-4 justify-center">
        <div className="rounded-md max-h-[26.26px] transition duration-300 hover:shadow-lg hover:shadow-pink-500">
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-3xl text-pink-700"
            />
          </a>
        </div>
        <div className="rounded-full max-h-[30px] transition duration-300 hover:shadow-lg hover:shadow-blue-400">
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-3xl text-blue-600"
            />
          </a>
        </div>
        <div className="rounded-sm max-h-[26.26px] transition duration-300 hover:shadow-lg hover:shadow-blue-600">
          <a href="https://www.linkedin.com/">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-3xl text-blue-900"
            />
          </a>
        </div>
        {/* //TODO Averiguar si hay una forma mejor de mostrar esta sombra */}
        <div className="rounded-b-lg max-h-[27.5px] transition duration-300 hover:shadow-lg hover:shadow-gray-700 dark:hover:shadow-gray-400 ">
          <a href="https://twitter.com/">
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-3xl dark:text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
