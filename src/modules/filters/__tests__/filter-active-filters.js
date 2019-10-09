import {
  filterOutActiveFilters
} from '../utilities'

it('filter out active filter when it is in the list of filters', () => {
  expect(
    filterOutActiveFilters({
      active: ["Book"],
      filters: [
        {
          value: "Book"
        },
        {
          value: "Serial"
        }
      ]
    })
  ).toEqual([
    {
      value: "Serial"
    }
  ])
})

it('filter out many active filters when they are in the list of filters', () => {
  expect(
    filterOutActiveFilters({
      active: ["Book", "Serial"],
      filters: [
        {
          value: "Book"
        },
        {
          value: "Serial"
        },
        {
          value: "Article"
        }
      ]
    })
  ).toEqual([{ value: "Article" }])
})

it('filter out active filters, but return all filters when none are active', () => {
  expect(
    filterOutActiveFilters({
      filters: [
        {
          value: "Book"
        },
        {
          value: "Serial"
        }
      ]
    })
  ).toEqual([
    {
      value: "Book"
    },
    {
      value: "Serial"
    }
  ])
})