import { BaseField, UnformField } from '../types';

class RadioField<T> implements BaseField<T> {
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
      this.clearValue = () => customClearValue(this.ref, '');
    }
  }

  addRef(ref: any) {
    this.ref.push(ref);
  }

  getRef() {
    return this.ref;
  }

  getValue(): T {
    const checked = this.ref.find(ref => ref.checked);

    return checked ? checked[this.path] : null;
  }

  setValue(value: T | string): void {
    const item = this.ref.find(ref => ref[this.path] === value);

    if (item) {
      item.checked = true;
    }
  }

  clearValue(value?: T): void {
    this.ref.forEach(ref => {
      ref.checked = false;
    });

    if (value) this.setValue(value);
  }
}

export default RadioField;
