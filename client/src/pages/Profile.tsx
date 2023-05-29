import { Tabs } from "@/components";
import { useGetUser } from "@/hooks/useGetUser";

export const Profile = () => {
  const { user } = useGetUser();

  return <Tabs user={user} />;
};
