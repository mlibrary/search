const isInList = (list, uid) => {
  return list && list.filter(item => item.uid === uid).length > 0
}

export default isInList
