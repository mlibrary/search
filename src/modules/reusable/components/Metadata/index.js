/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@umich-lib/core";
import { useSelector } from "react-redux";
import { icons } from "../../../reusable/components/Icon";
import {
  SPACING,
  MEDIA_QUERIES,
  COLORS,
  LINK_STYLES
} from "../../umich-lib-core-temp";
import { stringifySearchQueryForURL } from "../../../pride";

const visuallyHiddenCSS = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px"
};

export default function Metadata({ data, kind }) {
  const isCondensed = kind === "condensed";

  const metadataCSS = !isCondensed
    ? {
        [MEDIA_QUERIES.LARGESCREEN]: {
          display: "grid",
          gridTemplateColumns: "9rem 1fr",
          gridColumnGap: SPACING["S"],
          "dt:not(:first-of-type) + dd": {
            paddingTop: SPACING["XS"]
          }
        }
      }
    : {
        dt: {
          ...visuallyHiddenCSS
        },
        "dt:not(:first-of-type) + dd": {
          paddingTop: SPACING["XS"]
        }
      };

  return (
    <dl
      css={{
        ...metadataCSS,
        "dt:not(:first-of-type)": {
          paddingTop: SPACING["XS"]
        }
      }}
    >
      {data.map((d, i) => (
        <>
          <dt
            css={{
              gridColumnStart: "1"
            }}
          >
            {d.term}
          </dt>
          {d.description.map(d => (
            <dd
              css={{
                gridColumnStart: "2",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Description data={d} />
            </dd>
          ))}
        </>
      ))}
    </dl>
  );
}

function Description({ data }) {
  if (Array.isArray(data)) {
    return (
      <ol
        css={{
          margin: "0",
          padding: "0"
        }}
      >
        {data.map((d, i) => (
          <li
            css={{
              display: "inline-block"
            }}
          >
            {i > 0 && (
              <span
                css={{
                  color: COLORS.neutral["300"]
                }}
              >
                <Icon d={icons["navigate_next"]} />
              </span>
            )}
            <Description data={d} />
          </li>
        ))}
      </ol>
    );
  }

  const { icon, text } = data;

  return (
    <DescriptionItem {...data}>
      {icon && (
        <span
          css={{
            marginRight: SPACING["2XS"],
            lineHeight: "0",
            color: COLORS.neutral["300"]
          }}
        >
          <Icon icon={icon} size={16} />
        </span>
      )}
      {text}
    </DescriptionItem>
  );
}

function DescriptionItem({ icon, href, search, children }) {
  if (href || search) {
    return (
      <DescriptionItemLink href={href} search={search}>
        {children}
      </DescriptionItemLink>
    );
  }

  return children;
}

function DescriptionItemLink({ href, search, children }) {
  if (href) {
    return (
      <a css={LINK_STYLES["default"]} href={href}>
        {children}
      </a>
    );
  }

  return <SearchLink search={search}>{children}</SearchLink>;
}

function SearchLink({ children, search }) {
  const { datastores, institution } = useSelector(state => state);
  const activeDatastore = datastores.datastores.find(
    ds => ds.uid === datastores.active
  );
  const to =
    "/" +
    activeDatastore.slug +
    "?" +
    createSearchURL({
      ...search,
      institution,
      datastoreUid: activeDatastore.uid
    });

  return (
    <Link css={LINK_STYLES["default"]} to={to}>
      {children}
    </Link>
  );
}

function createSearchURL({ type, scope, value, institution, datastoreUid }) {
  const query = type === "fielded" ? `${scope}:${value}` : {};
  const filter = type === "filtered" ? { [scope]: value } : {};
  let library = {};

  if (datastoreUid === "mirlyn") {
    library = institution.active
      ? institution.active
      : institution.defaultInstitution;
  }

  return stringifySearchQueryForURL({
    query,
    filter,
    library
  });
}
