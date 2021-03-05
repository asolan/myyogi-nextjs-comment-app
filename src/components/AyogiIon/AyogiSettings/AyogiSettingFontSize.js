import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonList,
  IonItem,
  IonRange,
  IonIcon,
  IonItemDivider,
} from "@ionic/react";
import { textOutline, sunny } from "ionicons/icons";

import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiSettingFontSize.css";
import constants from "../../../store/constants";

const AyogiSettingFontSize = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [fontJustified, setFontJustified] = useState(true);

  // Page load
  useEffect(() => {
    setFontSize(props.currentFontSize);
    setFontJustified(props.currentFontJustification);
    // TODO: Load local state from props
  }, []);

  const setFontSizeCss = (size) => {
    // Move to Redux?
    document.documentElement.style.setProperty("--yogi-font-size", size + "em");
    setFontSize(size);
    props.onChangeFontSize(size);
  };

  const setFontJustifiedCss = (value) => {
    // Move to Redux?
    document.documentElement.style.setProperty(
      "--yogi-text-align",
      value ? "justify" : "left"
    );
    setFontJustified(value);
    props.onChangeFontJustification(value);
  };


  return (
    <React.Fragment>
      <IonList>
        {/* <IonItemDivider>
          <h2 className="ion-margin-start">Font Size</h2>
        </IonItemDivider> */}
        <IonItem>
          <IonRange
            value={fontSize}
            min={0.8}
            max={1.3}
            step={0.125}
            snaps={true}
            color="secondary"
            onIonChange={(e) => setFontSizeCss(e.detail.value)}
          >
            <IonIcon
              size="small"
              slot="start"
              icon={textOutline}
              className="ion-margin"
            />
            <IonIcon slot="end" icon={textOutline} className="ion-margin" />
          </IonRange>
        </IonItem>
      </IonList>
      <AyogiWisdom items={props.items} />
    </React.Fragment>
  );
};

export default AyogiSettingFontSize;
