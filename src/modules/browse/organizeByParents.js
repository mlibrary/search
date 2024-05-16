const getChildren = (array, parent) => {
  return array
    .filter((item) => {
      return item.parents.includes(parent);
    })
    .map((item) => {
      const children = getChildren(array, item.name);
      return children.length ? { ...item, children } : item;
    });
};

const organizeByParents = (array) => {
  const parentMap = new Map(array.map((item) => {
    return [item.name, item];
  }));

  return array
    .filter((item) => {
      return !item.parents.length || item.parents.some((parent) => {
        return !parentMap.has(parent);
      });
    })
    .map((item) => {
      return { ...item, children: getChildren(array, item.name) };
    });
};

export default organizeByParents;
