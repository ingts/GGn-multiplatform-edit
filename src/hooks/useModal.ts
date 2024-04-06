import { useContext } from "react";

import { ModalContext } from "../contexts/ModalContext";

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(
      "useModal can only be used in a component wrapped with <ModalContext.Provider>",
    );
  }

  return modalContext;
};
