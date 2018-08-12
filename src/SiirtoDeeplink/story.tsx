import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import SiirtoDeeplink from ".";

storiesOf("SiirtoDeeplink", module)
  .addDecorator(host({
    align: "center top",
    height: 600,
    width: 300,
  }))
  .add("basic", () => (
    <SiirtoDeeplink
      deeplink={{
        siirtoIdentifier: "1121212",
        amount: 123,
        message: "You shall not pass + foo"
      }}
    />
  ));