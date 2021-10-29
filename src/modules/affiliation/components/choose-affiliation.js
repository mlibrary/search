/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import qs from "qs";

import { Button, Heading, Text, MEDIA_QUERIES } from "@umich-lib/core";
import { Modal } from "../../reusable";
import { COLORS, SPACING } from "../../reusable/umich-lib-core-temp";

export default function ChooseAffiliation() {
  const { defaultAffiliation, affiliationOptions } = useSelector(
    state => state.affiliation
  );
  const [cookies] = useCookies(["affiliation"]);
  const [open, setOpen] = useState(false);

  let affiliation = defaultAffiliation;

  if (cookies["affiliation"]) {
    affiliation = cookies["affiliation"];
  }

  const label = affiliationOptions[affiliation];
  const alternativeAffiliation = affiliation === "aa" ? "flint" : "aa";
  const alternativeLabel = affiliationOptions[alternativeAffiliation];

  function changeAffiliation() {
    const parsed = qs.parse(document.location.search.substring(1), {
      allowDots: true
    });
    const withAffiliation = {
      ...parsed,
      affiliation: alternativeAffiliation
    };

    document.location.href =
      document.location.pathname +
      "?" +
      qs.stringify(withAffiliation, {
        arrayFormat: "repeat",
        encodeValuesOnly: true,
        allowDots: true,
        format: "RFC1738"
      });
  }

  const activeSelector = affiliation === 'aa' ? 'div:first-of-type' : 'div:last-of-type'

  return (
    <React.Fragment>
      <Button
        kind="secondary"
        css={{
          color: "white",
          border: "none",
          padding: "0",
          border: `solid 1px ${COLORS.blue[500]}`,
          boxShadow: `0 0 0 1px rgb(16 22 26 / 10%), 0 4px 8px rgb(16 22 26 / 20%), 0 18px 46px 6px rgb(16 22 26 / 20%);`
        }}
        onClick={() => setOpen(true)}
      >
        <VisuallyHidden>Choose campus affiliation</VisuallyHidden>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            borderRadius: '4px',
            textTransform: 'uppercase',
            fontWeight: '800',
            fontSize: '0.75rem',
            textAlign: 'right',
            'div': {
              display: 'block',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              '&:hover': {
                textDecoration: 'underline'
              }
            },
            [activeSelector]: {
              background: COLORS.blue['300']
            }
          }}
        ><div>Ann Arbor</div><div>Flint</div>
        </div>
      </Button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <div
          css={{
            maxWidth: "32rem"
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
              textDecoration: "underline"
            }}
          >
            Dismiss
          </Button>
          <Heading
            size="large"
            css={{
              marginTop: "0",
              marginRight: "4rem"
            }}
          >
            Choose campus affiliation
          </Heading>
          <Text>
            Selecting an affiliation helps us connect you to available online
            materials licensed for your campus.
          </Text>

          <Button onClick={() => setOpen(false)}>Continue as {label}</Button>
          <span
            css={{
              [MEDIA_QUERIES.LARGESCREEN]: {
                margin: "0 0.5rem",
                display: "inline-block"
              },
              margin: "0.5rem",
              display: "block"
            }}
          >
            or
          </span>
          <Button kind="secondary" onClick={changeAffiliation} role="link">
            Change to {alternativeLabel}
          </Button>

          <Text css={{ marginBottom: "0" }} small>
            You can still use Library Search if you're not affiliated with
            either campus.
          </Text>
        </div>
      </Modal>
    </React.Fragment>
  );
}
