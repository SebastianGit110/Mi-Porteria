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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateHouseById } from "../../api/data";
import { useForm } from "../../hooks/useForm";
import { IHouseF } from "../../types/Person";

interface Args {
  isOpenEdit: boolean;
  onOpenChangeEdit: () => void;
  setRefresh: (value: any) => void;
  currentHouse: Omit<IHouseF, "actions">;
}
const store = [
  { key: "0", label: "No" },
  { key: "1", label: "Sí" },
];

export function ModalEditCasa({
  isOpenEdit,
  onOpenChangeEdit,
  setRefresh,
  currentHouse,
}: Args) {
  const { isStore, block, setFormState, handleOnChange, onResetForm } = useForm<
    Omit<IHouseF, "id" | "house_num" | "actions">
  >({
    isStore: currentHouse.isStore,
    block: currentHouse.block,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormState({
      isStore: currentHouse.isStore,
      block: currentHouse.block,
    });
  }, [currentHouse]);

  const handleEdit = async (onClose: () => void) => {
    if (isStore === undefined || block === undefined) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setIsLoading(true);

      console.log(currentHouse.id, isStore, block);
      const response = await updateHouseById({
        id: currentHouse.id,
        isStore,
        block,
      });

      toast.success(response.data.message);

      setRefresh((value: any) => !value);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);

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
                Editar Casa {currentHouse.house_num}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  <Input
                    className="w-3/5 max-w-sm"
                    label="Número de Casa"
                    type="number"
                    value={
                      currentHouse.house_num
                        ? currentHouse.house_num.toString()
                        : ""
                    }
                    readOnly
                  />
                  <Select
                    className="w-3/5 max-w-sm"
                    label="Tienda"
                    defaultSelectedKeys={currentHouse.isStore ? ["1"] : ["0"]}
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
                    value={block?.toString()}
                    name="block"
                    onChange={handleOnChange}
                  />
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
