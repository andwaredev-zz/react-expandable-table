export const getTotalWidth = cells => cells.reduce((totalWidth, { width }) => totalWidth + width, 0);

export const parseString = input => {
  if (typeof input === 'string') {
    return input;
  }

  if (typeof input === 'number' || typeof input === 'boolean') {
    return `${input}`;
  }

  return undefined;
};

export const stopPropagation = (e = {}) => {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
};

export default { getTotalWidth, parseString, stopPropagation };
