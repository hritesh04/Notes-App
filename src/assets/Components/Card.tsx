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
        height: "180px",
        width: "180px",
        borderRadius: "20px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={props.onClick}
    >
      <p
        style={{
          textAlign: "center",
          height: "10%",
          paddingTop: "10px",
          margin: "10px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <b>{props.title}</b>
      </p>
      <p
        style={{
          ...props.s,
          textAlign: "center",
          padding: "10px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          height: "35%",
        }}
      >
        {props.content || props.c}
      </p>
      {props.children}
    </div>
  );
}
