import React, { useState, useEffect, useRef } from "react";
import { WithContext as ReactTagInput } from "react-tag-input";

import { useField } from "../../../lib";

const KeyCodes = {
  COMMA: 188,
  ENTER: 13,
  SPACE: 32,
  TAB: 9
};

const delimiters = [
  KeyCodes.COMMA,
  KeyCodes.ENTER,
  KeyCodes.SPACE,
  KeyCodes.TAB
];

export default function TagInput({ name, placeholder }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [tags, setTags] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "tags",
      parseValue: () => tags.map(item => item.text)
    });
  }, [fieldName, tags]);

  function handleDelete(i) {
    setTags([...tags.filter((_, index) => index !== i)]);
  }

  function handleAddition(tag) {
    setTags([...tags, tag]);
  }

  return (
    <>
      <ReactTagInput
        tags={tags}
        name={name}
        placeholder={placeholder}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        allowDragDrop={false}
        allowDeleteFromEmptyInput={false}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
