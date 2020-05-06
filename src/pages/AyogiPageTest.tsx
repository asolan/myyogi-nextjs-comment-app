import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/AyogiIon/Loading/Loading";
import {
  // IonCard,
  // IonCardContent,
  // IonCardHeader,
  // IonCardSubtitle,
  // IonCardTitle,
  // IonIcon,
  // IonItem,
  // IonLabel,
  // IonList,
  // IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonContent,
} from "@ionic/react";
import AyogiWisdom from "../components/AyogiIon/AyogiWisdom/AyogiWisdom";
import AyogiImage from "../components/AyogiIon/AyogiImage/AyogiImage";
import AyogiPoem from "../components/AyogiIon/AyogiPoem/AyogiPoem";
import AyogiFootnoteAlert from "../components/AyogiIon/AyogiFootnoteAlert/AyogiFootnoteAlert";

//import { listBox, planet, colorFill, more } from 'ionicons/icons';

import AyogiHeader from "../components/AyogiIon/AyogiHeader/AyogiHeader";
import AyogiChapter from "../components/AyogiIon/AyogiChapter/AyogiChapter";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiPageTest.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";

//let aydata = require('../aydata.json');
//let aychaptlist = require('../aychaptlist.json');

const AyogiPageTest = (props: any) => {
  console.log("AyogiPageTest");
  //  console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let content: any = [];
  // Page load
  useEffect(() => {}, []);

  props.chPos.map((val, index, arr) => {
    // console.log(a);
    // console.log(b);
    // console.log(val);
    // console.log(index);
    // console.log(arr);
    //      console.log(val[i+1]);
    let thisChap = props.aydata.slice(val, arr[index + 1]);
    content.push(thisChap);
    //      return "A";
  });
  content.pop();

  //  console.log(content);
  //  const aydatatest = props.chPos.

  //  return (<main>{buttons}{content}</main>);
  return (
    <IonPage>
      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={(e) => {}}
      >
        <IonGrid>
          {content.map((a, b) => {
            //          console.log(a[0]);
            //          console.log(b);
            return (
              <IonRow>
                {a.map((c, i) => {
                  if (c.text && (i < 2 || i > a.length - 3)) {
                    return <IonCol className="colpad">{c.text}</IonCol>;
                  }
                })}
              </IonRow>
            );
            {
              /* <IonCol>{a[1].text}</IonCol>
                    <IonCol>{a[2].text}</IonCol>
                    <IonCol>{a[3].text}</IonCol>
                    <IonCol>{a[4].text}</IonCol>
                    <IonCol>{a[5].text}</IonCol> */
            }
            {
              /* <IonCol>{a[a.len-3].text}</IonCol>
                    <IonCol>{a[a.len-2].text}</IonCol>
                    <IonCol>{a[a.len-1].text}</IonCol> */
            }
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeChapter: (chapter: number) =>
      dispatch(actions.onChangeChapter(chapter)),
    onChangeChapterLine: (chapterLine: number) =>
      dispatch(actions.onChangeChapterLine(chapterLine)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentChapter: selectors.makeSelectChapter(),
    currentChapterLine: selectors.makeSelectChapterLine(),
    currentImage: selectors.makeSelectImage(),
    currentPoem: selectors.makeSelectPoem(),
    currentFont: selectors.makeSelectFont(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiPageTest);
