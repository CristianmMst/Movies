import { Navbar, Tabs } from "@/components";
import { useGetUser } from "@/hooks/useGetUser";

export const Profile = () => {
  useGetUser();

  return (
    <>
      <Navbar active />
      <Tabs />
    </>
  );
};
