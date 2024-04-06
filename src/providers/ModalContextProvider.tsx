import { css } from "@emotion/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../contexts/ModalContext";

const modalContainerStyles = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalChildren, setModalChildren] = useState<React.JSX.Element | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  function open(children: React.JSX.Element) {
    setModalChildren(children);
    setIsModalOpen(true);
  }

  function close() {
    setModalChildren(null);
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}

      {isModalOpen
        ? createPortal(
            <div css={modalContainerStyles}>{modalChildren}</div>,
            document.body,
          )
        : null}
    </ModalContext.Provider>
  );
};
