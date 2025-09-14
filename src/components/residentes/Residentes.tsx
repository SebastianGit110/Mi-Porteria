import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { IResidentF } from "../../types/Person";
import { useNavigate, useParams } from "react-router-dom";
import { getResidentsByHouseId } from "../../api/data";
import { Button, useDisclosure } from "@heroui/react";
import { ModalResidentes } from "./ModalResidentes";
import { ModalDeleteResidente } from "./ModalDeleteResidente";
import { ModalEditResidente } from "./ModalEditResidente";

export const Residentes = () => {
  const navigate = useNavigate();
  const { house_id } = useParams();

  const [data, setData] = useState<IResidentF[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [currentResident, setcurrentResident] = useState<Omit<IResidentF, 'house_num' | 'actions'>>({
    id: "",
    name: "",
    last_name: "",
    phone: 0,
    mail: "",
    resident_type: "",
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

  const setResidents = async () => {
    const response = await getResidentsByHouseId(house_id);
    setData(response.data);
  };

  useEffect(() => {
    setResidents();
  }, [refresh]);

  const columns = useMemo<MRT_ColumnDef<IResidentF>[]>(
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
        header: "Nombres",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "last_name",
        header: "Apellidos",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "phone",
        header: "Teléfono",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "mail",
        header: "Email",
        muiTableHeadCellProps: {
          style: {
            color: "oklch(43.2% 0.095 166.913)",
            fontSize: "14px",
          },
        },
        enableHiding: false,
      },
      {
        accessorKey: "resident_type",
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
        accessorKey: "actions",
        header: "Acciones",
        Cell: ({ cell }) => (
          <div className="flex gap-1">
            <Button
              className="w-10 bg-[#a4f4cf] rounded-sm text-xs flex items-center justify-center overflow-hidden"
              style={{ minWidth: "auto" }}
              onPress={() => {
                const { id, name, last_name, phone, mail, resident_type } =
                  cell.row.original;
                setcurrentResident({
                  id,
                  name,
                  last_name,
                  phone,
                  mail,
                  resident_type,
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
                const { id, name, last_name, phone, mail, resident_type } =
                  cell.row.original;
                setcurrentResident({
                  id,
                  name,
                  last_name,
                  phone,
                  mail,
                  resident_type,
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
        <button
          className="bg-[#a4f4cf] p-2.5 w-3xs text-emerald-800 hover:font-bold rounded cursor-pointer"
          onClick={() => onOpen()}
        >
          Registrar Residente
        </button>
      </div>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        // alert(
        //   `Haz hecho clic en: ${row.original.name} ${row.original.last_name}`
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
        <Button
          className="text-emerald-800 mb-6"
          onPress={() => {
            navigate("/casas");
          }}
        >
          Volver ←
        </Button>
        <h1 className="text-2xl font-bold text-emerald-800 mb-6">Residentes</h1>
        <MaterialReactTable table={table} />
        <ModalResidentes
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          house_id={house_id}
          setRefresh={setRefresh}
        />
        <ModalDeleteResidente
          isOpenDelete={isOpenDelete}
          onOpenChangeDelete={onOpenChangeDelete}
          setRefresh={setRefresh}
          currentResident={currentResident}
        />
        <ModalEditResidente
          isOpenEdit={isOpenEdit}
          onOpenChangeEdit={onOpenChangeEdit}
          setRefresh={setRefresh}
          currentResident={currentResident}
        />
      </div>
    </div>
  );
};
