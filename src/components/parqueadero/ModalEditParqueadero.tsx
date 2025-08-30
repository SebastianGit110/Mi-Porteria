import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IParqueaderoF } from "../../types/Person";
import { useForm } from "../../hooks/useForm";
import { updateParkingById } from "../../api/data";

interface Args {
  isOpenEdit: boolean;
  onOpenChangeEdit: () => void;
  setRefresh: (value: any) => void;
  currentParking: Omit<IParqueaderoF, "actions" | "house_num">;
}

const sType = [
  { key: "Si", label: "Si" },
  { key: "No", label: "No" },
];

const vType = [
  { key: "Carro", label: "Carro" },
  { key: "Moto", label: "Moto" },
];

const initialState: Omit<IParqueaderoF, "id" | "house_num" | "actions"> = {
  type: null,
  license: undefined,
  state: undefined,
};

export function ModalEditParqueadero({
  isOpenEdit,
  onOpenChangeEdit,
  setRefresh,
  currentParking,
}: Args) {
  const { formState, handleOnChange, onResetForm } =
    useForm<typeof initialState>(initialState);

  const { license, state, type } = formState;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEdit = async (onClose: () => void) => {
    if (type === null || license === undefined || state === undefined) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setIsLoading(true);

      const response = await updateParkingById({
        id: currentParking.id,
        license,
        state: state === "Si" ? true : false,
        type,
      });

      toast.success(response.data.message);

      setIsLoading(false);
      setRefresh((value: any) => !value);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      onClose();
      onResetForm();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        className="w-96 rounded-sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-800">
                Editar Parqueadero
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Select
                      className="w-1/2"
                      label="Tipo"
                      name="type"
                      onChange={handleOnChange}
                    >
                      {vType.map((elem: any) => (
                        <SelectItem key={elem.key}>{elem.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      className="w-1/2"
                      autoComplete="off"
                      label="Placa"
                      type="text"
                      name="license"
                      onChange={handleOnChange}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select
                      className="w-1/2"
                      label="Acceso"
                      name="state"
                      onChange={handleOnChange}
                    >
                      {sType.map((elem: any) => (
                        <SelectItem key={elem.key}>{elem.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    handleEdit(onClose);
                  }}
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
