import { useEffect, useState } from "react";

export const useCheckboxes = (
  length: number,
  hasAllCheckbox: boolean,
  initialValues = true,
) => {
  const [checkboxes, setCheckboxes] = useState(
    Array<boolean>(length).fill(initialValues),
  );

  const [selectAll, setSelectAll] = useState(initialValues);

  function handleAllCheckboxChange() {
    setSelectAll(!selectAll);
  }

  function handleCheckboxChange(position: number) {
    const updatedCheckboxes = checkboxes.map((checked, index) =>
      position === index ? !checked : checked,
    );

    setCheckboxes(updatedCheckboxes);
  }

  useEffect(() => {
    if (!hasAllCheckbox) {
      return;
    }

    if (selectAll) {
      return setCheckboxes(Array<boolean>(length).fill(true));
    }

    setCheckboxes(Array<boolean>(length).fill(false));
  }, [setCheckboxes, length, selectAll, hasAllCheckbox]);

  return {
    checkboxes,
    selectAll,
    handleAllCheckboxChange,
    handleCheckboxChange,
  };
};
