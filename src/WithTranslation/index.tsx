import * as _ from "lodash";
import * as React from "react";

import Box from "../Box";

export enum SupportedLanguage { en = "en", fi = "fi", sv = "sv" }

export interface WithLanguage {
  language: Box<SupportedLanguage>;
}

export interface LocaleMap { [key: string]: string; }

export type Translate = (key: string) => string;

export interface TranslationMap { [key: string]: LocaleMap; }

export const LocaleContext = React.createContext((it: string) => it);

export const getLocalized = (
  translationMap: TranslationMap,
  language: string,
  defaultLanguage: string
): { [key: string]: string } => {
  const results = {};
  _.keys(translationMap).map(it => {
    const item = translationMap[it];
    results[it] = item[language] || item[defaultLanguage] || "";
  });
  return results;
};

const TITLE_BAR_HEIGHT = "50px";

const WithTranslation = (props: {
  title: React.ReactNode,
  children: React.ReactNode,
  translationMap: TranslationMap,
} & WithLanguage): React.ReactElement<any> => {
  const language = props.language.get().toString();
  const localized = getLocalized(
    props.translationMap,
    language,
    SupportedLanguage.en
  );
  return (
    <LocaleContext.Provider
      value={key => localized[key]}
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        height: "100%",
        overflowY: "hidden",
      }}>
        <div style={{
          backgroundColor: "#0000a0",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          color: "white",
          height: TITLE_BAR_HEIGHT
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 800,
            padding: 10
          }}>
            {props.title}
            <select
              className="form-control"
              style={{
                textTransform: "uppercase",
                width: 80
              }}
              value={language}
              onChange={it => props.language.set(
                SupportedLanguage[it.target.value]
              )}
            >
              {
                _.map(
                  SupportedLanguage,
                  value =>
                    <option value={value} key={value}>
                      {value}
                    </option>
                )
              }
            </select>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "calc(100% - " + TITLE_BAR_HEIGHT + ")",
          overflowY: "auto",
          overflow: "overlay",
          alignContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            width: "100%",
            maxWidth: 800,
            padding: 10,
            paddingBottom: 80
          }} >
            {props.children}
          </div>
        </div>
      </div>
    </LocaleContext.Provider>
  );
};

export default WithTranslation;
