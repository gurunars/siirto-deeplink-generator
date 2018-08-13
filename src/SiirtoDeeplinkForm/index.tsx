import { codes } from "currency-codes";
import { JSONSchema6 } from "json-schema";
// tslint:disable-next-line:no-submodule-imports
import "rc-tooltip/assets/bootstrap_white.css";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import Form, { FieldTemplateProps } from "react-jsonschema-form";

import Tooltip from "rc-tooltip";

import { withState } from "recompose";
import Box from "../Box";
import { WithDeeplink } from "../SiirtoDeeplink";
import { merge } from "../utils";
import { LocaleContext, Translate } from "../WithTranslation";

const UI_SCHEMA_MINIMAL = {
  "ui:order": [
    "siirtoIdentifier",
    "amount",
    "message",
    "*"
  ]
};

const UI_SCHEMA_FULL = {
  "ui:order": [
    "siirtoIdentifier",
    "amount",
    "message",
    "*",
    "ultimateBeneficiary"
  ]
};

const getMinimalSchema = (tr: Translate): JSONSchema6 => ({
  type: "object",
  required: [
    "siirtoIdentifier"
  ],
  properties: {
    siirtoIdentifier: {
      type: "string",
      title: tr("deeplink.siirtoIdentifier.title"),
      description: tr("deeplink.siirtoIdentifier.description")
    },
    amount: {
      type: "integer",
      title: tr("deeplink.amount.title"),
      exclusiveMinimum: 0,
      maximum: 9999999,
      description: tr("deeplink.amount.description")
    },
    message: {
      type: "string",
      title: tr("deeplink.message.title"),
      maxLength: 140,
      description: tr("deeplink.message.description")
    }
  }
});

const getFullSchema = (tr: Translate): JSONSchema6 => {
  const minimalSchema = getMinimalSchema(tr);
  return merge(
    minimalSchema,
    {
      properties: merge(minimalSchema.properties || {}, {
        currency: {
          type: "string",
          title: tr("deeplink.currency.title"),
          enum: codes()
        },
        personalMessage: {
          title: tr("deeplink.personalMessage.title"),
          type: "string",
          description: tr("deeplink.personalMessage.description")
        },
        reference: {
          type: "string",
          title: tr("deeplink.reference.title"),
          description: tr("deeplink.reference.description"),
          // TODO: clarify the formatting
          pattern: "^([0-9]{4,20}|[A-Za-z]{0,24})$"
        },
        redirectUrl: {
          type: "string",
          format: "uri",
          title: tr("deeplink.redirectUrl.title"),
          description: tr("deeplink.redirectUrl.description")
        },
        ultimateBeneficiary: {
          description: tr("deeplink.ultimateBeneficiary.description"),
          type: "object",
          title: tr("deeplink.ultimateBeneficiary.title"),
          required: [
            "name", "businessId", "classificationCode"
          ],
          properties: {
            name: {
              type: "string",
              title: tr("deeplink.ultimateBeneficiary.name.title"),
              description: tr("deeplink.ultimateBeneficiary.name.description")
            },
            businessId: {
              type: "string",
              title: tr("deeplink.ultimateBeneficiary.businessId.title"),
              description: tr("deeplink.ultimateBeneficiary.businessId.description")
            },
            classificationCode: {
              type: "integer",
              title: tr("deeplink.ultimateBeneficiary.classificationCode.title"),
              description: tr("deeplink.ultimateBeneficiary.classificationCode.description")
              // TODO: configure size checks
            }
          }
        }
      })
    }
  );
};

const CustomFieldTemplate = (props: FieldTemplateProps) => {
  const colorStyle = {
    color: props.rawErrors ? "red" : "black"
  };

  const tooltipAnnotation = (
    <Tooltip
      placement="right"
      overlay={props.errors}
      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
    >
      <FontAwesome name="question-circle" style={{
        cursor: "help",
        marginLeft: 15
      }} />
    </Tooltip>
  );

  return (
    <div className={props.classNames}>
      {props.displayLabel &&
        <label
          style={merge(colorStyle, {
            fontWeight: props.required ? "bolder" : "normal",
            fontSize: 20
          })}
          htmlFor={props.id}>
          {props.label}{props.required ? "*" : null}
          {props.rawErrors && tooltipAnnotation}
        </label>
      }
      {props.displayLabel &&
        <div style={merge(colorStyle, {
          wordWrap: "normal",
          fontSize: 13
        })}>
          {props.description}
        </div>
      }
      {props.children}
    </div>
  );
};

interface ExpandedState {
  expanded: Boolean;
  expandedOnChange: (it: Boolean) => void;
}

interface WithStyle {
  style?: React.CSSProperties;
}

export interface WithQr {
  qrShown: Box<boolean>;
}

type Props = WithStyle & WithQr & WithDeeplink;

const SiirtoDeeplinkForm = (
  props: Props & ExpandedState
): React.ReactElement<any> => (
    <div style={props.style}>
      <LocaleContext.Consumer>
        {tr =>
          <Form
            showErrorList={false}
            schema={props.expanded ?
              getFullSchema(tr) :
              getMinimalSchema(tr)
            }
            uiSchema={props.expanded ? UI_SCHEMA_FULL : UI_SCHEMA_MINIMAL}
            FieldTemplate={CustomFieldTemplate}
            formData={props.deeplink.get()}
            onChange={it => props.deeplink.set(it.formData)}
            onSubmit={() => props.qrShown.set(true)}
          >
            <div style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <button type="button" className="btn btn-info" onClick={() => props.expandedOnChange(!props.expanded)}>
                {tr(
                  props.expanded ? "deeplink.form.hideExtras" : "deeplink.form.showExtras"
                )}
              </button>
              <button type="button" className="btn btn-warning" onClick={
                () => { props.deeplink.set(null); }
              }>
                {tr("deeplink.form.clear")}
              </button>
              <button className="btn btn-primary" type="submit">
                {tr("deeplink.form.generate")}
              </button>
            </div>
          </Form>
        }
      </LocaleContext.Consumer>
    </div>
  );

export default withState<Props, boolean, "expanded", "expandedOnChange">(
  "expanded", "expandedOnChange", false
)(
  SiirtoDeeplinkForm
) as React.StatelessComponent<Props>;
