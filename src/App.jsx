import axios from "axios";
import { useRef, useState } from "react";
import WebCam from "react-webcam";


function App() {
  const [image, setImage] = useState();
  const [imagenSrc, setimagenSrc] = useState(null);
  const webCamRef = useRef();


  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log(imageUrl);
    }
  };


  const handleOnCapture = async () => {
   
      const imagenSrc = webCamRef.current.getScreenshot();
      setimagenSrc(imagenSrc);
      console.log(imagenSrc);


      const response = await fetch(imagenSrc);
      const blob = await response.blob();


      const formData = new FormData();
      formData.append("photo", blob, `captura-${Date.now()}.png`);


      await axios.post("http://localhost:4000/images/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  };
  return (
    <>
      <h1>Hola</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} style={{ height: "510px", width: "500px" }} />}
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div>
          <WebCam
            width={720}
            height={360}
            audio={false}
            ref={webCamRef}
            screenshotFormat="image/png"
          />
          <button onClick={handleOnCapture}>Capture</button>
        </div>
        {imagenSrc && (
          <img src={imagenSrc} style={{ height: "360px", width: "490px" }} />
        )}
      </div>
      {/* {children("hola desde la funcion")} // Por si quisiera tener una funcion como children <App> {() => {}} </ App> */}
    </>
  );
}


export default App;
