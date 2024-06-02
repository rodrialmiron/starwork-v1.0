import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpAZ, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { orderUsers } from "../../../redux/actions/userActions";

export const OrderBy = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    orderBy: "",
    typeOrder: "",
  });

  const handleFilters = ({ target }) => {
    if (target.name === "typeOrder") {
      setOrder({
        ...order,
        [target.name]: target.value,
      });
    } else {
      setOrder({
        ...order,
        orderBy: target.value,
      });
    }
  };

  useEffect(() => {
    if (order.orderBy && order.typeOrder) {
      dispatch(orderUsers(order));
    }
  }, [order]);

  return (
    <section className="flex bg-custom-blue rounded-xl px-1">
      <div>
        <label className="flex flex-col justify-center items-center font-bold text-white">
          ORDENAR POR:
        </label>
        <select
          name="orderBy"
          onClick={handleFilters}
          className="bg-custom-blue rounded-xl mb-1 cursor-pointer text-white font-semibold text-center border-2 border-gray-900"
        >
          <option hidden>--SELECCIONE ORDEN--</option>
          <option value="lastName" className="bg-custom-blueOscuro">
            APELLIDO
          </option>
          <option value="company" className="bg-custom-blueOscuro">
            EMPRESA
          </option>
          <option value="limitSlot" className="bg-custom-blueOscuro">
            INVITACIONES DISPONIBLES
          </option>
        </select>
      </div>

      <div className="flex items-center ml-3">
        <input
          value="ASC"
          id="ASC"
          name="typeOrder"
          type="radio"
          className="cursor-pointer"
          onClick={handleFilters}
        />
        <label htmlFor="ASC" className="peer-checked:bg-white">
          <FontAwesomeIcon
            icon={faArrowDownAZ}
            size="xl"
            style={{ color: "#032a3b" }}
          />
        </label>
        <input
          onClick={handleFilters}
          className="ml-2 cursor-pointer"
          value="DESC"
          id="DESC"
          name="typeOrder"
          type="radio"
        />
        <label htmlFor="DESC" className="peer-checked:bg-white">
          <FontAwesomeIcon
            icon={faArrowUpAZ}
            size="xl"
            style={{ color: "#032a3b" }}
          />
        </label>
      </div>
    </section>
  );
};