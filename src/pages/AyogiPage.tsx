import React, { useState, useEffect, useRef } from 'react';
import Loading from '../components/AyogiIon/Loading/Loading';
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
  IonContent
} from '@ionic/react';
import AyogiWisdom from '../components/AyogiIon/AyogiWisdom/AyogiWisdom';
import AyogiImage from '../components/AyogiIon/AyogiImage/AyogiImage';
import AyogiPoem from '../components/AyogiIon/AyogiPoem/AyogiPoem';
import AyogiFootnoteAlert from '../components/AyogiIon/AyogiFootnoteAlert/AyogiFootnoteAlert';

//import { listBox, planet, colorFill, more } from 'ionicons/icons';

import AyogiHeader from '../components/AyogiIon/AyogiHeader/AyogiHeader';
import AyogiChapter from '../components/AyogiIon/AyogiChapter/AyogiChapter';
import { LINE_TYPE_ENUM } from '../utility/dataTypes';
//import AyogiContext from '../context/AyogiContext';
import './AyogiPage.css';

//let aydata = require('../aydata.json');
//let aychaptlist = require('../aychaptlist.json');

const AyogiPage = (props: any) => {
  // console.log('aypage');
  // console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [chaptersList, setChaptersList] = useState<any>([]);
  // const [props.aychaptlist, setprops.aychaptlist] = useState<any>([]);
  // const [chaptersText, setChaptersText] = useState<any>([]);
  const [chNum, setChNum] = useState<number>(1);
  const [currentChapterTitle, setCurrentChapterTitle] = useState<string>('');
  const [chapterContent, setChapterContent] = useState<any>([]);
  //  const [ayogiState, setAyogiState] = useState<any>({});

  let contentId: number = 0;
  const contentRef = useRef(null);

  const scrollToTop = () => {
    let cref = contentRef!.current as any;
    cref.scrollToTop();
  }

  // Page load
  useEffect(() => {
    // console.log(`page-effect-[]${props.match.params.id}`);
    // console.log(aychaptlist);
    // console.log('ayogipage-load');
    // console.log(aydata);
//    parseChapterData();
  }, []);

  useEffect(() => {
    // console.log(`page-effect-id`);
    // console.log(props.chPos);
    setCurrentChapter(props.match.params.id - 1);
  },[props.chPos])

  // useEffect(() => {
  //   parseAyogiToChapters();
  // },[props.aychaptlist])

  useEffect(() => {
    console.log(`page-effect-id${props.match.params.id}`);
    setIsLoading(false);
    setCurrentChapter(props.match.params.id - 1);
  }, [props.match.params.id]);

  
  const setCurrentChapter = (cnum: number) => {
    // console.log('setcurrchapt');
    // console.log(cnum);
    // console.log(props.chPos);
    // console.log(props.aychaptlist.length);
    if (props.aydata && 
      props.chPos.length > 0 && 
        props.aychaptlist && 
        props.aychaptlist.length > 0) {
      setChNum(props.aychaptlist[cnum].chapterNumber);
      setCurrentChapterTitle(props.aychaptlist[cnum].text);
      buildChapterText(cnum);
//      console.log('setcurrchapt2');
      scrollToTop();
    }
  }

  const notChapterTitleHeader = (c: any) => {
    //Convery to array
    return c !== undefined
      && c.class !== 'chaptertitleheader'
      && c.class !== 'chaptertitle';
  }

  const buildChapterText = (cnum: number) => {
    contentId = 0;

    if (!props.aydata || !props.chPos) {
      console.log('buildchaptext-notext');
      return;
    }

    let nextText = props.aydata.slice((props.chPos[cnum] + 1), props.chPos[cnum+1])
      .filter(notChapterTitleHeader);

      // console.log('buildChapterText');
      // console.log(chPos.length);
      // console.log(chPos[cnum] + 1 + '-' + chPos[cnum+1]);
      // console.log(nextText);

    // Build array with positions of each type of content
    let nextContent = nextText.reduce(
      (acc: any, curr: any, pos: any, src: any) => {
        if (pos > 1 && curr.type !== src[pos - 1].type) {
          acc.push({ 'pos': pos, 'type': curr.type });
        }
        return acc;
      }, [{ 'pos': 0, 'type': LINE_TYPE_ENUM.WISDOM }]);

    const last = nextText.length;
    nextContent.push({ 'pos': last, 'type': LINE_TYPE_ENUM.UNUSED });
//console.log(chapterContent);
    let nextContentList: any[] = [];

    nextContent && nextContent.slice(1).forEach((c: any, i: any) => {
      let newItems = nextText.slice(nextContent[i].pos, c.pos);
      nextContentList.push(buildSection(newItems));
    });
    
    // console.log('nextContentList');
    // console.log(nextContentList);
    setChapterContent(nextContentList);
  };

  //Build the section from items
  const buildSection = (newItems: any[]):any => {
    let lineType = newItems[0].type;
    let result;
    contentId++;
    switch (lineType) {
      case (LINE_TYPE_ENUM.FOOTNOTE):
        result = (<AyogiFootnoteAlert
          key={'AyogiFootnoteAlert' + contentId}
          items={newItems} />);
        break;
      case (LINE_TYPE_ENUM.POEM):

        result = (<AyogiPoem
          key={'AyogiPoem' + contentId}
          items={newItems} />);
        break;
      case (LINE_TYPE_ENUM.IMAGE):
        result = (<AyogiImage
          key={'AyogiImage' + contentId}
          items={newItems} />);
        break;
      case (LINE_TYPE_ENUM.WISDOM):
      default:
//        console.log(newItems);
        result = (<AyogiWisdom
          key={'AyogiWisdom' + contentId}
          items={newItems}
        />);
        break;
    }
    // console.log(chlist);
    return result;
  };

  let content = <Loading loading={isLoading} />;

  if (!isLoading &&
    (props.aychaptlist && props.aychaptlist.length > 0 && 
      chapterContent && chapterContent.length > 0)) {
      // console.log('chapterContent');
      // console.log(chapterContent);
    content = (
      // <AyogiContext.Provider
      //   value={{
      //     footNum: ayogiState.footNum,
      //     incrementFootNum: incrementFootNum

      //   }}>
      <AyogiChapter
        currentChapterNumber={chNum}
        currentChapterTitle={currentChapterTitle}
        currentChapterText={chapterContent}
        setChapter={setCurrentChapter}>
      </AyogiChapter>
      // </AyogiContext.Provider>
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
        headerTitle={currentChapterTitle}>
      </AyogiHeader>
      <IonContent
        ref={contentRef}
        scrollEvents={true}
        onIonScrollStart={() => { }}
        onIonScroll={() => { }}
        onIonScrollEnd={() => { }}>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default AyogiPage;
