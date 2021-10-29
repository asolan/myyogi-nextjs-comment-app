import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading/Loading";
import {
  IonPage,
  IonContent,
} from "@ionic/react";
import { notChapterTitleHeader, buildSection } from "../utility/parseUtility";
//import { listBox, planet, colorFill, more } from 'ionicons/icons';

import AyogiHeader from "../components/AyogiHeader/AyogiHeader";
import AyogiChapter from "../components/AyogiChapter/AyogiChapter";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiPage.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";


const AyogiPage = (props: any) => {
  //  console.log("AyogiPage");
  //  console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [chaptersList, setChaptersList] = useState<any>([]);
  // const [props.aychapttitle, setprops.aychapttitle] = useState<any>([]);
  // const [chaptersText, setChaptersText] = useState<any>([]);
  const [chNum, setChNum] = useState<number>(0);
  const [maxLine, setMaxLine] = useState<number>(500);
  const [currentChapterTitle, setCurrentChapterTitle] = useState<string>("");
  const [chapterContent, setChapterContent] = useState<any>([]);
  //  const [ayogiState, setAyogiState] = useState<any>({});

  let contentId: number = 0;
  const quoteOnly = false;
  const contentRef = useRef(null);

  const scrollToTop = () => {
    let cref = contentRef!.current as any;
    cref.scrollToPoint && cref.scrollToPoint(0, 100, 0);
  };

  const scrollToId = (chapter, line) => {
    console.log('scrollToId', chapter, line);
    let scrollToIdDelay = () => {      
      let cref = contentRef!.current as any;
      let lineId = `${chapter}-${line}`;
      var scrollEl = document.getElementById(lineId);
      // console.log(lineId);
      // console.log(scrollEl);
      if(scrollEl){
        let offsetTop = scrollEl && scrollEl.offsetTop || 0;
        let scrollTime = offsetTop > 500 ? 1000 : 0;
        cref.scrollToPoint && cref.scrollToPoint(0, offsetTop, scrollTime);  
      } else {
        let scrollTime = line > 100 ? 1000 : 0;
        cref.scrollToPoint && cref.scrollToPoint(0, line, scrollTime);  
      }
    }
    setTimeout(scrollToIdDelay, 1);
  };

  const scrollToLine = (line) => {
    let scrollToDelay = () => {      
      let cref = contentRef!.current as any;
      console.log('scrollToLine', line);
      // console.log(line);
      // console.log(contentRef!.current);
//      console.log(cref.scrollToPoint);
      cref.scrollToPoint && cref.scrollToPoint(0,((line-1)*1));
    }

    // TODO: better than this
    setTimeout(scrollToDelay, 500);
  };

  // Page load
  useEffect(() => {
//    console.log(`page-effect-[]-${props.match.params.id}`);
    // console.log(aychapttitle);
    // console.log('ayogipage-load');
    // console.log(aydata);
    //    parseChapterData();
  }, []);

  useEffect(() => {
//    console.log(`AyogiPage[props.chPos]-${props.chPos}`);
    // console.log(props.chPos);
    setCurrentChapter();
  }, [props.chPos]);

  useEffect(() => {
//    console.log(`AyogiPage[page-effect-id-props.match.params.id]-${props.match.params.id}`);
    setIsLoading(false);
    setCurrentChapter();
    }, [props.match.params.id]);
//  }, [props.match.params.id, props.currentQuoteSelectionType, props.currentQuoteTags]);

useEffect(() => {
//        console.log(`AyogiPage[props.selectedQuotes]`, props.selectedQuotes, chNum);
      if(chNum > 0){
        buildChapterText(chNum);
      }
}, [props.selectedQuotes,props.currentFootnotePopup,props.currentDefinitionPopup]);
  

const contentScrollEnd = (e) => {

    e.target.getScrollElement().then((el) => {
      // Change from pos to current line
      const sToTop = el.scrollTop;
//      console.log(sToTop, maxLine);
      if(sToTop > maxLine){
        props.onChangeChapterLine(el.scrollTop);
      }
    });
  };

  const setCurrentChapter = () => {
    let cnum = props.match.params.id ? props.match.params.id - 1 : props.currentChapter - 1;
    let clinenumber = props.match.params.line ? props.match.params.line : props.currentChapterLine;

//    console.log(cnum, clinenumber);
    if (
      props.aydata &&
      props.chPos.length > 0 &&
      props.aychapttitle &&
      props.aychapttitle.length > 0
    ) {
      cnum++;
      setChNum(props.aychapttitle[cnum].chapterNumber);
      setCurrentChapterTitle(props.aychapttitle[cnum].text);
      buildChapterText(cnum);

      if (clinenumber <= 1) {
        clinenumber = 4;
      }
      scrollToId(props.aychapttitle[cnum].chapterNumber, clinenumber);
      //scrollToLine(clinenumber);
    }
  };

  const buildChapterText = (cnum: number) => {
    contentId = 0;
    let newMaxLine = 0;

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
//        console.log(newItems);
        newMaxLine = newItems[newItems.length-1].lineNumber;
        nextContentList.push(buildSection(newItems, ++contentId, props, quoteOnly, null, false));
      });

    // console.log('nextContentList');
    // console.log(nextContentList);
    setMaxLine(newMaxLine);
    setChapterContent(nextContentList);
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
    addSelectedQuote: (quoteId: string, chapter:number,  paragraph:number, startline:number, startchar:number, endline:number, endchar:number, linePos:any[], selectedCategoryTags:any, tags:string[]) =>
      dispatch(actions.addSelectedQuote(quoteId, chapter, paragraph, startline, startchar, endline, endchar, linePos, selectedCategoryTags, tags)),
    removeSelectedQuote: (quoteId: string) =>
      dispatch(actions.removeSelectedQuote(quoteId)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentChapter: selectors.makeSelectChapter(),
    currentChapterLine: selectors.makeSelectChapterLine(),
    currentImage: selectors.makeSelectImage(),
    currentPoem: selectors.makeSelectPoem(),
    currentFontSize: selectors.makeSelectFontSize(),
    currentFontJustification: selectors.makeSelectFontJustification(),     
    currentFootnotePopup: selectors.makeSelectFootnotePopup(),
    currentDefinitionPopup: selectors.makeSelectDefinitionPopup(),
    selectedQuotes: selectors.makeSelectSelectedQuotes(),
    currentQuoteSelectionType: selectors.makeSelectMyQuoteSelectionType(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiPage);
