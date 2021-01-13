// inspired by https://github.com/developit/dlv
export function getIn(obj: object, path: string): any {
  const p = path.split('.');
  const l = p.length;

  for (let i = 0; i < l; i++) {
    obj = obj ? obj[p[i]] : undefined;
  }

  return obj;
}

// inspired by https://github.com/lukeed/dset
export function setIn(obj: object, path: string, value: any) {
  let x;
  let t = obj;
  const p = path.split('.');
  const l = p.length;

  for (let i = 0; i < l; ++i) {
    x = t[p[i]];

    if (i === l - 1) {
      t[p[i]] = value;
    } else if (x != null) {
      t[p[i]] = x;
    } else if (!!~p[i + 1].indexOf('.') || !(+p[i + 1] > -1)) {
      t[p[i]] = {};
    } else {
      t[p[i]] = [];
    }

    t = t[p[i]];
  }
}

function flatIter(output: object, val: any, key: string) {
  const t = Object.prototype.toString.call(val);
  const pfx = key ? `${key}.` : key;

  if (t === '[object Array]') {
    for (let k = 0; k < val.length; k++) {
      flatIter(output, val[k], pfx + k);
    }
  } else if (t === '[object Object]' && Object.keys(val).length > 0) {
    Object.keys(val).forEach(k => flatIter(output, val[k], pfx + k));
  } else {
    output[key] = val;
  }
}

// inspired by https://github.com/lukeed/flattie
export function flat<T = Record<string, any>>(obj: object) {
  const output = {};

  flatIter(output, obj, '');

  return output as T;
}

function unflatEmpty(key) {
  const char = key.charCodeAt(0);

  return char > 47 && char < 58 ? [] : {};
}

// inspired by https://github.com/lukeed/nestie
export function unflat<T = Record<string, any>>(obj: object) {
  let arr;
  let tmp;
  let key;
  let output;
  let i = 0;

  Object.keys(obj).forEach(k => {
    tmp = output;
    arr = k.split('.');

    for (i = 0; i < arr.length; ) {
      key = arr[i++];
      if (tmp == null) {
        tmp = unflatEmpty(`${key}`);
        output = output || tmp;
      }

      if (i < arr.length) {
        if (key in tmp) {
          tmp = tmp[key];
        } else {
          tmp[key] = unflatEmpty(`${arr[i]}`);
          tmp = tmp[key];
        }
      } else {
        tmp[key] = obj[k];
      }
    }
  });

  return output as T;
}
