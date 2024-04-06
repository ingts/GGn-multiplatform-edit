import { PropsWithChildren } from "react";
import { ModalContextProvider } from "./ModalContextProvider";

export const Providers = ({ children }: PropsWithChildren) => {
  return <ModalContextProvider>{children}</ModalContextProvider>;
};
