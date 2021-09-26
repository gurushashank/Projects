export const sortAscendingTitle = (a, b) => {
  if (a.productTitle < b.productTitle) {
    return -1;
  } else if (a.productTitle > b.productTitle) {
    return 1;
  }
  return 0;
};

export const sortDecendingTitle = (a, b) => {
  if (a.productTitle < b.productTitle) {
    return 1;
  } else if (a.productTitle > b.productTitle) {
    return -1;
  }
  return 0;
};

export const sortDecendingCost = (a, b) => {
  if (a.cost < b.cost) {
    return 1;
  } else if (a.cost > b.cost) {
    return -1;
  }
  return 0;
};

export const sortAscendingCost = (a, b) => {
  if (a.cost < b.cost) {
    return -1;
  } else if (a.cost > b.cost) {
    return 1;
  }
  return 0;
};
