/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";

import { Modal, Icon } from "../../../reusable";

import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import { Button, Heading } from "@umich-lib/core";

import { SPACING, COLORS } from "../../../reusable/umich-lib-core-temp";
import CheckboxFilters from "../CheckboxFilters";

import {
  getURLWithoutFilters,
  getURLWithFilterRemoved,
  filterOutActiveFilters,
  newSearch,
} from "../../utilities";

const filterGroupStyles = {
  padding: `0 ${SPACING["M"]}`,
  borderBottom: `solid 1px ${COLORS.neutral["100"]}`,
};

function FiltersLoadingContainer({ children }) {
  const { datastores, search, records } = useSelector((state) => state);
  const isLoading = search.searching && records.loading[datastores.active];

  if (isLoading) {
    return null;
  }

  return children;
}

export default function Filters() {
  const { datastores, filters } = useSelector((state) => state);
  const { order, groups } = filters;

  if (!order) {
    return null;
  }

  const preExpandedFilterGroups = order.reduce((memo, uid) => {
    if (groups[uid] && groups[uid].preExpanded) {
      memo = memo.concat(datastores.active + "-" + uid);
    }

    return memo;
  }, []);

  return (
    <section
      aria-label="filters"
      css={{
        background: "#FAFAFA",
      }}
    >
      <ActiveFilters />
      <CheckboxFilters />
      <FiltersLoadingContainer>
        <Accordion
          preExpanded={preExpandedFilterGroups}
          key={preExpandedFilterGroups.join("-")}
          allowMultipleExpanded
          allowZeroExpanded
          css={{
            margin: 0,
            padding: 0,
            "& > *": {
              ...filterGroupStyles,
            },
          }}
        >
          {order.map((uid) => (
            <FilterGroupContainer uid={uid} key={datastores.active + uid} />
          ))}
        </Accordion>
      </FiltersLoadingContainer>
    </section>
  );
}

function ActiveFilters() {
  const { datastores, filters } = useSelector((state) => state);
  const active = filters.active[datastores.active];

  if (!active) {
    return null;
  }

  /*
    input:
    {
      subject: ['Birds', 'Birds North America'],
      format: ['Science', 'Biology']
    }

    expected output:
    [
      { group: 'subject', value: 'Birds' },
      { group: 'subject', value: 'Birds North America' },
      { group: 'format', value: 'Science' },
      { group: 'format', value: 'Biology' }
    ]
  */
  const items = Object.keys(active).reduce((acc, group) => {
    // Just don't show the checkbox filters as active filter items.
    if (!filters.groups[group] || filters.groups[group].type !== "checkbox") {
      const activeFiltersToAdd = active[group].map((value) => {
        return { group, value };
      });

      acc = acc.concat(activeFiltersToAdd);
    }

    return acc;
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="active-filters"
      css={{
        ...filterGroupStyles,
        padding: `${SPACING["S"]} ${SPACING["M"]}`,
      }}
    >
      <h2
        id="active-filters"
        css={{
          fontSize: "1rem",
          marginTop: "0",
          marginBottom: SPACING["XS"],
        }}
      >
        Active filters
      </h2>

      <ul
        css={{
          margin: 0,
          listStyle: "none",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i + item.group + item.value}
            css={{
              marginBottom: SPACING["XS"],
              ":last-of-type": {
                marginBottom: 0,
              },
            }}
          >
            <ActiveFilterItem {...item} />
          </li>
        ))}
      </ul>

      {items.length > 1 && <ClearActiveFiltersLink />}
    </section>
  );
}

function ClearActiveFiltersLink() {
  const url = getURLWithoutFilters();

  return (
    <Link
      to={url}
      css={{
        display: "inline-block",
        paddingTop: SPACING["XS"],
        textDecoration: "underline",
        color: COLORS.neutral["300"],
      }}
    >
      Clear all active filters
    </Link>
  );
}

function ActiveFilterItem({ group, value }) {
  const { groups } = useSelector((state) => state.filters);
  const url = getURLWithFilterRemoved({ group, value });
  const name = groups[group] ? groups[group].metadata.name : group;

  return (
    <Link
      to={url}
      css={{
        padding: `${SPACING["XS"]} ${SPACING["S"]}`,
        color: COLORS.green["500"],
        background: COLORS.green["100"],
        border: `solid 1px ${COLORS.green["200"]}`,
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ":hover": {
          textDecoration: "underline",
        },
      }}
    >
      <span>
        {name}: {value}
      </span>
      <span>
        <Icon icon="close" />
      </span>
    </Link>
  );
}

