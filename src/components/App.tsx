import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import NavBar from "./NavBar";

export function App() {
  return (
    <div className="flex flex-col">
        <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-1 ml-72 overflow-y-auto p-4 h-[calc(100vh-69.33px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
