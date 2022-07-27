import React, { useState, useEffect } from "react";
import "./AyogiSettingsMain.css";
import AyogiSettingFontSize from "./AyogiSettingFontSize";
import AyogiSettingQuoteSelection from "./AyogiSettingQuoteSelection";
import AyogiSettingQuoteTags from "./AyogiSettingQuoteTags";
import { IonIcon, IonItem, IonButton } from "@ionic/react";
import { umbrella, triangle } from "ionicons/icons";

const AyogiSettingsMain = (props) => {
  const [quoteSelectionShow, setQuoteSelectionShow] = useState(false);
  const [quoteTagsShow, setQuoteTagsShow] = useState(false);
  const [fontSizeShow, setFontSizeShow] = useState(true);

  const SETTING = {
    QUOTE_SELECTION: "QUOTE_SELECTION",
    QUOTE_TAGS: "QUOTE_TAGS",
    FONT_SIZE: "FONT_SIZE",
  };

  const showSetting = (settingToShow) => {
    setQuoteSelectionShow(false);
    setQuoteTagsShow(false);
    setFontSizeShow(false);

    switch (settingToShow) {
      case SETTING.QUOTE_SELECTION:
        setQuoteSelectionShow(true);
        break;
      case SETTING.QUOTE_TAGS:
        setQuoteTagsShow(true);
        break;
      case SETTING.FONT_SIZE:
        setFontSizeShow(true);
        break;
    }
  };

  let returnVal = (
    <React.Fragment>
      <IonButton
        expand="block"
        size="large"
        color={fontSizeShow ? "light" : "medium"}
        onClick={() => {
          showSetting(SETTING.FONT_SIZE);
        }}
      >
        <h3>Font Size</h3>
      </IonButton>
      {fontSizeShow && <AyogiSettingFontSize {...props} />}
      <IonButton
        expand="block"
        size="large"
        color={quoteSelectionShow ? "light" : "medium"}
        onClick={() => {
          showSetting(SETTING.QUOTE_SELECTION);
        }}
      >
        <h3>Quote Selection</h3>
        <IonIcon
          slot="end"
          icon={quoteSelectionShow ? "umbrella" : "triangle"}
        />
      </IonButton>
      {quoteSelectionShow && <AyogiSettingQuoteSelection {...props} />}
      <IonButton
        expand="block"
        size="large"
        color={quoteTagsShow ? "light" : "medium"}
        onClick={() => {
          showSetting(SETTING.QUOTE_TAGS);
        }}
      >
        <h3>Quote Tags</h3>
        <IonIcon slot="start" icon="umbrella" />
      </IonButton>
      {quoteTagsShow && <AyogiSettingQuoteTags {...props} />}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiSettingsMain;
