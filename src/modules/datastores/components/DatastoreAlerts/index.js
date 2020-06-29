/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  SPACING,
  COLORS,
  Margins,
} from "../../../reusable/umich-lib-core-temp";
import { Heading } from "@umich-lib/core";
import { Button, Icon } from "../../../reusable/";

function COVIDAlert() {
  const [dismissed, setDismissed] = useState(false);
  const { datastores } = useSelector((state) => state);

  if (dismissed) {
    return null;
  }

  if (datastores.active === "mirlyn" || datastores.active === "everything") {
    return (
      <div
        css={{
          padding: SPACING["S"],
          background: COLORS.orange["100"],
          borderBottom: `solid 1px ${COLORS.orange["300"]}`,
          paddingBottom: SPACING["L"],
          a: {
            textDecoration: "underline",
          },
        }}
        role="alert"
      >
        <Margins>
          <Heading
            level={2}
            size="XL"
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              icon="error"
              size={24}
              css={{ marginRight: SPACING["XS"], color: COLORS.orange["400"] }}
            />
            <span>Important message</span>
          </Heading>
          <p>
            Physical items are not currently available for check-out. To
            restrict your search results to online resources only, check the
            “Available online” filter box. For physical print materials at limited locations, U-M faculty, staff, and students can request to have a small portion scanned. {" "}
            <a href="https://guides.lib.umich.edu/c.php?g=914690&p=7402383">
              Read about access changes due to COVID-19
            </a>
            .
          </p>

          <p>
            The HathiTrust Digital Library is offering U-M students, faculty, 
            and staff Emergency Temporary
            Access to its digital copies of in-copyright works in our
            collection. In catalog search results, look for items marked "Full
            text available (HathiTrust log in required)." Or, go to{" "}
            <a href="https://www.hathitrust.org">HathiTrust</a> and log in with
            your U-M credentials.
          </p>

          <Button
            onClick={() => setDismissed(true)}
            kind="secondary"
            css={{
              color: "inherit",
            }}
          >
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
