import * as React from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import HashStateAware from "./HashStateAware";
import { Deeplink } from "./SiirtoDeeplink";
import Site from "./Site";
import { merge } from "./utils";
import { SupportedLanguage } from "./WithTranslation";

interface State {
  deeplink: Deeplink | null;
  language: SupportedLanguage;
  qrShown: boolean;
}

const initial: State = {
  deeplink: null,
  language: SupportedLanguage.en,
  qrShown: false
};

const App = () => (
  <MuiThemeProvider>
    <HashStateAware initial={initial}>
      {(data: State, set: (data: State) => void) => {
        const field = (name: string) => ({
          get: () => data[name],
          set: (value: any) => {
            const payload = {};
            payload[name] = value;
            set(merge(data, payload) as State);
          }
        });

        return (
          <Site
            deeplink={field("deeplink")}
            language={field("language")}
            qrShown={field("qrShown")}
          />
        );
      }}
    </HashStateAware>
  </MuiThemeProvider>
);

export default App;
