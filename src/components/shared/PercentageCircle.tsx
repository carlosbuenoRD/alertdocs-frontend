import React, { useState, useEffect } from "react";

import {
  getResultByArea,
  getResultByUser,
  getResultByDepartment,
  getResultByDireccion,
} from "@/services/result";
import { useNavigate } from "react-router-dom";
import { getUserEficiencia } from "@/utils/formula";

function PercentageCircle(props: Props) {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(0);

  const getByArea = async () => setResult(await getResultByArea(props.area));
  const getByDireccion = async () =>
    setResult(await getResultByDireccion(props.area));
  const getByDepartment = async () =>
    setResult(await getResultByDepartment(props.area));
  const getByUser = async () =>
    setResult(await getUserEficiencia(props.user || ""));

  useEffect(() => {
    if (props.area && props.section) {
      if (props.section === "area") getByArea();
      if (props.section === "direcciones") getByDireccion();
      if (props.section === "department") getByDepartment();
    }
    props.user && getByUser();
  }, [props.section, props.area]);

  return (
    <div className="grid-center">
      <div
        className={`c100 p${Math.floor(result / 2) || 0} ${
          props.color
        } cursor-pointer m-0`}
        style={{ fontSize: props.size ? `${props.size}px` : "220px" }}
        onClick={() =>
          !props.user && navigate(`/${props.section || "area"}/${props.area}`)
        }
      >
        <span>{Math.round(result) || 0}%</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
      {props.title && <h6 className="text-center">{props.title}</h6>}
    </div>
  );
}

interface Props {
  title?: string;
  color?: string;
  size?: number;
  area?: string;
  user?: string;
  section?: string;
}

export default PercentageCircle;
