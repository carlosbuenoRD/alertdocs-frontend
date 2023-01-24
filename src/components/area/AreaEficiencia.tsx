import { useLocation } from "react-router-dom";

// Components
import Card from "../shared/Card";
import PercentageCircle from "../shared/PercentageCircle";
import { useAppSelector } from "@/redux/store";

function AreaEficiencia(props: any) {
  const location = useLocation();

  const section = location.pathname.split("/")[1];

  return (
    <Card title="Eficiencia" height="fit" className="bg-green-50" hover>
      <div className="">
        <PercentageCircle
          size={150}
          color="green"
          area={props.area}
          section={section}
        />
        <div className="card bg-green-100 shadow-1 flex-1 grid-col-3 mt-4 mb-0">
          <div className="text-center">
            <h4 className="mb-0">0</h4>
            <h6 className="uppercase text-sm m-0 mt-2">Completados</h6>
          </div>
          <div className="text-center w-full border-x-1 border-200">
            <h4 className="mb-0">0</h4>
            <h6 className="uppercase text-sm m-0 mt-2">Retrasados</h6>
          </div>
          <div className="text-center">
            <h4 className="mb-0">0</h4>
            <h6 className="uppercase text-sm m-0 mt-2">Devoluciones</h6>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AreaEficiencia;
