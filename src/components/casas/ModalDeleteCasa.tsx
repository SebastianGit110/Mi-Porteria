import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { deleteHouseByNumber } from "../../api/data";
import { toast } from "react-toastify";
import { IHouseF } from "../../types/Person";

interface Args {
  isOpenDelete: boolean;
  onOpenChangeDelete: () => void;
  setRefresh: (value: any) => void;
  currentHouse: Omit<IHouseF, "actions">;
}

export function ModalDeleteCasa({
  isOpenDelete,
  onOpenChangeDelete,
  setRefresh,
  currentHouse,
}: Args) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async (onClose: () => void) => {
    try {
      setIsLoading(true);

      const response = await deleteHouseByNumber({ id: currentHouse.id });

      toast.success(response.data.message);

      setIsLoading(false);
      setRefresh((value: any) => !value);
    } catch (error: any) {
      console.error("Error al eliminar la casa:", error);

      toast.error(error.response.data.message);

      onClose();
      setIsLoading(false);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        className="w-96 rounded-sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-800">
                Eliminar Casa
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  ¿Estás seguro que deseas eliminar la casa{" "}
                  {currentHouse.house_num} y sus residentes?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    handleDelete(onClose);
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
                  Eliminar
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
