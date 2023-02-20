import Card from "@/components/shared/Card";
import StopWatch from "@/components/stopWatch/StopWatch";
import React from "react";

export interface CardInfoProps {
  title: string;
  time?: number;
  qty: number;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, time, qty }) => {
  return (
    <Card title={title} className="text-center text-600" height="full">
      <h1 className="text-6xl mb-2">{Math.round(qty)}</h1>
      {typeof time == "number" && (
        <StopWatch time={time} pause className="text-lg text-400 font-bold" />
      )}
    </Card>
  );
};

export default CardInfo;
