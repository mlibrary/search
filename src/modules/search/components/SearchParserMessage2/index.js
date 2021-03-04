/** @jsx jsx */
import { jsx } from "@emotion/core";
import store from "./../../../../store";
import { setParserMessage } from "../../../search";
import { useSelector } from "react-redux";
import { Icon } from "@umich-lib/core";

export default function SearchParserMessage2() {
  const { parserMessage } = useSelector((state) => state.search);
  const isOpen = parserMessage !== null;

  if (!isOpen) {
    return null;
  }

  return (
    <section
      className="parser-message"
      css={{
        width: `100%`,
        color: "#333",
      }}
    >
      <p>
        <strong
          css={{
            fontWeight: "600",
            color: "#333",
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
            color: "#AA5600",
          }}
        >
          <Icon icon="error" size={20} /> Summary: {parserMessage.summary}
        </strong>
      </p>
    </section>
  );
}
