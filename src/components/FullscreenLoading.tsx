import ReactLoading from "react-loading";

const FullscreenLoading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255,255,255,0.8)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <ReactLoading type="bars" color="block" height={100} width={60} />
    </div>
  );
};
export default FullscreenLoading;