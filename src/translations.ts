import { TranslationMap } from "./WithTranslation";

// TODO: add localizations
const Translations: TranslationMap = {
  "test.title": {
    en: "Test EN",
    fi: "Test FI",
    sv: "Test SV"
  },
  "deeplink.currency.title": {
    en: "Currency",
    fi: "",
    sv: ""
  },
  "deeplink.personalMessage.title": {
    en: "Personal message",
    fi: "",
    sv: ""
  },
  "deeplink.personalMessage.description": {
    en:
      "Originator’s personal message to the Beneficiary. " +
      "Personal message will not be visible on the bank account statement.",
    fi: "",
    sv: ""
  },
  "deeplink.reference.title": {
    en: "Reference",
    fi: "",
    sv: ""
  },
  "deeplink.reference.description": {
    en:
      "Structured payment reference that will be visible" +
      "on the bank account statement.",
    fi: "",
    sv: ""
  },
  "deeplink.redirectUrl.title": {
    en: "Redirect url",
    fi: "",
    sv: ""
  },
  "deeplink.redirectUrl.description": {
    en:
      "Url to which the use shall be redirected once the" +
      "operation succeeds. If no url is supplied there will be no redirection.",
    fi: "",
    sv: ""
  },
  "deeplink.siirtoIdentifier.title": {
    en: "Siirto identifier",
    fi: "",
    sv: ""
  },
  "deeplink.siirtoIdentifier.description": {
    en: "Own Siirto-identifier or Beneficiary proxy.",
    fi: "",
    sv: ""
  },
  "deeplink.amount.title": {
    en: "Amount",
    fi: "",
    sv: ""
  },
  "deeplink.amount.description": {
    en: "Without decimal separator. Max 7 numbers.",
    fi: "",
    sv: ""
  },
  "deeplink.message.title": {
    en: "Message",
    fi: "",
    sv: ""
  },
  "deeplink.message.description": {
    en: "Payment message that will be visible on the bank account statement",
    fi: "",
    sv: ""
  },
  "deeplink.form.hideExtras": {
    en: "Hide extra fields",
    fi: "",
    sv: ""
  },
  "deeplink.form.showExtras": {
    en: "Show extra fields",
    fi: "",
    sv: ""
  },
  "site.title": {
    en: "Siirto Deeplink Generator",
    fi: "",
    sv: ""
  },
  "deeplink.form.generate": {
    en: "Generate deeplink",
    fi: "",
    sv: ""
  },
  "deeplink.form.clear": {
    en: "Clear",
    fi: "",
    sv: ""
  },
  "deeplink.form.close": {
    en: "Close",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.title": {
    en: "Ultimate beneficiary",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.description": {
    en: "Extra data mandatory for PSP.",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.name.title": {
    en: "Name",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.name.description": {
    en: "Human readable name",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.businessId.title": {
    en: "Business Identifier",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.businessId.description": {
    en: "",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.classificationCode.title": {
    en: "Classification Code",
    fi: "",
    sv: ""
  },
  "deeplink.ultimateBeneficiary.classificationCode.description": {
    en: "Industrial classification code. 5 digits.",
    fi: "",
    sv: ""
  }
};

export default Translations;