import { ReactElement } from "react";
import Appbar from "./Appbar";
export default function ({
  children,
  logedIN,
}: {
  children?: ReactElement;
  logedIN: boolean;
}) {
  return (
    <>
      <Appbar logedIN={logedIN} />
      <div
        style={{
          width: "100%",
          height: "87vh",
          backgroundColor: "#ffff",
        }}
      >
        {children}
      </div>
    </>
  );
}
