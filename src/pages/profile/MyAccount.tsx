import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Services
import { fetchMyActivities, setActivity } from "@/redux/reducers/activity";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import userService from "@/services/users";

const { usersById } = userService();

// Components
import ActivityModal from "@/components/activity/ActivityModal";
import AreaHeader from "@/components/area/AreaHeader";
import LineChart from "@/components/charts/LineChart";
import Card from "@/components/shared/Card";
import { notifySocket } from "@/sockets";
import {
  ActivitiesModal,
  CompletedActivities,
  PendingActivities,
  ProfileEficiencia,
  ProfileInfo,
} from "./components";
import ProfileProvider from "./context/ProfileContext";
import { fetchDevolucionByUser } from "@/redux/reducers/devolucion";

function MyAccount() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { user: authUser } = useAppSelector((state) => state.auth);

  const visitId = location.pathname.split("/")[2];

  const [activityModal, setActivityModal] = useState(false);
  const [activitiesModal, setActivitiesModal] = useState(false);
  const [visitUser, setVisitUser] = useState(null);

  useEffect(() => {
    dispatch(fetchDevolucionByUser());
  }, []);

  useEffect(() => {
    notifySocket.on("devolucion created", () =>
      dispatch(fetchDevolucionByUser())
    );
  });

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

  return (
    <ProfileProvider>
      <div className={`relative`}>
        {visitId && <AreaHeader title="Visita de perfil" />}
        <div className={`grid-3-1 ${visitId && "pt-6"}`}>
          <div className="flex flex-column w-full">
            {/* ProfileInfo */}
            <ProfileInfo user={user} />

            {/* Activities */}
            <PendingActivities handleSelectActivity={handleSelectActivity} />
          </div>
          <div className="flex flex-column">
            {/* EFICIENCIA */}
            <ProfileEficiencia
              user={user}
              handleSelectActivity={handleSelectActivity}
            />

            {/* TOP 3 */}
            <CompletedActivities
              handleSelectActivity={handleSelectActivity}
              setActivitiesModal={setActivitiesModal}
            />
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
    </ProfileProvider>
  );
}

export default MyAccount;
