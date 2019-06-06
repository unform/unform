---
id: react-datepicker
title: React Datepicker
sidebar_label: React Datepicker
---

```js
import React, { useRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import { useField } from "@rocketseat/unform";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.selected",
      clearValue: pickerRef => {
        pickerRef.clear();
      }
    });
  }, [ref.current, fieldName]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
```
