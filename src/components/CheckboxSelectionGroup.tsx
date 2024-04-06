import { css } from "@emotion/react";
import { CheckboxItem } from "../types";
import { Checkbox } from "./Checkbox";

interface Props<T> {
  id: string;
  title: string;
  hasAllCheckbox: boolean;
  data: T[];
  checkboxes: boolean[];
  handleCheckboxChange: (index: number) => void;
  isAllSelected?: boolean;
  handleAllCheckboxChange?: () => void;
}

export function CheckboxSelectionGroup<T extends CheckboxItem>({
  id,
  title,
  hasAllCheckbox,
  data,
  checkboxes,
  isAllSelected = false,
  handleCheckboxChange,
  handleAllCheckboxChange = () => {},
}: Props<T>) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div css={css({ display: "flex", flexDirection: "column" })}>
      <strong>{title}</strong>

      <div
        css={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        })}
      >
        {hasAllCheckbox ? (
          <Checkbox
            checked={isAllSelected}
            id={`${id}-all`}
            title="All"
            onChange={handleAllCheckboxChange}
          />
        ) : null}
        {data.map(({ title, id: dataId }, index) => (
          <Checkbox
            checked={checkboxes[index]}
            key={`${id}-${dataId}`}
            id={`${id}-${dataId}`}
            title={title}
            onChange={() => handleCheckboxChange(index)}
          />
        ))}
      </div>
    </div>
  );
}
