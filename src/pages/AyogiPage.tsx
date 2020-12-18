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
import "./AyogiPage.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";


//let aydata = require('../aydata.json');
//let aychapttitle = require('../aychapttitle.json');

const AyogiPage = (props: any) => {
  // console.log("AyogiPage");
  // console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [chaptersList, setChaptersList] = useState<any>([]);
  // const [props.aychapttitle, setprops.aychapttitle] = useState<any>([]);
  // const [chaptersText, setChaptersText] = useState<any>([]);
  const [chNum, setChNum] = useState<number>(0);
  const [currentChapterTitle, setCurrentChapterTitle] = useState<string>("");
  const [chapterContent, setChapterContent] = useState<any>([]);
  //  const [ayogiState, setAyogiState] = useState<any>({});

  let contentId: number = 0;
  const contentRef = useRef(null);

  const scrollToTop = () => {
    let cref = contentRef!.current as any;
    cref.scrollToTop && cref.scrollToTop();
  };

  const scrollToLine = (line) => {
    let scrollToDelay = () => {      
      let cref = contentRef!.current as any;
      console.log('scrollToLine', line);
      // console.log(line);
      // console.log(contentRef!.current);
      console.log(cref.scrollToPoint);
//      cref.scrollToPoint && cref.scrollToPoint(0,((line-1)*75));
      cref.scrollToPoint && cref.scrollToPoint(0,((line-1)*1));
    }

    // TODO: better than this
    setTimeout(scrollToDelay, 500);
  };

  // Page load
  useEffect(() => {
    // console.log(`page-effect-[]${props.match.params.id}`);
    // console.log(aychapttitle);
    // console.log('ayogipage-load');
    // console.log(aydata);
    //    parseChapterData();
  }, []);

  useEffect(() => {
    console.log(`page-effect-id-props.chPos-${props.chPos}`);
    // console.log(props.chPos);
    setCurrentChapter(props.match.params.id - 1,
      props.match.params.line);
  }, [props.chPos]);

  // useEffect(() => {
  //   parseAyogiToChapters();
  // },[props.aychapttitle])

  useEffect(() => {
//    console.log(`page-effect-id-props.match.params.id-${props.match.params.id}`);
    setIsLoading(false);
    setCurrentChapter(
      props.match.params.id - 1,
      props.match.params.line);
  }, [props.match.params.id]);

  const contentScrollEnd = (e) => {
    // console.log('contentScrollEnd');
    //    console.log(e);
    //console.log(e.target.scrollTop);
    e.target.getScrollElement().then((el) => {
      //console.log(el);
      // console.log(el.scrollHeight);
      // console.log(el.clientHeight);
//      console.log(el.scrollTop);
      // console.log(el.clientTop);
      props.onChangeChapterLine(el.scrollTop);
    });
    //    console.log(e.srcElement);
  };

  const setCurrentChapter = (cnum: number, clinenumber: number) => {
    //AMSTODO.V1.Why Called Twice
    console.log(`setCurrentChapter-${cnum}-${clinenumber}`);
    // console.log(chNum);
    // console.log('setcurrchapt');
    // console.log(cnum);
    // console.log(props.chPos);
    // console.log(props.aychapttitle.length);
    if (
      props.aydata &&
      props.chPos.length > 0 &&
      props.aychapttitle &&
      props.aychapttitle.length > 0
    ) {

//       if (cnum < 0) {
// //        cnum = 0;
//         cnum = chNum <= 0 ? 0 : chNum - 1;
//       }
     cnum++;

      // console.log(chNum);
      // console.log(cnum);
      // console.log(props.aychapttitle[cnum]);
      // console.log(props.aychapttitle[cnum].chapterNumber);

      setChNum(props.aychapttitle[cnum].chapterNumber);
      setCurrentChapterTitle(props.aychapttitle[cnum].text);
      buildChapterText(cnum);
      //      console.log('setcurrchapt2');
      //      scrollToTop();
      scrollToLine(clinenumber);
    }
  };

  const notChapterTitleHeader = (c: any) => {
    //Convery to array
    return (
      c !== undefined &&
      c.class !== "chaptertitleheader" &&
      c.class !== "chaptertitle"
    );
  };

  const buildChapterText = (cnum: number) => {
    contentId = 0;

    if (!props.aydata || !props.chPos) {
      console.log("buildchaptext-notext");
      return;
    }

    let nextText = props.aydata
      .slice(props.chPos[cnum] + 1, props.chPos[cnum + 1])
      .filter(notChapterTitleHeader);

    // Build array with positions of each type of content
    let nextContent = nextText.reduce(
      (acc: any, curr: any, pos: any, src: any) => {
        if (pos > 1 && curr.type !== src[pos - 1].type) {
          acc.push({ pos: pos, type: curr.type });
        }
        return acc;
      },
      [{ pos: 0, type: LINE_TYPE_ENUM.WISDOM }]
    );

    const last = nextText.length;
    nextContent.push({ pos: last, type: LINE_TYPE_ENUM.UNUSED });
    //console.log(chapterContent);
    let nextContentList: any[] = [];

    nextContent &&
      nextContent.slice(1).forEach((c: any, i: any) => {
        let newItems = nextText.slice(nextContent[i].pos, c.pos);
        nextContentList.push(buildSection(newItems));
      });

    // console.log('nextContentList');
    // console.log(nextContentList);
    setChapterContent(nextContentList);
  };

  //Build the section from items
  const buildSection = (newItems: any[]): any => {
    let lineType = newItems[0].type;
    let result;
    contentId++;
    switch (lineType) {
      case LINE_TYPE_ENUM.FOOTNOTE:
        result = (
          <AyogiFootnoteAlert
            key={"AyogiFootnoteAlert" + contentId}
            items={newItems}
          />
        );
        break;
      case LINE_TYPE_ENUM.POEM:
        result = <AyogiPoem key={"AyogiPoem" + contentId} items={newItems} />;
        break;
      case LINE_TYPE_ENUM.IMAGE:
        result = <AyogiImage key={"AyogiImage" + contentId} items={newItems} />;
        break;
      case LINE_TYPE_ENUM.WISDOM:
      default:
        //        console.log(newItems);
        result = (
          <AyogiWisdom key={"AyogiWisdom" + contentId} items={newItems} />
        );
        break;
    }
    // console.log(chlist);
    return result;
  };

  let content = <Loading loading={isLoading} />;

  if (
    !isLoading &&
    props.aychapttitle &&
    props.aychapttitle.length > 0 &&
    chapterContent &&
    chapterContent.length > 0
  ) {
    // console.log('chapterContent');
    // console.log(chapterContent);
    content = (
      <AyogiChapter
        {...props}
        currentChapterNumber={chNum}
        currentChapterTitle={currentChapterTitle}
        currentChapterText={chapterContent}
      ></AyogiChapter>
    );
  } else {
    content = <p>Found no chapters. Try again later.</p>;
  }

  //  return (<main>{buttons}{content}</main>);
  return (
    <IonPage>
      <AyogiHeader
        headerType="chapter"
        headerNumber={chNum}
        headerTitle={currentChapterTitle}
      ></AyogiHeader>
      <IonContent
        ref={contentRef}
        scrollEvents={true}
        onIonScrollStart={() => { }}
        onIonScroll={() => { }}
        onIonScrollEnd={(e) => { contentScrollEnd(e) }}
      >
        {content}
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
    currentFontSize: selectors.makeSelectFontSize(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiPage);
