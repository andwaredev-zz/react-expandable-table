export const getTotalWidth = cells => cells.reduce((totalWidth, { width }) => totalWidth + width, 0);

export default { getTotalWidth };
