import React, { useEffect, useState, useMemo } from "react";

import { colors } from "@/utils/data";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  getAreas,
  getDirecciones,
  getDepartments,
} from "@/redux/reducers/area";

// COMPONENTS
import PercentageCard from "@/pages/dashboard/components/PercentageCard";
import Card from "@/components/shared/Card";
import PercentageCircle from "@/components/shared/PercentageCircle";
import AreasHeader from "@/components/areas/AreasHeader";
import MepydStats from "@/components/areas/MepydStats";

function Areas() {
  const dispatch = useAppDispatch();

  const [section, setSection] = useState("area");

  const { areas, direcciones, departments } = useAppSelector(
    (state) => state.area
  );

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  const listedAreas =
    section === "area"
      ? areas
      : section === "direcciones"
      ? direcciones
      : departments;

  return (
    <div className="relative">
      <AreasHeader section={section} setSection={setSection} areas={areas} />

      <div className="gap-3 pt-7">
        <MepydStats />
        <Card title="Todos" height="">
          <div className="grid-col-3">
            {listedAreas?.map((item: any, i) => (
              <div key={i} className="card shadow-1 w-full">
                <PercentageCircle
                  color={"blue"}
                  size={150}
                  title={item.name}
                  area={item._id}
                  section={section}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Areas;
