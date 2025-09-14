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
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { IParqueaderoF } from "../../types/Person";
import { createParking } from "../../api/data";

interface Args {
  isOpen: boolean;
  onOpenChange: () => void;
  setRefresh: (value: any) => void;
}

const sType = [
  { key: "Si", label: "Si" },
  { key: "No", label: "No" },
];

const vType = [
  { key: "Carro", label: "Carro" },
  { key: "Moto", label: "Moto" },
];

const initialState: Omit<IParqueaderoF, "id" | "actions"> = {
  house_num: undefined,
  type: null,
  license: undefined,
  state: undefined,
};

export function ModalParqueadero({ isOpen, onOpenChange, setRefresh }: Args) {
  const { formState, handleOnChange, onResetForm } =
    useForm<typeof initialState>(initialState);

  const { house_num, license, state, type } = formState;

  const handleSubmit = async (onClose: () => void) => {
    if (
      house_num === undefined ||
      type === null ||
      license === undefined ||
      state === undefined
    ) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      const response = await createParking({
        house_num,
        license,
        state: state === "Si" ? true : false,
        type,
      });
      toast.success(response.data.message);

      setRefresh((value: boolean) => !value);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      onClose();
      onResetForm();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="rounded-sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-800">
                Registrar Parqueadero
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Input
                      className="w-1/2"
                      label="Casa"
                      type="number"
                      name="house_num"
                      onChange={handleOnChange}
                    />
                    <Input
                      className="w-1/2"
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-emerald-800 bg-[#a4f4cf] rounded-sm"
                  onPress={() => {
                    handleSubmit(onClose);
                  }}
                >
                  Registrar
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
