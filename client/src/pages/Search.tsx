import { Navbar } from "@/components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Search = () => {
  const { search } = useLocation();
  const queryValue = new URLSearchParams(search).get("search");

  useEffect(() => {
    console.log(queryValue);
  }, [search]);

  return (
    <div>
      <Navbar />
    </div>
  );
};
