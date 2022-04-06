/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import Icon from "../../../reusable/components/Icon";
import { COLORS } from "../../../reusable/umich-lib-core-temp";

export default function SearchResultsMessage() {
  const { parserMessage, query } = useSelector((state) => state.search);

  const createMarkup = (html) => {
    return { __html: html };
  };
  
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
        <p>
          Showing results for:{" "}
          <strong
          css={{
              fontWeight: "600",
            }}>
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
      <p aria-live="polite">
        Showing results for:{" "}
        <strong
        css={{
            fontWeight: "600",
          }}>
          {parserMessage.data.actual}
        </strong>
      </p>

      <p
        css={{
          fontSize: "0.875rem",
          paddingBottom: "0.25em",
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

      <span
      className="details-container"
      css={{
          color: "#AA5600",
          fontSize: "0.875rem",
          display: "inline-flex",
          alignContent: "center",
          padding: "0.25em"
          }}>
      <Icon icon="warning" size={15} />
        <p
          css={{
            paddingLeft: "0.25em",
            width: "97%",
          }}
          className="details-message"
          dangerouslySetInnerHTML={createMarkup(parserMessage.data.details)} />
      </span>
    </section>
  );
}
