/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Breadcrumb } from "../../../reusable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Heading } from "@umich-lib/core";
import { COLORS, SPACING } from "../../../reusable/umich-lib-core-temp";

const cell_padding = {
  padding: SPACING["XS"],
  paddingRight: SPACING["L"],
};

export default function BrowseByCallNumber() {
  const { query } = useSelector((state) => state.search);
  const results = useSelector((state) => state.records.records['mirlyn'])
  /**
   *
   * Browse developer comments
   * =======
   *
   * This component will be responsible for rendering the results
   * for the search ("browse") entered  by the user.
   *
   * To do:
   * [ ] Connect the real data
   * [ ] Add attributes for not found/found styling
   */

  /* Using array for static headings until data from Browse */
  let headings = ["Call number", "Item"];

  return (
    <div className="container container-narrow y-spacing">
      <div css={{
        padding: SPACING['L'],
        background: 'white',
        borderRadius: '4px'
      }}>

        <Breadcrumb
          items={[
            { text: "Catalog", to: `/catalog` },
            { text: "Browse by call number" },
          ]}
          renderAnchor={(item) => <Link to={item.to}>{item.text}</Link>}
        />

        <Heading size="large" level={1}>
          Browse '{query}' in call numbers
        </Heading>

        <p>
          <span css={{ fontWeight: "600", color: "#333" }}>
            Browse by call number info:
          </span>{" "}
          Search a Library of Congress (LC) call number and view an alphabetical
          list of all LC call numbers and related titles indexed in the Library
          catalog.
        </p>

        <div
          css={{
            /*overflowX: "auto",*/
          }}
        >
          <table
            css={{
              width: "100%",
              minWidth: "24rem",
              textAlign: "left",
              tableLayout: "fixed",
              margin: `0 calc(-1 * ${SPACING['XS']})`
            }}
          >
            <thead>
              <tr>
                {headings.map((heading, i) => (
                  <th
                    colSpan={i + 1}
                    scope="col"
                    key={i}
                    css={{
                      fontWeight: "600",
                      color: COLORS.neutral["300"],
                      ...cell_padding,
                      borderBottom: `solid 2px ${COLORS.neutral["100"]}`,
                      width: headings.length === 3 && i === 2 ? "50%" : "auto",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results && results.map(result => <CallnumberResult {...result} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CallnumberResult(data) {
  const result = {
    callnumber: 'n/a',
    title: data.header.medium['main-left-aligned'][1][0].text,
    author: data.metadata.medium[1].description[0].text,
    published: data.metadata.medium[2].description[0].text
  }

  return (
    
    <tr colSpan="1" css={{ borderBottom: "solid 1px #CCCCCC" }}>
      <td
        css={{
          ...cell_padding,
          wordBreak: "break-word",
        }}
      >
       {result.callnumber}
      </td>
      <td
        colSpan="2"
        css={{
          ...cell_padding,
          wordBreak: "break-word",
          fontSize: "1em",
        }}
      >
        <a
          href={"#"}
          css={{ fontWeight: "600", textDecoration: "underline" }}
        >
          {result.title}
        </a>

        <p css={{ color: "#4E4E4E", marginTop: "0" }}>
          {result.author} {result.published} 
        </p>
      </td>
    </tr>
  )
}