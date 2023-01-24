import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDocumentsByDireccion } from "@/redux/reducers/documents";
import { getUsersByDireccion } from "@/redux/reducers/users";
import { getDireccion } from "@/redux/reducers/area";

// Components
import General from "@/components/area/General";

function Direccion() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { direccion } = useAppSelector((state) => state.area);

  const areaId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getDireccion(areaId));
    dispatch(fetchDocumentsByDireccion(areaId));
    dispatch(getUsersByDireccion(areaId));
  }, []);

  return (
    <>
      <General eficiencia={areaId} title={direccion?.name} />
    </>
  );
}

export default Direccion;
