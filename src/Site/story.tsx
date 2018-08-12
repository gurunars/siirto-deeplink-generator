import { storiesOf } from "@storybook/react";
import * as React from "react";
import { compose } from "recompose";
import host from "storybook-host";

import { withBoxState } from "../Box";

import Site from ".";

const StateSite = compose(
  withBoxState("deeplink", {
    siirtoIdentifier: "+666"
  }),
  withBoxState("language", "en"),
  withBoxState("isIpen", false)
)(Site);

storiesOf("SiirtoDeeplinkForm", module)
  .addDecorator(host({
    align: "center top",
    height: 600,
    width: 500,
  }))
  .add("basic", () => (
    <StateSite />
  ));