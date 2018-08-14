import { parse } from "query-string";
import * as React from "react";

import SiirtoDeeplink, { DeeplinkRootUrlContext, WithDeeplink } from "../SiirtoDeeplink";
import SiirtoDeeplinkForm, { WithQr } from "../SiirtoDeeplinkForm";
import Translations from "../translations";
import WithTranslation, { LocaleContext, WithLanguage } from "../WithTranslation";

import Logo from "../assets/logo.svg";

type Props = WithQr & WithDeeplink & WithLanguage;

const Closable = (props: {
  children: React.ReactNode,
  onClose: () => void
}) => (
    <LocaleContext.Consumer>
      {tr =>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center"
        }}>
          {props.children}
          <button
            className="btn btn-secondary"
            onClick={() => props.onClose()}
            style={{
              fontSize: 20,
              paddingLeft: 40,
              paddingRight: 40
            }}
          >
            {tr("deeplink.form.close")}
          </button>
        </div>
      }
    </LocaleContext.Consumer>
  );

const Inner = (props: Props): React.ReactElement<any> => {
  const link = props.deeplink.get();
  return (
    (props.qrShown.get() && link) ?
      <Closable onClose={() => props.qrShown.set(false)}>
        <SiirtoDeeplink deeplink={link} />
      </Closable> :
      <SiirtoDeeplinkForm
        deeplink={props.deeplink}
        qrShown={props.qrShown}
      />
  );
};

const isDev = (): boolean => parse(location.search).dev;

const Site = (props: Props): React.ReactElement<any> => (
  <DeeplinkRootUrlContext.Provider value={
    isDev() ?
      "https://siirto.trescomas.express/pay" :
      "https://siirto.nordea.fi/pay"
  }>
    <WithTranslation
      title={
          <div className="NavBar-logo">
            <a className="nordea-logo" href="/">
              <img src={Logo} className="app__logo" alt="logo" />
            </a>
          </div>
      }
      translationMap={Translations}
      language={props.language}
    >
      <Inner {...props} />
    </WithTranslation>
  </DeeplinkRootUrlContext.Provider>
);

export default Site as React.StatelessComponent<Props>;
