/** @jsx jsx */
import { jsx } from "@emotion/core";
import store from "./../../../../store";
import { setParserMessage } from "../../../search";
import { useSelector } from "react-redux";
import { Modal } from "../../../reusable";
import { Button, Heading, Alert } from "@umich-lib/core";
import { SPACING } from "../../../reusable/umich-lib-core-temp";

export default function SearchParserMessage() {
  const { parserMessage } = useSelector((state) => state.search);
  const isOpen = parserMessage !== null;

  if (!isOpen) {
    return null;
  }

  const handleDismiss = () => {
    store.dispatch(setParserMessage(null));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleDismiss}>
      <div
        css={{
          maxWidth: "32rem",
        }}
      >
        <Button
          kind="secondary"
          onClick={handleDismiss}
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
          Query parser message
        </Heading>
        <div
          css={{
            margin: `${SPACING["M"]} 0`,
          }}
        >
          <Alert>
            <p>
              <strong
                css={{
                  fontWeight: "600",
                }}
              >
                Type:{" "}
              </strong>
               {parserMessage.class}
            </p>
            <p>
            <strong
                css={{
                  fontWeight: "600",
                }}
              >
                Summary:{" "}
              </strong>
               {parserMessage.summary}
            </p>
            <p>
            <strong
                css={{
                  fontWeight: "600",
                }}
              >
                Details:{" "}
              </strong>
              {parserMessage.details}
            </p>
          </Alert>
        </div>

        <Button onClick={handleDismiss}>Okay</Button>
      </div>
    </Modal>
  );
}
