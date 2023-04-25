function getChildren (array, parent) {
  return array.reduce((result, item) => {
    if (item.parents.indexOf(parent) !== -1) {
      const children = getChildren(array, item.name);

      if (children.length) {
        result = result.concat(Object.assign(item, { children }));
      } else {
        result = result.concat(item);
      }
    }

    return result;
  }, []);
}

function parentIsNotInArray (array, parent) {
  return array.filter((item) => {
    return item.name === parent;
  }).length === 0;
}

function organizeByParents (array) {
  return array.reduce((result, item) => {
    if (!item.parents.length) {
      const children = getChildren(array, item.name);
      result = result.concat(Object.assign({ children }, item));
    }

    item.parents.forEach((parent) => {
      if (parentIsNotInArray(array, parent) && parentIsNotInArray(result, parent)) {
        const children = getChildren(array, parent);
        result = result.concat(Object.assign({ children }, {
          name: parent
        }));
      }
    });

    return result;
  }, []);
}

export default organizeByParents;
