import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { IHouseF } from "../../types/Person";
import { useNavigate } from "react-router-dom";
import { Button, useDisclosure } from "@heroui/react";
import { ModalCasas } from "./ModalCasas";
import { getAllHouses } from "../../api/data";
import { ModalDeleteCasa } from "./ModalDeleteCasa";
import { ModalEditCasa } from "./ModalEditCasa";

export const Casas = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<IHouseF[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [currentHouse, setCurrentHouse] = useState<Omit<IHouseF, 'actions'>>({
    id: "",
    house_num: 0,
    isStore: false,
    block: 0,
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

  const setHouses = async () => {
    const response = await getAllHouses();
    setData(response.data);
  };

  useEffect(() => {
    setHouses();
  }, [refresh]);

  const columns = useMemo<MRT_ColumnDef<IHouseF>[]>(
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
        accessorKey: "isStore",
        header: "Tienda",
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
        accessorKey: "block",
        header: "Bloque",
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
                setCurrentHouse({
                  id: cell.row.original.id,
                  house_num: cell.row.original.house_num,
                  isStore: cell.row.original.isStore,
                  block: cell.row.original.block,
                });
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
                setCurrentHouse({
                  id: cell.row.original.id,
                  house_num: cell.row.original.house_num,
                  isStore: cell.row.original.isStore,
                  block: cell.row.original.block,
                });
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
        <Button
          onPress={onOpen}
          className="bg-[#a4f4cf] p-2.5 w-3xs text-emerald-800 hover:font-bold rounded cursor-pointer"
        >
          Registrar Casa
        </Button>
      </div>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate(`/residentes/${row.original.id}`);
      },
      style: {
        cursor: "pointer",
      },
    }),
    muiTableContainerProps: {
      sx: {
        borderRadius: "4px",
        overflow: "hidden",
        overflowX: "auto",
      },
    },
    muiTablePaperProps: {
      elevation: 3,
      sx: {
        borderRadius: "4px",
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
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">Casas</h1>

        <MaterialReactTable table={table} />
        <ModalCasas
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          setRefresh={setRefresh}
        />
        <ModalDeleteCasa
          isOpenDelete={isOpenDelete}
          onOpenChangeDelete={onOpenChangeDelete}
          setRefresh={setRefresh}
          currentHouse={currentHouse}
        />
        <ModalEditCasa
          isOpenEdit={isOpenEdit}
          onOpenChangeEdit={onOpenChangeEdit}
          setRefresh={setRefresh}
          currentHouse={currentHouse}
        />
      </div>
    </div>
  );
};
