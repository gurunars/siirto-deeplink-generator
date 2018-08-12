import * as React from "react";

import SiirtoDeeplink, { WithDeeplink } from "../SiirtoDeeplink";
import SiirtoDeeplinkForm, { WithQr } from "../SiirtoDeeplinkForm";
import Translations from "../translations";
import WithTranslation, { LocaleContext, WithLanguage } from "../WithTranslation";

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

const Site = (props: Props): React.ReactElement<any> => (
  <WithTranslation
    title={
      <LocaleContext.Consumer>
        {tr => <p style={{
          fontSize: 20,
          margin: 0
        }}>{tr("site.title")}</p>}
      </LocaleContext.Consumer>
    }
    translationMap={Translations}
    language={props.language}
  >
    <Inner {...props} />
  </WithTranslation>
);

export default Site as React.StatelessComponent<Props>;
