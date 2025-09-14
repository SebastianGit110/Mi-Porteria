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
import { IVisitantesF } from "../../types/Person";

interface Args {
  isOpenVisitas: boolean;
  onOpenChangeVisitas: () => void;
  currentVisit: IVisitantesF | null;
}

const vType = [
  { key: "Carro", label: "Carro" },
  { key: "Moto", label: "Moto" },
];

export const formatDateTimeLocal = (date: Date) => {
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
};

export function ModalVisitasView({
  isOpenVisitas,
  onOpenChangeVisitas,
  currentVisit,
}: Args) {
  return (
    <>
      <Modal
        isOpen={isOpenVisitas}
        onOpenChange={onOpenChangeVisitas}
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
                      value={
                        currentVisit?.house_num
                          ? currentVisit.house_num.toString()
                          : ""
                      }
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
                      readOnly
                      value={currentVisit?.name ? currentVisit.name : ""}
                      classNames={{
                        inputWrapper: "min-h-12",
                      }}
                    />

                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Entrada
                    </label>
                    <input
                      readOnly
                      value={
                        currentVisit?.state.entered
                          ? formatDateTimeLocal(
                              new Date(currentVisit?.state.entered)
                            )
                          : ""
                      }
                      type="datetime-local"
                      className="w-full max-w-sm rounded-xl bg-gray-100 px-4 py-3.5 text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all duration-200"
                      name="entered"
                    />

                    <label className="block text-sm font-medium text-gray-700 -mb-2">
                      Salida
                    </label>
                    <input
                      readOnly
                      value={
                        currentVisit?.state.left
                          ? formatDateTimeLocal(
                              new Date(currentVisit?.state.left)
                            )
                          : ""
                      }
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
                      readOnly
                      value={
                        currentVisit?.description
                          ? currentVisit?.description
                          : ""
                      }
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
                          value={
                            currentVisit.vehicle.color
                              ? currentVisit.vehicle.color
                              : ""
                          }
                          autoComplete="off"
                          type="text"
                          name="color"
                          readOnly
                          classNames={{
                            inputWrapper: "min-h-12",
                          }}
                        />

                        <label className="block text-sm font-medium text-gray-700 -mb-2">
                          Placa
                        </label>
                        <Input
                          className="w-full"
                          value={
                            currentVisit.vehicle.license
                              ? currentVisit.vehicle.license
                              : ""
                          }
                          autoComplete="off"
                          type="text"
                          name="license"
                          readOnly
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
                            currentVisit.vehicle.type === "Carro"
                              ? ["Carro"]
                              : ["Moto"]
                          }
                          autoComplete="off"
                          label="Tipo"
                          name="type"
                          isDisabled
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
