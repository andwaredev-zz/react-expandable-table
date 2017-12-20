export const getTotalWidth = cells => cells.reduce((totalWidth, { width }) => totalWidth + width, 0);

export const stopPropagation = (e = {}) => {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
};

export default { getTotalWidth, stopPropagation };
