import { useState, useEffect } from "react";

// Components
import { Avatar } from "primereact/avatar";
import PercentageCircle from "@/components/shared/PercentageCircle";
import Card from "@/components/shared/Card";
import LineChart from "@/components/charts/LineChart";
import ActivityModal from "@/components/activity/ActivityModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchMyActivities, setActivity } from "@/redux/reducers/activity";
import ActivityCard from "@/components/activity/ActivityCard";
import Countdown from "react-countdown";
import { getEficiencia } from "@/utils/formula";

function MyAccount() {
  const dispatch = useAppDispatch();

  const [activityModal, setActivityModal] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { activities } = useAppSelector((state) => state.activity);

  let pending = activities?.filter((i: any) => i.state === "pending");
  let progress: any = activities?.filter((i: any) => i.state === "progress")[0];
  let completed = activities
    ?.filter((i: any) => i.state === "revision")
    .slice(0, 3);

  useEffect(() => {
    dispatch(fetchMyActivities(user?._id));
  }, []);

  const handleSelectActivity = (activity: any) => {
    dispatch(setActivity(activity));
    setActivityModal(true);
  };

  const toMilliseconds = (hrs: number) => hrs * 60 * 60 * 1000;

  return (
    <>
      <div className="grid-3-1">
        <div className="flex flex-column w-full">
          {/* Header */}
          <Card title="Estadisitcas" height="">
            <div className="flex flex-column justify-content-center align-items-center w-full">
              <Avatar
                image="assets/images/mypic.png"
                shape="circle"
                className="w-8rem h-8rem shadow-2"
              />
              <h4 className="mt-3 uppercase">{user?.name}</h4>
            </div>

            <div className="w-full px-4 pt-1 ">
              {/* Estadisticas */}
              <ul className="shadow-1 card mb-0 grid-col-3 px-2 text-center">
                <li className="flex flex-column m-0">
                  <h4 className="mb-1">
                    {
                      activities?.filter((i: any) => i.state === "revision")
                        .length
                    }
                  </h4>
                  <h6 className="uppercase text-sm m-0 mt-2">Completados</h6>
                </li>
                <li className="w-full border-x-1 border-200 flex flex-column m-0">
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

            <a className="text-center w-full block underline cursor-pointer text-xs">
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
    </>
  );
}

export default MyAccount;
