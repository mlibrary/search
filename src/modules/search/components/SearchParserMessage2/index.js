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
      className="parser-message"
      css={{
        width: `100%`,
        color: COLORS.neutral["400"],
      }}
    >
      <p>
        <strong
          css={{
            fontWeight: "600",
            color: COLORS.neutral["400"],
          }}
        >
          Showing results for:{" "}
        </strong>
        <strong
          css={{
            fontWeight: "600",
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
      <p>
        <strong
          css={{
            fontWeight: "600",
            color: COLORS.neutral["400"],
          }}
        >
          Showing results for:{" "}
        </strong>
        <strong
          css={{
            fontWeight: "600",
            color: "#0C5292",
          }}
        >
          {parserMessage.data.actual}
        </strong>
      </p>

      <p>
        You searched for:{" "}
        <strong
          css={{
            fontWeight: "600",
            fontSize: "1em",
          }}
        >
          {parserMessage.data.original}
        </strong>
      </p>

      <p>
        <strong
          css={{
            fontWeight: "600",
            color: COLORS.orange["500"],
          }}
        >
          <Icon icon="error" size={20} /> {parserMessage.data.details}
        </strong>
      </p>
    </section>
  );
}
