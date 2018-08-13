import * as QRCode from "qrcode.react";
import { stringify } from "query-string";
import * as React from "react";
import { withContentRect } from "react-measure";

import Box from "../Box";
import { merge } from "../utils";

/**
 * @param name Human readable name
 * @param businessId Business Identifier
 * @param classificationCode Industrial classification code. 5 digits.
 */
export interface UltimateBeneficiary {
  name: string;
  businessId: string;
  classificationCode: string;
}

/**
 * @param siirtoIdentifier Own Siirto-identifier or Beneficiary proxy.
 *     Mandatory.
 * @param amount without decimal separator. Max 7 numbers. Optional.
 * @param currency 3 char currency code. Optional
 * @param personalMessage Originator’s personal message to the Beneficiary.
 *     Personal message will not be visible on the bank account statement.
 *     Optional.
 * @param message Payment message that will be visible on the bank account
 *     statement. Max 140 chars. Optional.
 * @param reference Structured payment reference that will be visible
 *     on the bank account statement. Max 20 numbers or 24 chars. Optional.
 * @param ultimateBeneficiary Extra data mandatory for PSP.
 * @param redirectUrl Url to which the use shall be redirected once the
 *     operation succeeds. If no url is supplied there will be no redirection.
 */
export interface Deeplink {
  siirtoIdentifier: string;
  amount?: number;
  message?: string;
  currency?: string;
  personalMessage?: string;
  reference?: string;
  ultimateBeneficiary?: UltimateBeneficiary;
  redirectUrl?: string;
}

export interface WithDeeplink {
  deeplink: Box<Deeplink | null>;
}

export const asQuery = (deeplink: Deeplink) => {
  let params: any = {
    s: deeplink.siirtoIdentifier,
    a: deeplink.amount,
    c: deeplink.currency,
    p: deeplink.personalMessage,
    m: deeplink.message,
    r: deeplink.reference,
    u: deeplink.redirectUrl
  };

  if (deeplink.ultimateBeneficiary) {
    const ub = deeplink.ultimateBeneficiary;
    params = merge(params, {
      un: ub.name,
      ub: ub.businessId,
      uc: ub.classificationCode
    });
  }

  return stringify(params);
};

export const DeeplinkRootUrlContext =
  React.createContext("UNDEFINED");

const SiirtoDeeplink = (props: {
  deeplink: Deeplink
}): React.ReactElement<any> =>
  <DeeplinkRootUrlContext.Consumer>
    {root => {
      const url = root + "?" + asQuery(props.deeplink);

      const DynamicQr = withContentRect("bounds")(
        ({ measureRef, contentRect }) => {
          const size = Math.min(
            contentRect.entry.width,
            contentRect.entry.height
          );
          return <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              marginBottom: 10
            }} ref={measureRef}>
              <QRCode
                size={size}
                value={url}
                renderAs="svg"
              />
            </div>
            <a style={{
              wordWrap: "break-word",
              maxWidth: size,
              marginBottom: 10,
              fontFamily: "\"Lucida Console\", Monaco, monospace"
            }} href={url}>
              {url}
            </a>
          </div>;
        });

      return <DynamicQr />;
    }}
  </DeeplinkRootUrlContext.Consumer>;

export default SiirtoDeeplink;