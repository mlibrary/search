const isInList = (list, uid) => {
  return list && list.filter((item) => {
    return item.uid === uid;
  }).length > 0;
};

export default isInList;
