const isInList = (list, id) => {
  return list && list.filter(item => item.id === id).length > 0
}

export default isInList
