import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IVisitantesF } from "../../types/Person";
import { deleteVisitById } from "../../api/data";

interface Args {
  isOpenDelete: boolean;
  onOpenChangeDelete: () => void;
  setRefresh: (value: any) => void;
  currentVisit: IVisitantesF | null;
}

export function ModalDeleteVisitas({
  isOpenDelete,
  onOpenChangeDelete,
  setRefresh,
  currentVisit,
}: Args) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async (onClose: () => void) => {
    try {
      setIsLoading(true);

      const response = await deleteVisitById({
        id: currentVisit?.id!,
        photo: currentVisit?.photo
          ? currentVisit.photo.replace(/\/uploads\//g, "")
          : null,
      });
      toast.success(response.data.message);

      setRefresh((value: any) => !value);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      onClose();
      setIsLoading(false);
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
                Eliminar Visita
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-4">
                  ¿Estás seguro que deseas eliminar la visita{" "}
                  {currentVisit?.name} que visitó la casa{" "}
                  {currentVisit?.house_num}?
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
