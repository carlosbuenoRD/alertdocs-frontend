import React, { useEffect, useState } from "react";

// Components
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ActivitiesTable from "./ActivitiesTable";
import { getReportActivities } from "@/services/reports.service";
import { useAppSelector } from "@/redux/store";

interface ActivitiesModalProps {
  visible: boolean;
  onHide: () => void;
}

const ActivitiesModal: React.FC<ActivitiesModalProps> = ({
  visible,
  onHide,
}) => {
  const { report } = useAppSelector((state) => state.reports);

  const [reportActivities, setReportActivities] = useState<any>({});
  const [status, setStatus] = useState<any>("activities");

  const dropdowmOptions = [
    {
      label: "Todos",
      value: "activities",
    },
    {
      label: "A tiempo",
      value: "goodActivities",
    },
    {
      label: "Rayando",
      value: "mediumActivities",
    },
    {
      label: "Retrasado",
      value: "badActivities",
    },
  ];

  useEffect(() => {
    if (report._id) {
      handleFetchReportActivities();
    }
  }, [report._id]);

  const handleFetchReportActivities = async () => {
    try {
      const data = await getReportActivities(report._id);
      setReportActivities(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      header={"Detalle de actividades"}
      visible={visible}
      style={{ width: "90vw", padding: 0 }}
      onHide={onHide}
      contentClassName="px-5 py-1"
    >
      <div className="">
        <div className="card flex justify-content-between align-items-center my-2 shadow-1">
          <div className="flex align-items-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value=""
                className="w-24rem"
                placeholder="Keyword Search"
              />
            </span>
            <div className="p-float-label ml-3">
              <Dropdown
                optionLabel="label"
                optionValue="value"
                value={status}
                options={dropdowmOptions}
                onChange={(e) => setStatus(e.value)}
                className="w-15rem"
              />
              <label htmlFor="search">Filtro de status</label>
            </div>
          </div>
        </div>
        <ActivitiesTable activities={reportActivities[status]} />
      </div>
    </Dialog>
  );
};

export default ActivitiesModal;
