import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Input,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { IVisitantesF } from "../../types/Person";
import { formatDateTimeLocal } from "./ModalVisitasView";
import { initialState } from "./ModalVisitas";
import { updateVisitById } from "../../api/data";
import { toast } from "react-toastify";

interface Args {
  isOpenEditVisitas: boolean;
  onOpenChangeEditVisitas: () => void;
  currentVisit: IVisitantesF | null;
  setRefresh: (value: any) => void;
}

const vType = [
  { key: "Carro", label: "Carro" },
  { key: "Moto", label: "Moto" },
];

export function ModalEditVisitas({
  isOpenEditVisitas,
  onOpenChangeEditVisitas,
  currentVisit,
  setRefresh,
}: Args) {
  const [data, setData] = useState<IVisitantesF | null>({
    ...initialState,
    id: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeNormal = (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    const { name, value } = event.target;

    setData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChange =
    (section: "vehicle" | "state") =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { name, value } = event.target;

      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [name]: name === "state" ? (value ? new Date(value) : null) : value,
          },
        };
      });
    };

  const handleEdit = async (onClose: () => void) => {
    setIsLoading(true);
    try {
      if (!data) return;

      console.log("VISIT TO EDIT", data);
      const response = await updateVisitById(data);

      toast.success(response.data.message);
      setRefresh((value: boolean) => !value);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      onClose();
      setData({ ...initialState, id: "" });
    }
  };

  useEffect(() => {
    setData(currentVisit);
  }, [currentVisit]);

  return (
    <>
      <Modal
        isOpen={isOpenEditVisitas}
        onOpenChange={onOpenChangeEditVisitas}
        className="rounded-sm"
      >
        <ModalContent className="w-fit max-w-none">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-800">
                Visita
              </ModalHeader>
              <ModalBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "16px",
                    width: "fit-content",
                  }}
                >
                  {/* Column izquierda: DatePickers */}
                  <div
                    className="custom-scrollbar"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      padding: "4px",
                      minWidth: "296px",
                      maxHeight: "25em",
                      overflowY: "auto",
                    }}
                  >
                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Casa
                    </label>
                    <Input
                      className="w-full"
                      autoComplete="off"
                      type="number"
                      name="house_num"
                      readOnly
                      value={data?.house_num ? data.house_num.toString() : ""}
                      classNames={{
                        inputWrapper: "min-h-12",
                      }}
                    />

                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Nombre
                    </label>
                    <Input
                      className="w-full"
                      autoComplete="off"
                      type="text"
                      name="name"
                      value={data?.name ? data.name : ""}
                      onChange={handleChangeNormal}
                      classNames={{
                        inputWrapper: "min-h-12",
                      }}
                    />

                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Entrada
                    </label>
                    <input
                      value={
                        data?.state.entered
                          ? formatDateTimeLocal(new Date(data?.state.entered))
                          : ""
                      }
                      onChange={handleChange("state")}
                      type="datetime-local"
                      className="w-full max-w-sm rounded-xl bg-gray-100 px-4 py-3.5 text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all duration-200"
                      name="entered"
                    />

                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Salida
                    </label>
                    <input
                      value={
                        data?.state.left
                          ? formatDateTimeLocal(new Date(data?.state.left))
                          : ""
                      }
                      onChange={handleChange("state")}
                      type="datetime-local"
                      className="w-full max-w-sm rounded-xl bg-gray-100 px-4 py-3.5 text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all duration-200"
                      name="left"
                    />

                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Descripción
                    </label>
                    <Textarea
                      minRows={1}
                      maxRows={4}
                      name="description"
                      value={data?.description ? data?.description : ""}
                      onChange={handleChangeNormal}
                      classNames={{
                        input: "max-h-24 min-h-8 overflow-y-auto",
                      }}
                    />

                    {currentVisit?.vehicle && (
                      <>
                        <label className="block text-sm font-medium text-gray-700 -mb-2">
                          Color
                        </label>
                        <Input
                          className="w-full"
                          autoComplete="off"
                          type="text"
                          name="color"
                          value={data?.vehicle?.color ?? ""}
                          onChange={handleChange("vehicle")}
                          classNames={{
                            inputWrapper: "min-h-12",
                          }}
                        />

                        <label className="block text-sm font-medium text-gray-700 -mb-2">
                          Placa
                        </label>
                        <Input
                          className="w-full"
                          autoComplete="off"
                          type="text"
                          name="license"
                          value={data?.vehicle?.license ?? ""}
                          onChange={handleChange("vehicle")}
                          classNames={{
                            inputWrapper: "min-h-12",
                          }}
                        />

                        <label className="block text-sm font-medium text-gray-700 -mb-2">
                          Tipo
                        </label>
                        <Select
                          className="w-full"
                          defaultSelectedKeys={
                            data?.vehicle?.type === "Carro"
                              ? ["Carro"]
                              : ["Moto"]
                          }
                          onChange={handleChange("vehicle")}
                          autoComplete="off"
                          label="Tipo"
                          name="type"
                        >
                          {vType.map((elem: any) => (
                            <SelectItem key={elem.key}>{elem.label}</SelectItem>
                          ))}
                        </Select>
                      </>
                    )}
                  </div>

                  {/* Column derecha: Imagen capturada */}
                  {currentVisit?.photo && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        minWidth: "280px",
                        margin: "auto auto",
                      }}
                    >
                      <img
                        src={`http://localhost:3000${currentVisit.photo}`}
                        style={{
                          height: "210px",
                          width: "360px",
                          borderRadius: "12px",
                          overflow: "hidden",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => handleEdit(onClose)}
                  isLoading={isLoading}
                  color="secondary"
                  className="text-emerald-800 bg-[#a4f4cf] rounded-sm"
                  spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                  Editar
                </Button>
                <Button
                  className="rounded-sm bg-red-200"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
