import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import vite from "/vite.svg";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <Navbar maxWidth="2xl" className="border-b-2 border-b-emerald-800">
      <NavbarBrand
        className="flex gap-2 hover:cursor-pointer"
        onClick={handleOnClick}
      >
        <Image src={vite} width={30} className="text-primary" />
        <p className="font-bold font-roboto text-3xl">MiPortería</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        <NavbarItem>
          <Image width={35} src={vite} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
