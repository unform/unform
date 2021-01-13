import { flat, unflat, getIn, setIn } from '../lib/utils';

describe('getIn', () => {
  const obj = {
    null: null,
    array: [null, '', 1, false, undefined, {}],
    string: '',
    number: 1,
    boolean: false,
    undefined,
    object: {
      null: null,
      array: [null, '', 1, false, undefined, {}],
      string: '',
      number: 1,
      boolean: false,
      undefined,
    },
  };

  it('should get values correctly', () => {
    expect(getIn(obj, 'null')).toBe(obj.null);
    expect(getIn(obj, 'array')).toBe(obj.array);
    expect(getIn(obj, 'string')).toBe(obj.string);
    expect(getIn(obj, 'number')).toBe(obj.number);
    expect(getIn(obj, 'boolean')).toBe(obj.boolean);
    expect(getIn(obj, 'undefined')).toBe(obj.undefined);
    expect(getIn(obj, 'object')).toStrictEqual(obj.object);
    expect(getIn(obj, 'object.null')).toBe(obj.object.null);
    expect(getIn(obj, 'object.array')).toBe(obj.object.array);
    expect(getIn(obj, 'object.string')).toBe(obj.object.string);
    expect(getIn(obj, 'object.number')).toBe(obj.object.number);
    expect(getIn(obj, 'object.boolean')).toBe(obj.object.boolean);
    expect(getIn(obj, 'object.undefined')).toBe(obj.object.undefined);
  });
});

describe('setIn', () => {
  const obj = {};

  it('should set values correctly', () => {
    setIn(obj, 'null', null);
    setIn(obj, 'array', [null, '', 1, false, undefined, {}]);
    setIn(obj, 'string', '');
    setIn(obj, 'number', 1);
    setIn(obj, 'boolean', false);
    setIn(obj, 'undefined', undefined);
    setIn(obj, 'object', {
      null: null,
      array: [null, '', 1, false, undefined, {}],
      string: '',
      number: 1,
      boolean: false,
      undefined,
    });

    expect(obj).toStrictEqual({
      null: null,
      array: [null, '', 1, false, undefined, {}],
      string: '',
      number: 1,
      boolean: false,
      undefined,
      object: {
        null: null,
        array: [null, '', 1, false, undefined, {}],
        string: '',
        number: 1,
        boolean: false,
        undefined,
      },
    });
  });
});

describe('flat', () => {
  it('should flat object correctly', () => {
    const input = {
      null: null,
      array: [null, '', 1, false, undefined, {}],
      string: '',
      number: 1,
      boolean: false,
      undefined,
      object: {
        null: null,
        array: [null, '', 1, false, undefined, {}],
        string: '',
        number: 1,
        boolean: false,
        undefined,
      },
    };

    const output = {
      null: null,
      'array.0': null,
      'array.1': '',
      'array.2': 1,
      'array.3': false,
      'array.4': undefined,
      'array.5': {},
      string: '',
      number: 1,
      boolean: false,
      undefined,
      'object.null': null,
      'object.array.0': null,
      'object.array.1': '',
      'object.array.2': 1,
      'object.array.3': false,
      'object.array.4': undefined,
      'object.array.5': {},
      'object.string': '',
      'object.number': 1,
      'object.boolean': false,
      'object.undefined': undefined,
    };

    expect(flat(input)).toStrictEqual(output);
  });
});

describe('unflat', () => {
  it('should unflat object correctly', () => {
    const input = {
      null: null,
      'array.0': null,
      'array.1': '',
      'array.2': 1,
      'array.3': false,
      'array.4': undefined,
      'array.5': {},
      string: '',
      number: 1,
      boolean: false,
      undefined,
      'object.null': null,
      'object.array.0': null,
      'object.array.1': '',
      'object.array.2': 1,
      'object.array.3': false,
      'object.array.4': undefined,
      'object.array.5': {},
      'object.string': '',
      'object.number': 1,
      'object.boolean': false,
      'object.undefined': undefined,
    };

    const output = {
      null: null,
      array: [null, '', 1, false, undefined, {}],
      string: '',
      number: 1,
      boolean: false,
      undefined,
      object: {
        null: null,
        array: [null, '', 1, false, undefined, {}],
        string: '',
        number: 1,
        boolean: false,
        undefined,
      },
    };

    expect(unflat(input)).toStrictEqual(output);
  });
});
