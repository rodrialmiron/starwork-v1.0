import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const ButtonHome = () => {
 return (
  <>
   <div className="absolute top-0 right-0 mt-4 mr-8">
    <Link to="/">
     <button
      title="HOME"
      className="h-12 w-12 hover:bg-custom-blueOscuro bg-custom-blueOscuro2 rounded-lg">
      <FontAwesomeIcon icon={faHouse} size="2x" style={{ color: "white" }} />
     </button>
    </Link>
   </div>
  </>
 );
};

export default ButtonHome;