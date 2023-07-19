import Appbar from "./Appbar";
export default function ({ children, logedIN }) {
  return (
    <>
      <Appbar logedIN={logedIN} />
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#ffff",
        }}
      >
        {children}
      </div>
    </>
  );
}
