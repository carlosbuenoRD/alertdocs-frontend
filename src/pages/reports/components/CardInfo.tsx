import { useEffect } from "react";

// Components
import Card from "@/components/shared/Card";
import StopWatch from "@/components/stopWatch/StopWatch";
import React from "react";
import { getReportDevoluciones } from "@/services/reports.service";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setDevolucionesModal } from "@/redux/reducers/devolucion";

export interface CardInfoProps {
  title: string;
  time?: number;
  qty: number;
  devolucion?: boolean;
  onClick?: () => void;
}

const CardInfo: React.FC<CardInfoProps> = ({
  title,
  time,
  qty,
  onClick,
  devolucion,
}) => {
  const dispatch = useAppDispatch();
  const { report } = useAppSelector((state) => state.reports);
  const { devolucionesModal } = useAppSelector((state) => state.devolucion);

  if (devolucion) {
    console.log(devolucionesModal);
    useEffect(() => {
      handleFetchReportDevoluciones();
    }, [report._id]);
  }

  const handleFetchReportDevoluciones = async () => {
    try {
      const data = await getReportDevoluciones(report._id);
      dispatch(setDevolucionesModal(data.devoluciones));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Card
      title={title}
      className={`text-center text-600 ${onClick && "cursor-pointer"}`}
      height="full"
      onClick={onClick}
    >
      <h1 className="text-6xl mb-2">{Math.round(qty) || 0}</h1>
      {typeof time == "number" && (
        <StopWatch time={time} pause className="text-lg text-400 font-bold" />
      )}
    </Card>
  );
};

export default CardInfo;
