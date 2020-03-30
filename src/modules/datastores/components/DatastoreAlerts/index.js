/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  SPACING,
  COLORS,
  Margins
} from "../../../reusable/umich-lib-core-temp";
import { Button } from "../../../reusable/";

function COVIDAlert() {
  const [dismissed, setDismissed] = useState(false);
  const { datastores } = useSelector(state => state);

  if (dismissed) {
    return null;
  }

  if (datastores.active === "mirlyn" || datastores.active === "everything") {
    return (
      <div
        css={{
          padding: SPACING["S"],
          "* + *": {
            marginBottom: SPACING["M"]
          },
          background: COLORS.orange["100"],
          borderBottom: `solid 1px ${COLORS.orange["300"]}`,
          color: COLORS.orange["500"],
          a: {
            color: COLORS.orange["500"],
            textDecoration: "underline"
          }
        }}
        role="alert"
      >
        <Margins>
          <p>
            Physical items are not currently available for check-out. To
            restrict your search results to online resources only, check the
            “Available online” filter box.{" "}
            <a href="https://guides.lib.umich.edu/c.php?g=914690">
              Read about access changes due to COVID-19
            </a>
            .
          </p>

          <p>
            The HathiTrust Digital Library is offering Temporary Emergency
            Access Service to its digital copies of the in-copyright works in
            our collection. To use this service, go to{" "}
            <a href="https://www.hathitrust.org">HathiTrust</a> and log in with
            your U-M credentials.
          </p>

          <Button onClick={() => setDismissed(true)} kind="secondary">
            Dismiss this message
          </Button>
        </Margins>
      </div>
    );
  }

  return null;
}

export default function DatastoreAlerts() {
  return (
    <React.Fragment>
      <COVIDAlert />
    </React.Fragment>
  );
}
