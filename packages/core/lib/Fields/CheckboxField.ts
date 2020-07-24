import { BaseField, UnformField } from '../types';

class CheckboxField<T = any[]> implements BaseField<T> {
  protected ref: any = [];

  protected path = '';

  constructor(field: UnformField) {
    const {
      ref,
      path,
      getValue: customGetValue,
      setValue: customSetValue,
      clearValue: customClearValue,
    } = field;

    this.addRef(ref);
    this.path = path || 'value';

    if (customGetValue) {
      this.getValue = () => customGetValue(this.ref);
    }

    if (customSetValue) {
      this.setValue = (value: any) => customSetValue(this.ref, value);
    }

    if (customClearValue) {
      this.clearValue = newValue => customClearValue(this.ref, newValue);
    }
  }

  addRef(ref: any) {
    this.ref.push(ref);
  }

  getRef() {
    return this.ref;
  }

  getValue(): T {
    return this.ref.filter(ref => ref.checked).map(ref => ref.value);
  }

  setValue(value: T[]): void {
    this.ref.forEach(ref => {
      if (value.includes(ref.value)) {
        ref.checked = true;
      }
    });
  }

  clearValue(value: T[]): void {
    this.ref.forEach(ref => {
      ref.checked = false;
    });

    if (value) this.setValue(value);
  }
}

export default CheckboxField;
