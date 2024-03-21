const isInList = (list, uid) => {
  return list?.some((item) => {
    return item.uid === uid;
  });
};

export default isInList;
