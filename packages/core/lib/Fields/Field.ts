import { BaseField, UnformField } from '../types';

class Field<T> implements BaseField<T> {
  private ref: any;

  private path = '';

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
      this.clearValue = () => customClearValue(this.ref, '');
    }
  }

  addRef(ref: any) {
    this.ref = ref;
  }

  getRef(): any {
    return this.ref;
  }

  getValue(): T {
    return this.ref[this.path];
  }

  setValue(value: T | string): void {
    this.ref[this.path] = value;
  }

  clearValue(value?: T): void {
    this.setValue(value || '');
  }
}

export default Field;
