/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../reusable";
import { Button, Heading, Alert } from "@umich-lib/core";
import { SPACING } from "../../../reusable/umich-lib-core-temp";

export default function SearchParserMessage() {
  const { parserMessage } = useSelector((state) => state.search);
  const [open, setOpen] = useState(true);

  if (!parserMessage) {
    return null;
  }

  return (
    <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
      <div
        css={{
          maxWidth: "32rem",
        }}
      >
        <Button
          kind="secondary"
          onClick={() => setOpen(false)}
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
          Query Parser Message
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
                {parserMessage.class}:{" "}
              </strong>
              {parserMessage.summary}
            </p>

            <p>{parserMessage.details}</p>
          </Alert>
        </div>

        <Button onClick={() => setOpen(false)}>Okay</Button>
      </div>
    </Modal>
  );
}
