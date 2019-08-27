/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";

export default function Filters() {
  const { order } = useSelector(state => state.filters);

  return (
    <ol>
      {order.map(uid => (
        <FilterGroup uid={uid} />
      ))}
    </ol>
  );
}

function FilterGroup({ uid }) {
  const { groups } = useSelector(state => state.filters);
  const group = groups[uid];

  if (!group) {
    return null;
  }

  return (
    <li>
      {group.metadata.name}
      {group.preExpanded}
    </li>
  );
}
