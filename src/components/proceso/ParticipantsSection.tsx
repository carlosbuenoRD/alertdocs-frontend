import { useState, useEffect } from "react";
import Card from "@/components/shared/Card";
import ParticipantsTable from "./ParticipantsTable";
import { useAppSelector } from "@/redux/store";
import { getResultByAreaAndFlujo } from "@/services/result";

function ParticipantsSection() {
  const { flujo } = useAppSelector((state) => state.flujos);

  const DisplayEficiencia = (props: any) => {
    const [eficiencia, setEficiencia] = useState<any>(0);
    console.log(props);
    useEffect(() => {
      getAndSetEficiencia();
    }, []);

    const getAndSetEficiencia = async () => {
      let result = await getResultByAreaAndFlujo(flujo._id, props._id);
      setEficiencia(result);
    };

    return (
      <li className="card shadow-1 p-2 flex align-items-center justify-content-between mb-1 cursor-pointer">
        <h6 className="m-0 text-sm">{props.name}</h6>
        <div className="bg-green-400 p-2 border-round-md text-white">
          <p>{Math.floor(eficiencia) || 0}</p>
        </div>
      </li>
    );
  };

  return (
    <div className="grid-1-3">
      <Card title="Areas" height="fit">
        <ul className="m-0">
          {flujo?.areas?.map((i: any) => (
            <DisplayEficiencia {...i} />
          ))}
        </ul>
      </Card>
      <Card title="Usuarios" height="">
        <ParticipantsTable />
      </Card>
    </div>
  );
}

export default ParticipantsSection;
