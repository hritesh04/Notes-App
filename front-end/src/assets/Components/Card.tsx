interface CardProps {
  id?: string;
  title: string;
  content: string;
  onClick: () => void;
  children?: React.ReactNode;
  s?: React.CSSProperties;
  d?: React.CSSProperties;
  c?: string;
}
export default function (props: CardProps) {
  return (
    <div
      style={{
        ...props.d,
        minWidth: "180px",
        maxWidth: "180px",
        margin: "30px",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
      }}
      onClick={props.onClick}
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
        {props.title}
      </p>
      <p
        style={{
          ...props.s,
          display: "flex",
          alignItems: "flexStart",
          justifyContent: "center",
        }}
      >
        {props.content || props.c}
      </p>
      {props.children}
    </div>
  );
}
