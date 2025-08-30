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
import { updateResidentById } from "../../api/data";
import { useForm } from "../../hooks/useForm";
import { IResidentF } from "../../types/Person";

interface Args {
  isOpenEdit: boolean;
  onOpenChangeEdit: () => void;
  setRefresh: (value: any) => void;
  currentResident: Omit<IResidentF, "house_num" | "actions">;
}

const rType = [
  { key: "Propietario", label: "Propietario" },
  { key: "Arrendatario", label: "Arrendatario" },
];

export function ModalEditResidente({
  isOpenEdit,
  onOpenChangeEdit,
  setRefresh,
  currentResident,
}: Args) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formState, handleOnChange, onResetForm } = useForm<
    Omit<IResidentF, "id" | "house_num" | "actions">
  >({
    name: undefined,
    last_name: undefined,
    phone: undefined,
    mail: undefined,
    resident_type: undefined,
  });

  const { name, last_name, phone, mail, resident_type } = formState;

  const handleEdit = async (onClose: () => void) => {
    if (
      name === undefined ||
      last_name === undefined ||
      mail === undefined ||
      phone === undefined ||
      resident_type === undefined
    ) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setIsLoading(true);
      const response = await updateResidentById({
        id: currentResident.id,
        name,
        last_name,
        phone,
        mail,
        resident_type,
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
                Editar Residente {currentResident.name}{" "}
                {currentResident.last_name}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Input
                      className="w-1/2"
                      label="Nombre(s)"
                      type="text"
                      name="name"
                      onChange={handleOnChange}
                    />
                    <Input
                      className="w-1/2"
                      label="Apellido(s)"
                      type="text"
                      name="last_name"
                      onChange={handleOnChange}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      className="w-1/2"
                      label="Email"
                      type="email"
                      name="mail"
                      onChange={handleOnChange}
                    />
                    <Input
                      className="w-1/2"
                      label="Teléfono"
                      type="number"
                      name="phone"
                      onChange={handleOnChange}
                    />
                  </div>

                  <div className="flex justify-start">
                    <Select
                      className="w-1/2"
                      label="Tipo"
                      name="resident_type"
                      onChange={handleOnChange}
                    >
                      {rType.map((elem: any) => (
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
