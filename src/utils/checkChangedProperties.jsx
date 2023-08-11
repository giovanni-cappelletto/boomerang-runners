const checkChangedProperties = (elementToObserve) => {
  const changedProperties = {};

  // elementToObserve = [{defaultObj}, changedProperty1: ..., changedProperty2: ...]
  // This for...of loop takes every changedProperty and it saves it in changedProperties object
  // that will be returned and used to update the state
  for (const property of Object.entries(elementToObserve).slice(1)) {
    changedProperties[property[0]] = property[1];
  }

  return changedProperties;
};

export default checkChangedProperties;
