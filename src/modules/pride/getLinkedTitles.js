import { _ } from 'underscore'

const createLinkedTitle = (item) => {
  return {
    label: item.label,
    url: `/catalog/record/${item.id}`
  }
}

const getLinkedTitles = (data) => {
  const downlink = _.findWhere(data, {type: 'downlink'})
  const uplink = _.findWhere(data, {type: 'upli'})

  return {
    'down': _.compact([].concat(_.findWhere(data, {type: 'downlink'}))).map(createLinkedTitle),
    'up': _.compact([].concat(_.findWhere(data, {type: 'uplink'}))).map(createLinkedTitle)
  }
}

export default getLinkedTitles
