// import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { host } from "storybook-host";

import { compose } from "recompose";
import SiirtoDeeplinkForm from ".";
import { withBoxState } from "../Box";
import Translations from "../translations";
import { getLocalized, LocaleContext } from "../WithTranslation";

const StateSiirtoDeeplinkForm = compose(
  withBoxState("deeplink", {
    siirtoIdentifier: "+666"
  })
)(SiirtoDeeplinkForm);

storiesOf("SiirtoDeeplinkForm", module)
  .addDecorator(host({
    align: "center top",
    height: 600,
    width: 500,
  }))
  .add("basic", () => (
    <LocaleContext.Provider
      value={key => getLocalized(Translations, "en", "en")[key]}
    >
      <StateSiirtoDeeplinkForm />
    </LocaleContext.Provider>
  ));