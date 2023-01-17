import { useAppSelector } from "@/redux/store";
import React from "react";

// Components
import Card from "../shared/Card";

function AreaUsers() {
  const { users } = useAppSelector((state) => state.user);

  return (
    <Card title="Usuarios - Top 4" height="fit" className="bg-blue-50" hover>
      <ul className="mb-0">
        {users.length > 0
          ? users.map((u: any) => (
              <li className="card p-2 px-3 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2">
                <p className="uppercase lh-1 font-medium text-sm m-0">
                  {u.name}
                </p>
                <h4 className="m-0 lh-2">179%</h4>
              </li>
            ))
          : ""}
      </ul>
    </Card>
  );
}

export default AreaUsers;
