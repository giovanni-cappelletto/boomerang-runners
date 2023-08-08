const checkChangedProperties = (elementToObserve) => {
  const changedProperties = {};

  for (const property of Object.entries(elementToObserve).slice(1)) {
    changedProperties[property[0]] = property[1];
  }

  return changedProperties;
};

export default checkChangedProperties;
