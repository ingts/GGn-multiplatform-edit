import { useEffect, useState } from "react";

import { css } from "@emotion/react";

import { GroupLink } from "../types";

interface Props {
  grouplinks: GroupLink[];
  checkboxes: boolean[];
  onCheckboxesChange: (checkboxes: boolean[]) => void;
}

export const LinkedGroupSelection = ({
  grouplinks,
  checkboxes,
  onCheckboxesChange,
}: Props) => {
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    if (selectAll) {
      return onCheckboxesChange(Array<boolean>(grouplinks.length).fill(true));
    }

    onCheckboxesChange(Array<boolean>(grouplinks.length).fill(false));
  }, [onCheckboxesChange, grouplinks.length, selectAll]);

  function handleSelectAllChange() {
    setSelectAll(!selectAll);
  }

  function handleCheckboxChange(position: number) {
    const updatedCheckboxes = checkboxes.map((checked, index) =>
      position === index ? !checked : checked,
    );

    onCheckboxesChange(updatedCheckboxes);
  }

  console.log("checkboxes", checkboxes);

  return (
    <div css={css({ display: "flex", flexDirection: "column" })}>
      <strong css={css({ marginBottom: "13px" })}>
        Destination Linked Groups
      </strong>

      <div
        css={css({
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        })}
      >
        <LinkedGroupSelectionItem
          checked={selectAll}
          id="all"
          title="All"
          onChange={handleSelectAllChange}
          index={-1}
        />
        {grouplinks.map(({ title, id }, index) => (
          <LinkedGroupSelectionItem
            checked={checkboxes[index]}
            key={id}
            id={id}
            title={title}
            index={index}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
};

interface LinkedGroupSelectionItemProps {
  id: string;
  title: string;
  checked: boolean;
  index: number;
  onChange: (position: number) => void;
}

const LinkedGroupSelectionItem = ({
  id,
  title,
  checked,
  index,
  onChange,
}: LinkedGroupSelectionItemProps) => {
  return (
    <div css={css({ display: "flex", alignItems: "center" })}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => {
          onChange(index);
        }}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};
