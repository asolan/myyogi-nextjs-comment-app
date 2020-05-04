import React, { useState, useEffect } from "react";
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
  // IonButtons,
  // IonButton,
  // IonIcon,
  // IonHeader,
  // IonTitle,
  // IonToolbar
  IonContent,
  IonPage,
  IonApp,
} from "@ionic/react";

//import { book, build, colorFill, grid } from 'ionicons/icons';
import AyogiHeader from "../components/AyogiIon/AyogiHeader/AyogiHeader";
import AyogiChapterList from "../components/AyogiIon/AyogiChapterList/AyogiChapterList";
//import { fetchAYChapterList } from '../utility/fetchData';
//import { LINE_TYPE_ENUM } from '../utility/dataTypes';
import "./AyogiPage.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";

let aychaptlist = require("../aychaptlist.json");

const AyogiChapterPage = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chaptersList, setChaptersList] = useState<any>([]);

  console.log("AyogiChapterPage");
  console.log(props);

  // useEffect(() => {
  //   console.log(`AyogiChapterPage-chapter changed - ${props.type}`)
  //   setToContentType(props.type);
  // }, [props.chapter]);

  // Page load
  useEffect(() => {
    //    fetchAYChapterList().then(d => setChaptersList(d));
    setChaptersList(aychaptlist);
    setIsLoading(false);
  }, []);

  // const setCurrentChapter = (chapterNumber: number) => {
  //   console.log(chapterNumber);
  // };

  let content = <Loading loading={isLoading} />;

  if (!isLoading && chaptersList && chaptersList.length > 0) {
    //    typeItems={contentTypeText[contentType]}

    // setCurrentChapter={setCurrentChapter}
    content = <AyogiChapterList {...props} chaptersList={chaptersList} />;
  }

  if (!isLoading && chaptersList.length === 0) {
    content = <IonContent><p>Found no content. Try again later.</p></IonContent>;
  }

  //  return (<main>{buttons}{content}</main>);
  return (
    <IonApp>
      <IonPage>
        <AyogiHeader
          headerType="chapterlist"
          headerNumber={0}
          headerTitle=""
        ></AyogiHeader>
        {content}
      </IonPage>
    </IonApp>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeChapter: (chapter: number) =>
      dispatch(actions.onChangeChapter(chapter)),
    // onChangeChapter2: (chapter: number) =>
    //   dispatch(actions.onChangeChapter2(chapter)),
    // onChangeChapterLine: (chapterLine: number) =>
    //   dispatch(actions.onChangeChapterLine(chapterLine)),
    // onChangeImage: (image: string) => dispatch(actions.onChangeImage(image)),
    // onChangePoem: (poem: string) => dispatch(actions.onChangePoem(poem)),
    // onChangeFont: (font: string) => dispatch(actions.onChangeFont(font)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentChapter: selectors.makeSelectChapter(),
    // currentChapterLine: selectors.makeSelectChapterLine(),
    // currentImage: selectors.makeSelectImage(),
    // currentPoem: selectors.makeSelectPoem(),
    // currentFont: selectors.makeSelectFont(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiChapterPage);
