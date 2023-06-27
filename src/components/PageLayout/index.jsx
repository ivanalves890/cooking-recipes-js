//import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      {/*<Navbar home={false} recipes={false} newRecipe={true} />*/}
      <Outlet />
    </>
  );
}
