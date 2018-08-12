import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { compose, withProps } from "recompose";
import { host } from "storybook-host";

import { annotate, withBoxState } from "../Box";

import WithLocale, { LocaleContext } from ".";
import Translations from "../translations";

const StateWithLocale = compose(
  withProps({
    title: (<span>Title</span>),
    translationMap: Translations,
    children: (
      <LocaleContext.Consumer>
        {translationMap => <p>{translationMap["test.title"]}</p>}
      </LocaleContext.Consumer>
    )
  }),
  withBoxState(
    "language",
    "en",
    annotate(action("ChangeLanguage"))
  )
)(WithLocale);

storiesOf("WithLocale", module)
  .addDecorator(host({
    align: "center top",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <StateWithLocale />
  ));
