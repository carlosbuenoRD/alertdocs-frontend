import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDocumentsByDepartments } from "@/redux/reducers/documents";
import { getUsersByArea, getUsersByDepartment } from "@/redux/reducers/users";
import { getDepartment } from "@/redux/reducers/area";

// Components
import General from "@/components/area/General";

function Department() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { department } = useAppSelector((state) => state.area);

  const areaId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(getDepartment(areaId));
    dispatch(fetchDocumentsByDepartments(areaId));
    dispatch(getUsersByDepartment(areaId));
  }, []);

  return (
    <>
      <General eficiencia={areaId} title={department?.name} />
    </>
  );
}

export default Department;