function FilterGroupContainer({ uid }) {
  const { datastores, filters } = useSelector((state) => state);
  const group = filters.groups[uid];

  if (!group || group.filters.length === 0) {
    return null;
  }

  const activeFilters = filters.active[datastores.active]
    ? filters.active[datastores.active][uid]
    : null;

  const uuid = datastores.active + "-" + uid;

  const props = {
    uid,
    uuid,
    group,
    datastores,
    filters,
    activeFilters,
  };

  if (group.type === "multiselect") {
    return <FilterGroupMultiselect {...props} />;
  }

  return null;
}

function FilterGroupMultiselect({ filters, group, uid, uuid, activeFilters }) {
  const filtersWithoutActive = filterOutActiveFilters({
    active: activeFilters,
    filters: filters.groups[uid].filters,
  });

  if (filtersWithoutActive.length === 0) {
    return null;
  }

  return (
    <AccordionItem uuid={uuid} key={uuid}>
      <AccordionItemState>
        {({ expanded }) => (
          <React.Fragment>
            <AccordionItemHeading>
              <AccordionItemButton
                css={{
                  padding: SPACING["S"],
                  margin: `0 -${SPACING["S"]}`,
                  fontWeight: "600",
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{group.metadata.name}</span>
                <span
                  css={{
                    color: COLORS.neutral["300"],
                  }}
                >
                  {expanded ? (
                    <Icon
                      size={24}
                      d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                    />
                  ) : (
                    <Icon
                      size={24}
                      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                    />
                  )}
                </span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <FilterGroupFilters
              group={group}
              expanded={expanded}
              filters={filtersWithoutActive}
            />
          </React.Fragment>
        )}
      </AccordionItemState>
    </AccordionItem>
  );
}

function FilterGroupFilters({ group, expanded, hidden = false, filters }) {
  if (hidden || !expanded || filters.length === 0) {
    return null;
  }

  return (
    <AccordionItemPanel>
      <ul
        css={{
          listStyle: "none",
          margin: "0",
        }}
      >
        {filters.slice(0, 5).map((f, i) => (
          <li key={group.metadata.name + f.value + i}>
            <FilterContainer group={group} {...f} />
          </li>
        ))}
      </ul>

      {filters.length > 5 && (
        <ShowAllFiltersModal group={group} filters={filters} />
      )}
    </AccordionItemPanel>
  );
}

function FilterContainer({ group, value, count }) {
  const search = newSearch({ filter: { [group.uid]: value } });
  const url = document.location.pathname + "?" + search;

  return <Filter url={url} value={value} count={count} />;
}

function Filter({ value, count, url }) {
  return (
    <Link
      to={url}
      css={{
        display: "flex",
        justifyContent: "space-between",
        padding: `${SPACING["2XS"]} 0`,
        ":hover": {
          span: {
            textDecoration: "underline",
          },
        },
      }}
    >
      <span css={{ marginRight: SPACING["XS"] }}>{value}</span>
      <span css={{ color: COLORS.neutral["400"] }}>
        {numeral(count).format(0, 0)}
      </span>
    </Link>
  );
}

function ShowAllFiltersModal({ group, filters }) {
  const [open, setOpen] = useState(false);

  const name = group.metadata.name;

  return (
    <React.Fragment>
      <Button
        kind="secondary"
        small
        css={{
          margin: `${SPACING["S"]} 0`,
        }}
        onClick={() => setOpen(true)}
      >
        Show all {numeral(filters.length).format(0, 0)} {name + " filters"}
      </Button>

      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          css={{
            maxWidth: "22rem",
          }}
        >
          <Button
            kind="secondary"
            onClick={() => setOpen(false)}
            small
            css={{
              position: "fixed",
              right: "1.5rem",
              top: "1.5rem",
              border: "none",
              textDecoration: "underline",
            }}
          >
            Dismiss
          </Button>
          <Heading
            size="large"
            css={{
              marginTop: "0",
              marginRight: "4rem",
            }}
          >
            All {filters.length} {name} filters
          </Heading>

          <ul
            css={{
              listStyle: "none",
              margin: "0",
            }}
          >
            {filters.map((f, i) => (
              <li key={name + f.value + i}>
                <FilterContainer group={group} {...f} />
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </React.Fragment>
  );
}
