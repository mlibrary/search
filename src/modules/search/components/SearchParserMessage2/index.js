/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { Icon } from "@umich-lib/core";
import { COLORS } from "../../../reusable/umich-lib-core-temp";

export default function SearchParserMessage2() {
  const { parserMessage, query } = useSelector((state) => state.search);
  
  //Check if there is a message from the parser and render the query if no message
  if (!parserMessage) {
    return (
      <section
      className="results-message"
      css={{
        width: `100%`,
        color: COLORS.neutral["400"],
      }}
    >
      <p css={{
            fontWeight: "600",
          }}>
        <strong>
          Showing results for:{" "}
        </strong>
        <strong
          css={{
            color: "#0C5292",
          }}
        >
          {query} 
          </strong>
        </p>
       </section>
    )
  }

  return (
    <section
      className="parser-message"
      css={{
        width: `100%`,
        color: COLORS.neutral["400"],
      }}
    >
      <p
      css={{
            fontWeight: "600",
          }}>
        <strong
          css={{
            color: COLORS.neutral["400"],
          }}
        >
          Showing results for:{" "}
        </strong>
        <strong
          css={{
            color: "#0C5292",
          }}
        >
          {parserMessage.data.actual}
        </strong>
      </p>

      <p css={{
        fontSize: ".8em",
        paddingBottom: ".5em",
          }}
          >
        You searched for:{" "}
        <strong
          css={{
            fontWeight: "600",
          }}
        >
          {parserMessage.data.original}
        </strong>
      </p>

      <p>
        <strong
          css={{
            fontWeight: "600",
            color: "#AA5600",
            fontSize: ".8em",
          }}
        >
          <Icon icon="warning" size={14} />
          {parserMessage.data.details} 
        </strong>
      </p>
    </section>
  );
}
