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
import { createResident } from "../../api/data";
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { IResidentF } from "../../types/Person";

interface Args {
  isOpen: boolean;
  onOpenChange: () => void;
  house_id: string | undefined;
  setRefresh: (value: any) => void;
}

const rType = [
  { key: "Propietario", label: "Propietario" },
  { key: "Arrendatario", label: "Arrendatario" },
];

export function ModalResidentes({
  isOpen,
  onOpenChange,
  house_id,
  setRefresh,
}: Args) {
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

  const handleSubmit = async (onClose: () => void) => {
    if (
      house_id == undefined ||
      name == undefined ||
      last_name == undefined ||
      phone == undefined ||
      mail == undefined ||
      resident_type == undefined
    ) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      const response = await createResident({
        house_id,
        name,
        last_name,
        phone,
        mail,
        resident_type,
      });

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="rounded-sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-emerald-800">
                Registrar Residente
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
