import {
  FC,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { kanbaSocket, notifySocket } from "@/sockets";

// Services
import activityService from "@/services/activity";
const { getActivitiesByUser } = activityService();

// Models
import { Activity } from "@/models";

interface InitialProps {
  activities: Activity[];
  handleFetchAgain?: () => void;
  handleGetActivities: (id?: string) => void;
}

let initialState: InitialProps = {
  activities: [],
  handleGetActivities: () => {},
};

const ProfileContext = createContext<InitialProps>(initialState);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  const visitId = location.pathname.split("/")[2];

  useEffect(() => {
    handleGetActivities(visitId ? visitId : user?._id);
  }, [user?._id, fetchAgain, visitId]);

  useEffect(() => {
    notifySocket.on("notify created document", () =>
      handleGetActivities(visitId ? visitId : user?._id)
    );
    kanbaSocket.on("changed activity", () =>
      handleGetActivities(visitId ? visitId : user?._id)
    );
  });

  const handleGetActivities = async (id?: string) => {
    if (id) {
      try {
        const activities = await getActivitiesByUser(id);
        setActivities(activities);
      } catch (error: any) {
        console.log("HANDLE GET USER ACTIVITIES: ", error.message);
      }
    }
  };

  const handleFetchAgain = () => setFetchAgain(!fetchAgain);

  return (
    <ProfileContext.Provider
      value={{ activities, handleFetchAgain, handleGetActivities }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const ProfileState = () => {
  return useContext(ProfileContext);
};

export default ProfileProvider;
