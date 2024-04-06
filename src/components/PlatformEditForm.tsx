import { css } from "@emotion/react";
import { useModal } from "../hooks/useModal";

const containerStyle = css({
  background: "url('static/styles/game_room/images/smokeybackground.jpg')",
  minWidth: "400px",
  minHeight: "400px",
  borderRadius: "4px",
  padding: "10px",
});

export const PlatformEditForm = () => {
  const { close } = useModal();

  return (
    <div css={containerStyle}>
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        })}
      >
        <input
          css={css({ margin: "0px !important", width: "30px", height: "30px" })}
          type="button"
          onClick={close}
          value="X"
        />
      </div>
      <div></div>
    </div>
  );
};
