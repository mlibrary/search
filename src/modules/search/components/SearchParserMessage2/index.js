/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { Icon } from "@umich-lib/core";
import { COLORS } from "../../../reusable/umich-lib-core-temp";

export default function SearchParserMessage2() {
  const { parserMessage } = useSelector((state) => state.search);

  if (!parserMessage) {
    return null;
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
          {parserMessage.details}
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
          {parserMessage.class}
        </strong>
      </p>

      <p>
        <strong
          css={{
            fontWeight: "600",
            color: COLORS.orange["500"],
          }}
        >
          <Icon icon="error" size={20} /> Summary: {parserMessage.summary}
        </strong>
      </p>
    </section>
  );
}
