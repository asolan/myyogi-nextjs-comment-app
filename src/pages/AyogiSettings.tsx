import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/AyogiIon/Loading/Loading";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonRange,
  IonListHeader,
  IonLabel,
  IonIcon,
  IonItemDivider,
  IonRadio,
  IonRadioGroup,
  IonToggle,
} from "@ionic/react";
import { textOutline, sunny } from "ionicons/icons";

import AyogiHeader from "../components/AyogiIon/AyogiHeader/AyogiHeader";
import AyogiWisdom from "../components/AyogiIon/AyogiWisdom/AyogiWisdom";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiSettings.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";
import constants from "../store/constants";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//let aydata = require('../aydata.json');
//let aychaptlist = require('../aychaptlist.json');

const AyogiSettings = (props: any) => {
  // console.log("AyogiSettings");
  // console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(1);
  const [fontJustified, setFontJustified] = useState<boolean>(true);
  // const [testContent, setTestContent] = useState<string>(LINE_TYPE_ENUM.WISDOM);

  // Page load
  useEffect(() => {
    setFontSize(props.currentFontSize);
    setFontJustified(props.currentFontJustification);
    // TODO: Load local state from props
  }, []);

  const setFontSizeCss = (size: number) => {
    // Move to Redux?
    document.documentElement.style.setProperty("--yogi-font-size", size + "em");
    setFontSize(size);
    props.onChangeFontSize(size);
  };

  const setFontJustifiedCss = (value: boolean) => {
    // Move to Redux?
    document.documentElement.style.setProperty(
      "--yogi-text-align",
      value ? "justify" : "left"
    );
    setFontJustified(value);
    props.onChangeFontJustification(value);
  };

  // const buildTestContent = (newItems: any[]): any => {
  //   let lineType = newItems[0].type;
  //   let result;
  //   contentId++;
  //   switch (lineType) {
  //     case LINE_TYPE_ENUM.FOOTNOTE:
  //       result = (
  //         <AyogiFootnoteAlert
  //           key={"AyogiFootnoteAlert" + contentId}
  //           items={newItems}
  //         />
  //       );
  //       break;
  //     case LINE_TYPE_ENUM.POEM:
  //       result = <AyogiPoem key={"AyogiPoem" + contentId} items={newItems} />;
  //       break;
  //     case LINE_TYPE_ENUM.IMAGE:
  //       result = <AyogiImage key={"AyogiImage" + contentId} items={newItems} />;
  //       break;
  //     case LINE_TYPE_ENUM.WISDOM:
  //     default:
  //       //        console.log(newItems);
  //       result = (
  //         <AyogiWisdom key={"AyogiWisdom" + contentId} items={newItems} />
  //       );
  //       break;
  //   }
  //   // console.log(chlist);
  //   return result;
  // };

  //  let content = <Loading loading={isLoading} />;

  // if (
  //   !isLoading &&
  //   props.aychaptlist &&
  //   props.aychaptlist.length > 0 &&
  //   chapterContent &&
  //   chapterContent.length > 0
  // ) {
  //   // console.log('chapterContent');
  //   // console.log(chapterContent);
  //   content = (
  //     <AyogiChapter
  //       {...props}
  //       currentChapterNumber={chNum}
  //       currentChapterTitle={currentChapterTitle}
  //       currentChapterText={chapterContent}
  //     ></AyogiChapter>
  //   );
  // } else {
  //   content = <p>Found no chapters. Try again later.</p>;
  // }

  //  return (<main>{buttons}{content}</main>);

  console.log(props.currentQuoteSelection);
  return (
    <IonPage className="AyogiSettings AyogiChapter">
      <AyogiHeader headerType="settings"></AyogiHeader>
      <IonContent>
        <IonList>
          {/* <IonItemDivider><h2 className="ion-margin-start">Content Spacing</h2></IonItemDivider>
          <IonItem>
            <IonLabel className="ion-text-end">Content Align Left</IonLabel>
            <IonToggle className="ion-margin-start ion-margin-end"checked={fontJustified} onIonChange={e => setFontJustifiedCss(e.detail.checked)} />
            <IonLabel >Content Justified</IonLabel>
          </IonItem> */}
          <IonItemDivider>
            <h2 className="ion-margin-start">Quote Selection</h2>
          </IonItemDivider>
          <IonItem>
            <IonList>
              <IonRadioGroup
                value={props.currentQuoteSelection}
                onIonChange={(e) => {
                  if (e.detail.value === undefined) return;
                  console.log(e.detail.value);
                  props.onChangeMyQuoteSelection(e.detail.value);
                }}
              >
                <IonItem>
                  <IonLabel className="ion-margin-start">
                    No Quote Selection
                  </IonLabel>
                  <IonRadio
                    slot="start"
                    value={constants.MY_QUOTE_SELECTION.NONE}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel className="ion-margin-start">
                    Basic Selection
                  </IonLabel>
                  <IonRadio
                    slot="start"
                    value={constants.MY_QUOTE_SELECTION.BASIC}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel className="ion-margin-start">
                    Categorized Selection
                  </IonLabel>
                  <IonRadio
                    slot="start"
                    value={constants.MY_QUOTE_SELECTION.CATEGORIZED}
                  />
                </IonItem>
              </IonRadioGroup>
            </IonList>
          </IonItem>

          <IonItemDivider>
            <h2 className="ion-margin-start">Font Size</h2>
          </IonItemDivider>
          <IonItem>
            <IonRange
              value={fontSize}
              min={0.8}
              max={1.3}
              step={0.125}
              snaps={true}
              color="secondary"
              onIonChange={(e) => setFontSizeCss(e.detail.value as number)}
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
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeFontSize: (size: number) =>
      dispatch(actions.onChangeFontSize(size)),
    onChangeFontJustification: (justified: boolean) =>
      dispatch(actions.onChangeFontJustification(justified)),
    onChangeMyQuoteSelection: (myQuoteSelection: string) =>
      dispatch(actions.onChangeMyQuoteSelection(myQuoteSelection)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    currentFontJustification: selectors.makeSelectFontJustification(),
    currentQuoteSelection: selectors.makeSelectMyQuoteSelection(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiSettings);
