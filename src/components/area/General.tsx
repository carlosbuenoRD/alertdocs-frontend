import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Card from "../shared/Card";
import AreaDevolucion from "./AreaDevolucion";
import AreaDocuments from "./AreaDocuments";
import AreaEficiencia from "./AreaEficiencia";
import AreaHeader from "./AreaHeader";
import AreaUsers from "./AreaUsers";
import LineChart from "../charts/LineChart";
import EstadisticasModal from "./EstadisticasModal";
import DevolucionesModal from "./AreaDevolucionesModal";

function General(props: any) {
  const navigate = useNavigate();

  const [estadisticas, setEstadisticas] = useState(false);
  const [devoluciones, setDevoluciones] = useState(false);

  return (
    <div className="relative">
      <AreaHeader title={props.title} />
      <div className="area_body grid-col-2">
        <div className="flex flex-column">
          <AreaDocuments />
          <div onClick={() => setDevoluciones(true)}>
            <AreaDevolucion />
          </div>
        </div>

        <div>
          <AreaEficiencia area={props.eficiencia} />
          <AreaUsers />
        </div>
      </div>

      {/* Estadisticas */}
      <Card
        title="Estadisticas"
        height="fit"
        hover
        onClick={() => navigate(`/reports/${props.eficiencia}?type=area`)}
      >
        <LineChart />
      </Card>

      {/* <EstadisticasModal
        visible={estadisticas}
        onHide={() => setEstadisticas(false)}
      /> */}
      <DevolucionesModal
        visible={devoluciones}
        onHide={() => setDevoluciones(false)}
      />
    </div>
  );
}

export default General;
