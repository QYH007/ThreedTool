export const isObjectEmpty = (obj: {}): boolean => {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

export const arraysEqual = (a: number[], b: number[]): boolean => {
  if (a === b) return true;
  if (a === null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
