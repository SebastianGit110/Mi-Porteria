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
import { createHouse } from "../../api/data";
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { IHouseF } from "../../types/Person";

interface Args {
  isOpen: boolean;
  onOpenChange: () => void;
  setRefresh: (value: any) => void;
}

const store = [
  { key: "0", label: "No" },
  { key: "1", label: "Sí" },
];

export function ModalCasas({ isOpen, onOpenChange, setRefresh }: Args) {
  const { house_num, isStore, block, handleOnChange, onResetForm } = useForm<
    Omit<IHouseF, "id" | "actions" | "isStore"> & { isStore: number }
  >({
    house_num: undefined,
    isStore: 0,
    block: undefined,
  });

  const handleSubmit = async (onClose: () => void) => {
    if (house_num === undefined || block === undefined) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      const response = await createHouse({ house_num, isStore, block });

      toast.success(response.data.message);

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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-96 rounded-sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-800">
                Registrar Casa
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  <Input
                    className="w-3/5 max-w-sm"
                    label="Número de Casa"
                    type="number"
                    name="house_num"
                    onChange={handleOnChange}
                  />
                  <Select
                    className="w-3/5 max-w-sm"
                    label="Tienda"
                    defaultSelectedKeys={["0"]}
                    name="isStore"
                    onChange={handleOnChange}
                  >
                    {store.map((elem: any) => (
                      <SelectItem key={elem.key}>{elem.label}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    className="w-3/5 max-w-sm"
                    label="Bloque"
                    type="number"
                    name="block"
                    onChange={handleOnChange}
                  />
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
