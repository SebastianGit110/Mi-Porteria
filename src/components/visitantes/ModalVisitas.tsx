import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
  Select,
  SelectItem,
  Input,
} from "@heroui/react";
import axios from "axios";
import { useRef, useState } from "react";
import WebCam from "react-webcam";

interface Args {
  isOpenVisitas: boolean;
  onOpenChangeVisitas: () => void;
}

const vType = [
  { key: "Carro", label: "Carro" },
  { key: "Moto", label: "Moto" },
];

export function ModalVisitas({ isOpenVisitas, onOpenChangeVisitas }: Args) {
  const [imagenSrc, setimagenSrc] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const webCamRef = useRef<any>();

  const handleOnCapture = async () => {
    // console.log("ESTOY EN:", __dirname);
    const imagenSrc = webCamRef.current.getScreenshot();
    setimagenSrc(imagenSrc);
    console.log(imagenSrc);

    const response = await fetch(imagenSrc);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("photo", blob, `captura-${Date.now()}.png`);

    await axios.post("http://localhost:3000/images/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

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
                Agregar Visitas
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
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      minWidth: "280px",
                    }}
                  >
                    <DatePicker label="Entrada" />
                    <DatePicker label="Salida" />

                    <Input
                      className="w-full"
                      autoComplete="off"
                      label="Color"
                      type="text"
                      name="color"
                      onChange={() => {}}
                    />

                    <Input
                      className="w-full"
                      autoComplete="off"
                      label="Placa"
                      type="text"
                      name="license"
                      onChange={() => {}}
                    />

                    <Select
                      className="w-full"
                      autoComplete="off"
                      label="Tipo"
                      name="type"
                      onChange={() => {}}
                    >
                      {vType.map((elem: any) => (
                        <SelectItem key={elem.key}>{elem.label}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* Column central: Cámara */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      minWidth: "280px",
                    }}
                  >
                    <WebCam
                      style={{
                        borderRadius: "12px",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                      }}
                      height="270px"
                      width="360px"
                      audio={false}
                      ref={webCamRef}
                      screenshotFormat="image/png"
                    />
                    <Button color="default" onPress={handleOnCapture}>
                      Capturar
                    </Button>
                  </div>

                  {/* Column derecha: Imagen capturada */}
                  {imagenSrc && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        minWidth: "280px",
                      }}
                    >
                      <img
                        src={imagenSrc}
                        style={{
                          height: "270px",
                          width: "360px",
                          borderRadius: "12px",
                          overflow: "hidden",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Button
                        className="bg-red-200"
                        style={{ borderRadius: "12px" }}
                        color="danger"
                        variant="light"
                        onPress={() => {
                          setimagenSrc(null);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    console.log("AGREGANDO VISITA");
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
                  Agregar
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
