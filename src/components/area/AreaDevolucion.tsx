import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import Card from "../shared/Card";
import {
  fetchDevolucionByArea,
  fetchDevolucionByDepartment,
} from "@/redux/reducers/devolucion";
import { fetchDevolucionByDireccion } from "./../../redux/reducers/devolucion";
import { formatTime } from "@/utils/dateFormat";
import StopWatch from "../stopWatch/StopWatch";

function AreaDevolucion() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const areaId = location.pathname.split("/")[2];
  const section = location.pathname.split("/")[1];

  const { devoluciones } = useAppSelector((state) => state.devolucion);

  useEffect(() => {
    if (section === "area") dispatch(fetchDevolucionByArea(areaId));
    if (section === "direcciones") dispatch(fetchDevolucionByDireccion(areaId));
    if (section === "departments")
      dispatch(fetchDevolucionByDepartment(areaId));
  }, []);

  return (
    <Card
      title="Tiempo de Devoluciones"
      height="fit"
      className="bg-yellow-50"
      hover
    >
      <h1 className="text-7xl lh-2 mb-1 font-bold text-orange-300 text-center">
        {devoluciones.length}
      </h1>
      <h1 className="text-6xl lh-2 mt-1 font-bold text-orange-300 text-center">
        <h4 className="m-0">
          <StopWatch time={devoluciones ? formatTime(devoluciones) : 0} pause />
        </h4>
      </h1>
      <a className="text-center w-full block underline cursor-pointer text-xs">
        Ver detalles
      </a>
    </Card>
  );
}

export default AreaDevolucion;
