import { css } from "@emotion/react";

interface Props {
  id: string;
  title: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ id, title, checked, onChange }: Props) => {
  return (
    <div css={css({ display: "flex", alignItems: "center" })}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};
