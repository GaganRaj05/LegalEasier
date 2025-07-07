import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff", 
      }}
    >
      <ClipLoader color="#0A4DA2" size={50} />
    </div>
  );
};

export default Loader;
