export default function ({ title, content, onClick, children, s, d, c }) {
  return (
    <div
      style={{
        ...d,
        minWidth: "180px",
        maxWidth: "180px",
        margin: "30px",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
      }}
      onClick={onClick}
    >
      <p
        style={{
          textAlign: "center",
          //minHeight: "20px",
          maxHeight: "20px",
          //width: "170px",
          overflow: "hidden",
        }}
      >
        {title}
      </p>
      <p
        style={{
          ...s,
          display: "flex",
          alignItems: "flexStart",
          justifyContent: "center",
        }}
      >
        {content || c}
      </p>
      {children}
    </div>
  );
}
