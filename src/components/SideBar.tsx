import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { NavLink } from "react-router-dom";

const options = [
  { fijo: "Portería" },
  "correspondencia",
  "visitas",
  "domicilios",
  "parqueadero",
  "minuta",
  { fijo: "Gestión" },
  "casas",
];

export function SideBar() {
  const renderOptions = () =>
    options.map((option, index) => {
      if (typeof option === "object") {
        return (
          <div className="items-start w-64" key={index}>
            <h1 className="text-emerald-800 text-lg font-bold p-2.5">
              {option.fijo}
            </h1>
          </div>
        );
      }

      return (
        <NavbarItem className="my-2.5 w-64" key={index}>
          <NavLink
            to={option}
            className={({ isActive }) => {
              return `flex justify-center items-center text-emerald-800 text-lg hover:bg-emerald-200 p-2.5 rounded ${
                isActive ? "bg-emerald-200" : "" // Texto alineado a la izq quitar "flex justify-center items-center" y poner "block"
              }`;
            }}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </NavLink>
        </NavbarItem>
      );
    });

  return (
    <Navbar
      className="flex flex-col justify-start border-r-2 border-r-emerald-800 h-[calc(100vh-66px)] w-72 overflow-y-hidden hover:overflow-y-auto
 fixed custom-scrollbar"
      style={{ top: "66px", scrollbarGutter: "stable" }}
    >
      <NavbarContent className="flex flex-col h-full w-full">
        {renderOptions()}
      </NavbarContent>
    </Navbar>
  );
}

/* 
si no hay nada por defecto es flex flex-row
Si el flex está en dirección horizontal (flex-row), items-* controla la alineación vertical.
Si el flex está en dirección vertical (flex-col), items-* controla la alineación horizontal.
Si el flex está en dirección horizontal (flex-col), justify-* controla la alineación vertical.
Si el flex está en dirección vertical (flex-row), justify-* controla la alineación horizontal.

items-start = flex flex-col justify-start
*/
