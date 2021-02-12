import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@umich-lib/core";
import store from "../../../../store";
import { resetAdvancedFilters } from "../../../advanced/actions";

export default function AdvancedActiveFilters() {
  const { filters, activeFilters } = useSelector(
    (state) => state.advanced[state.datastores.active]
  );
  const datastoreUid = useSelector((state) => state.datastores.active);

  function handleFilterClear() {
    store.dispatch(resetAdvancedFilters({ datastoreUid }));
  }

  const hasActiveFilters =
    activeFilters && Object.keys(activeFilters).length > 0;

  if (hasActiveFilters) {
    const filterGroups = Object.keys(activeFilters).map((key) => {
      return filters.find((f) => f.uid === key);
    });
    return (
      <React.Fragment>
        <h2>Active Filters:</h2>
        <ul>
          {filterGroups.map((group) => (
            <li>
              {group.name}:{" "}
              {activeFilters[group.uid].map((value) => value).join(", ")}
            </li>
          ))}
        </ul>

        <Button kind="secondary" onClick={handleFilterClear}>
          Clear filters
        </Button>
      </React.Fragment>
    );
  }

  return <p>No active filters.</p>;
}
