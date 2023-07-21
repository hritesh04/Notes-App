export default function ({ title, content, onClick, children, s, d }) {
  return (
    <div
      style={{
        ...d,
        margin: "20px",
        // border: "1px solid black",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      onClick={onClick}
    >
      <p style={{ textAlign: "center" }}>{title}</p>
      <p style={{ ...s, textAlign: "center" }}>{content}</p>
      {children}
    </div>
  );
}
