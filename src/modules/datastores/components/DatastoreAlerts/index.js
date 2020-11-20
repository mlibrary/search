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
	    Log in to view Get This options for items in our catalog while
	    building access is limited. <a
	    href="https://guides.lib.umich.edu/c.php?g=914690&p=7402383">Learn
	    more about access changes due to COVID-19</a>.
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
