import { Button, useDisclosure } from "@heroui/react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { IVisitantesF } from "../../types/Person";
import { getAllVisits } from "../../api/data";
import { Chip } from "@heroui/chip";
import { ModalVisitas } from "./ModalVisitas";
import { ModalVisitasView } from "./ModalVisitasView";
import { ModalEditVisitas } from "./ModalEditVisitas";
import { ModalDeleteVisitas } from "./ModalDeleteVisitas";

export const Visitas = () => {
  const [data, setData] = useState<IVisitantesF[]>([]);
  const [currentVisit, setCurrentVisit] = useState<IVisitantesF | null>(null);
  const [refresh, setRefresh] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    isOpen: isOpenVisit,
    onOpen: onOpenVisit,
    onOpenChange: onOpenChangeVisit,
  } = useDisclosure();

  const {
    isOpen: isOpenEditVisit,
    onOpen: onOpenEditVisit,
    onOpenChange: onOpenChangeEditVisit,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  useEffect(() => {
    const fetchAllVisits = async () => {
      try {
        const response = await getAllVisits();
        setData(response.data);
      } catch (error) {
        console.log("Error getAllVisits", error);
      }
    };

    fetchAllVisits();
  }, [refresh]);

  const columns = useMemo<MRT_ColumnDef<IVisitantesF>[]>(
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
        accessorKey: "name",
        header: "Nombre",
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
        header: "Estado",
        Cell: ({ cell }) => {
          const value = cell.getValue() as any;
          if (!value) return "-";

          return (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center">
                <Chip className="bg-green-200 text-green-800 font-semibold">
                  Entrada
                </Chip>
                <span>
                  {value.entered ? value.entered.replaceAll("T", " ") : ""}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <Chip className="bg-red-200 text-red-800 font-semibold">
                  Salida
                </Chip>
                <span>{value.left ? value.left.replaceAll("T", " ") : ""}</span>
              </div>
            </div>
          );
        },
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "vehicle",
        header: "Vehiculo",
        Cell: ({ cell }) => {
          const value = cell.getValue() as any;
          if (!value) {
            return (
              <div className="flex justify-center items-center">
                <span>-</span>
              </div>
            );
          }

          return (
            <div className="flex flex-col gap-2 items-center">
              <Chip className="bg-blue-200 text-blue-800 font-semibold">
                {value.type}
              </Chip>
              <Chip className="bg-gray-200 text-gray-800 font-semibold">
                {value.color}
              </Chip>
              <Chip className="bg-yellow-200 text-yellow-800 font-semibold">
                {value.license}
              </Chip>
            </div>
          );
        },
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
                setCurrentVisit(cell.row.original);
                onOpenEditVisit();
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
                setCurrentVisit(cell.row.original);
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
          Registrar Visita
        </button>
      </div>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setCurrentVisit(row.original);
        onOpenVisit();
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
    <>
      <div className="flex justify-center p-8 min-h-screen">
        <div className="w-full max-w-6xl">
          <h1 className="text-2xl font-bold text-emerald-800 mb-6">Visitas</h1>

          <MaterialReactTable table={table} />
        </div>
      </div>

      <ModalVisitas
        isOpenVisitas={isOpen}
        onOpenChangeVisitas={onOpenChange}
        setRefresh={setRefresh}
      />
      <ModalVisitasView
        isOpenVisitas={isOpenVisit}
        onOpenChangeVisitas={onOpenChangeVisit}
        currentVisit={currentVisit}
      />
      <ModalEditVisitas
        isOpenEditVisitas={isOpenEditVisit}
        onOpenChangeEditVisitas={onOpenChangeEditVisit}
        currentVisit={currentVisit}
        setRefresh={setRefresh}
      />
      <ModalDeleteVisitas
        isOpenDelete={isOpenDelete}
        onOpenChangeDelete={onOpenChangeDelete}
        setRefresh={setRefresh}
        currentVisit={currentVisit}
      />
    </>
  );
};
