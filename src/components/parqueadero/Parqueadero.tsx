import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { IParqueaderoF } from "../../types/Person";
import { getAllParkings } from "../../api/data";
import { Button, useDisclosure } from "@heroui/react";
import { ModalParqueadero } from "./ModalParqueadero";
import { ModalDeleteParqueadero } from "./ModalDeleteParqueadero";
import { ModalEditParqueadero } from "./ModalEditParqueadero";

export const Parqueadero = () => {
  const [data, setData] = useState<IParqueaderoF[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentParking, setCurrentParking] = useState<
    Omit<IParqueaderoF, "actions" | "house_num">
  >({
    id: "",
    type: null,
    license: "",
    state: false,
  });
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const setParqueadero = async () => {
    const response = await getAllParkings();
    setData(response.data);
  };

  useEffect(() => {
    setParqueadero();
  }, [refresh]);

  const columns = useMemo<MRT_ColumnDef<IParqueaderoF>[]>(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "Id",
      //   muiTableHeadCellProps: {
      //     style: {
      //       color: "oklch(43.2% 0.095 166.913)",
      //       fontSize: "14px",
      //     },
      //   },
      //   enableHiding: false,
      // },
      {
        accessorKey: "house_num",
        header: "Casa",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "type",
        header: "Tipo",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "license",
        header: "Placa",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "state",
        header: "Acceso",
        Cell: ({ cell }) => (cell.getValue() ? "Sí" : "No"),
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "actions",
        header: "Acciones",
        Cell: ({ cell }) => (
          <div className="flex gap-1">
            <Button
              className="w-10 bg-[#a4f4cf] rounded-sm text-xs flex items-center justify-center overflow-hidden"
              style={{ minWidth: "auto" }}
              onPress={() => {
                const { id, type, license, state } = cell.row.original;
                setCurrentParking({ id, type, license, state });
                onOpenEdit();
              }}
            >
              ✏️
            </Button>
            <Button
              className="w-10 bg-red-200 rounded-sm text-xs flex items-center justify-center overflow-hidden"
              style={{ minWidth: "auto" }}
              color="danger"
              variant="light"
              onPress={() => {
                const { id, type, license, state } = cell.row.original;
                setCurrentParking({ id, type, license, state });
                onOpenDelete();
              }}
            >
              🗑️
            </Button>
          </div>
        ),
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    renderTopToolbarCustomActions: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          className="bg-[#a4f4cf] p-2.5 w-3xs text-emerald-800 hover:font-bold rounded cursor-pointer"
          onClick={() => onOpen()}
        >
          Registrar Parqueadero
        </button>
      </div>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        // alert(
        //   `Haz hecho clic en: ${row.original.license} ${row.original.type}`
        // );
      },
      style: {
        cursor: "pointer",
      },
    }),
    muiTableContainerProps: {
      sx: {
        borderRadius: "4px", // tabla como tal
        overflow: "hidden",
        overflowX: "auto",
      },
    },
    muiTablePaperProps: {
      elevation: 3,
      sx: {
        borderRadius: "4px", // borde externo
        overflow: "hidden",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "14px",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#a4f4cf",
      },
    },
    muiToolbarAlertBannerProps: {
      sx: {
        backgroundColor: "#a4f4cf",
        color: "oklch(43.2% 0.095 166.913)",
        borderRadius: "8px",
      },
    },
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: false,
    },
  });

  return (
    <div className="flex justify-center p-8 min-h-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">
          Parqueadero
        </h1>
        <MaterialReactTable table={table} />
        <ModalParqueadero
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          setRefresh={setRefresh}
        />
        <ModalEditParqueadero
          isOpenEdit={isOpenEdit}
          onOpenChangeEdit={onOpenChangeEdit}
          setRefresh={setRefresh}
          currentParking={currentParking}
        />
        <ModalDeleteParqueadero
          isOpenDelete={isOpenDelete}
          onOpenChangeDelete={onOpenChangeDelete}
          setRefresh={setRefresh}
          currentParking={currentParking}
        />
      </div>
    </div>
  );
};
