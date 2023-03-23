import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Services
import { getEficiencia } from "@/utils/formula";
import userService from "@/services/users";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchMyActivities, setActivity } from "@/redux/reducers/activity";

const { usersById } = userService();

// Components
import { Avatar } from "primereact/avatar";
import PercentageCircle from "@/components/shared/PercentageCircle";
import Card from "@/components/shared/Card";
import LineChart from "@/components/charts/LineChart";
import ActivityModal from "@/components/activity/ActivityModal";
import ActivityCard from "@/components/activity/ActivityCard";
import Countdown from "react-countdown";
import AreaHeader from "@/components/area/AreaHeader";
import ActivitiesModal from "@/components/profile/ActivitiesModal";

function MyAccount() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { user: authUser } = useAppSelector((state) => state.auth);
  const { activities } = useAppSelector((state) => state.activity);

  const visitId = location.pathname.split("/")[2];

  const [activityModal, setActivityModal] = useState(false);
  const [activitiesModal, setActivitiesModal] = useState(false);
  const [visitUser, setVisitUser] = useState(null);

  let pending = activities?.filter(
    (i: any) => i.state === "pending" || i.state === "ready"
  );
  let progress: any = activities?.filter((i: any) => i.state === "progress")[0];
  let completed = activities
    ?.filter((i: any) => i.state === "revision")
    .slice(0, 3);

  useEffect(() => {
    dispatch(fetchMyActivities(visitId ? visitId : authUser?._id));
  }, [visitId]);

  useEffect(() => {
    if (visitId) {
      getUser();
    }
  }, [visitId]);

  const user = visitId ? visitUser : authUser;

  const getUser = async () => {
    const user = await usersById(visitId);
    setVisitUser(user);
  };

  const handleSelectActivity = (activity: any) => {
    dispatch(setActivity(activity));
    setActivityModal(true);
  };

  const toMilliseconds = (hrs: number) => hrs * 60 * 60 * 1000;

  return (
    <div className={`relative`}>
      {visitId && <AreaHeader title="Visita de perfil" />}
      <div className={`grid-3-1 ${visitId && "pt-6"}`}>
        <div className="flex flex-column w-full">
          {/* Header */}
          <Card title="" height="" className="flex">
            <div className="flex flex-column justify-content-center align-items-center w-full">
              <Avatar
                image="/assets/images/mypic.png"
                shape="circle"
                className="w-8rem h-8rem shadow-2"
              />
              <h4 className="mt-3 uppercase text-center">{user?.name}</h4>
              <div className="flex">
                <h6 className="m-0 uppercase text-sm text-center text-500">
                  Dirección de Recursos Humanos --
                </h6>
                <h6 className="m-0 uppercase text-sm text-center text-500">
                  - Auxiliar de Recursos Humanos
                </h6>
              </div>
            </div>

            <div className="w-fit">
              {/* Estadisticas */}
              <ul className="border-1 m-0 border-50 card flex flex-column p-4 text-center">
                <li className="flex flex-column m-0">
                  <h4 className="mb-1">
                    {
                      activities?.filter((i: any) => i.state === "completed")
                        .length
                    }
                  </h4>
                  <h6 className="uppercase text-sm m-0 mt-2">Completados</h6>
                </li>
                <li className="w-full my-2 p-3 flex flex-column m-0 border-y-1 border-100">
                  <h4 className="mb-1">{0}</h4>
                  <h6 className="uppercase text-sm m-0 mt-2">Retrasados</h6>
                </li>
                <li className="flex flex-column m-0">
                  <h4 className="mb-1">0</h4>
                  <h6 className="uppercase text-sm m-0 mt-2">Devoluciones</h6>
                </li>
              </ul>
            </div>
          </Card>

          {/* Activities */}

          <Card title="Actividades pendientes" height="" className="flex-1">
            {/* PENDING */}
            {pending.length > 0 ? (
              <div>
                <div className="grid-col-2 w-full">
                  {pending?.map((p: any) => (
                    <ActivityCard
                      key={p._id}
                      onClick={() => handleSelectActivity(p)}
                      {...p}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className=" bg-red-400 w-full p-4 text-center">
                No tienes actividades pendientes
              </div>
            )}
          </Card>
        </div>
        <div className="flex flex-column">
          <Card title="Eficiencia" height="fit">
            <PercentageCircle user={user?._id} size={180} />
            {progress && (
              <div className="text-center fixed z-5 w-24rem bottom-0 right-0 ">
                <div
                  className="card border-2 border-blue-400"
                  onClick={() => handleSelectActivity(progress)}
                >
                  <h5>En proceso</h5>
                  <div className="text-3xl shadow-2 p-2 border-round-sm cursor-pointer">
                    <Countdown
                      date={
                        progress?.startedAt + toMilliseconds(progress?.hours)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
          <Card title="Realizados - top 3" height="" className="flex-1">
            {completed.length > 0 && (
              <div>
                {completed.map((i: any) => (
                  <div
                    onClick={() => handleSelectActivity(i)}
                    className="w-full bg-red shadow-1 mb-2 flex align-items-center justify-content-between p-2 cursor-pointer"
                  >
                    <p className="ready_task m-0 text-overflow-ellipsis w-10 white-space-nowrap overflow-hidden">
                      {i.description}
                    </p>
                    <p className="bg-green-400 shadow-2 p-2 border-round-md">
                      {Math.round(getEficiencia([i]))}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <a
              onClick={() => setActivitiesModal(true)}
              className="text-center w-full block underline cursor-pointer text-xs"
            >
              Ver todos
            </a>
          </Card>
        </div>
      </div>
      <Card title="Ultimos 6 meses" height="">
        <LineChart />
      </Card>

      {activityModal && (
        <ActivityModal
          visible={activityModal}
          onHide={() => setActivityModal(false)}
        />
      )}

      {activitiesModal && (
        <ActivitiesModal
          visible={activitiesModal}
          onHide={() => setActivitiesModal(false)}
        />
      )}
    </div>
  );
}

export default MyAccount;
