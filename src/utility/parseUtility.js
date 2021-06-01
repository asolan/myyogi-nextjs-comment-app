import React from "react";
//import { LINE_TYPE_ENUM } from './dataTypes';
import { IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import AyogiWisdom from "../components/AyogiWisdom/AyogiWisdom";
import AyogiImage from "../components/AyogiImage/AyogiImage";
import AyogiPoem from "../components/AyogiPoem/AyogiPoem";
import AyogiFootnoteAlert from "../components/AyogiFootnoteAlert/AyogiFootnoteAlert";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";

const imageCredit = ["ImageCredit"];
const imageSubTitle = ["ImageSubTitle1", "ImageSubTitle1a", "ImageSubTitle2"];
const imageMainTitle = ["ImageMainTitle"];


const notChapterTitleHeader = (c) => {
  //Convery to array
  return (
    c !== undefined &&
    c.class !== "chaptertitleheader" &&
    c.class !== "chaptertitle"
  );
};

//Build the section from items
  const buildSection = (newItems, contentId, props, quoteOnly, highlightTerm, goToChapter) => {
    let lineType = newItems[0].type;
    let result;
    switch (lineType) {
      case LINE_TYPE_ENUM.FOOTNOTE:
        result = (
          <AyogiFootnoteAlert
            key={"AyogiFootnoteAlert" + contentId}
            items={newItems}
            {...props}
          />
        );
        break;
      case LINE_TYPE_ENUM.POEM:
        result = (<AyogiPoem 
                    key={"AyogiPoem" + contentId} 
                    items={newItems} 
                    {...props} />);
        break;
      case LINE_TYPE_ENUM.IMAGE:
        result = (<AyogiImage 
                    key={"AyogiImage" + contentId} 
                    items={newItems} 
                    {...props} 
                  />);
        break;
      case LINE_TYPE_ENUM.WISDOM:
      default:
        //        console.log(newItems);
        result = (
          <AyogiWisdom 
            key={"AyogiWisdom" + contentId} 
            items={newItems} 
            {...props} 
            quoteOnly={quoteOnly}
            highlightTerm={highlightTerm}
            goToChapter={goToChapter}
          />
        );
        break;
    }

    // console.log(chlist);
    return result;
  };

const parseFootnote = (c, wrap, type) => {
  //    console.log(`${c._id}-${type}`);
  // console.log(wrap);
  // console.log(type);
  let fnote =
    c && c.footnote && c.footnote.length > 0
      ? c.footnote.reduce(
          (a, f, i) => [
            ...a,
            <span
              key={"footnote" + type + c._id + i}
              className={c.footnoteClass[i]}
            >
              {f}
            </span>,
          ],
          []
        )
      : null;

  if (fnote) {
    fnote = <span className="footnote">{fnote}</span>;
    fnote = wrap ? (
      <li key={"fnote" + type + c.chapterNumber + c.lineNumber}>{fnote}</li>
    ) : (
      fnote
    );
  }

  return fnote;
};

const parseImageTitles = (c) => {
  let imageTitles = [];
  let hasTitle = true;
  if (c.titles && c.titles && c.titles.length > 0) {
    // console.log(c);
    // console.log(c.titles);
    let title = [],
      subtitle = [],
      credit = "",
      contentClass = "",
      content = [];
    c.titles.forEach((t, i) => {
      if (c.class[i] !== "image") {
        if (t === "NoTitle") {
          hasTitle = false;
        }

        let ic = c.class[i];
        let ik = "imagetitle" + c._id + "-" + i;
        if (imageMainTitle.some((ti) => c.class[i] === ti)) {
          title.push(
            <div className={ic} key={ik}>
              {t}
            </div>
          );
        } else if (imageSubTitle.some((ti) => c.class[i] === ti)) {
          subtitle.push(
            <div className={ic} key={ik}>
              {t}
            </div>
          );
        } else if (imageCredit.some((ti) => c.class[i] === ti)) {
          credit = (
            <IonCardContent className={ic} key={ik}>
              {t}
            </IonCardContent>
          );
        } else {
          contentClass = contentClass.length === 0 ? ic : contentClass;
          //                    content.push(<span className={ic}>{t}</span>);
          content.push(<span key={ik}>{t}</span>);
        }
      }
    });

    title = <IonCardTitle key={`title-${c._id}`}>{title}</IonCardTitle>;
    subtitle = (
      <IonCardSubtitle key={`subtitle-${c._id}`}>{subtitle}</IonCardSubtitle>
    );
    // let contentFull = (<IonCardContent className={contentClass} key={'imagetitle'+c._id+'-content'}>
    //         {content}
    //     </IonCardContent>);
    let contentFull = (
      <IonCardContent
        className="ImageCaption"
        key={"imagetitle" + c._id + "-content"}
      >
        {content}
      </IonCardContent>
    );

    if (hasTitle) {
      imageTitles = [title, subtitle, credit, contentFull];
    } else {
      imageTitles = [[], [], "", null];
    }

    // imageTitles = c.titles.reduce((a, t, i) => {
    //     if(c.class[i] !== 'image'){
    //         let ic = c.class[i];
    //         let ik = 'imagetitle'+c._id+'-'+i;
    //         let title = <span  className={ic} key={ik}>{t}</span>
    //         if(imageMainTitle.some((ti) => c.class[i] === ti)){
    //             title = <IonCardTitle className={ic} key={ik}>{t}</IonCardTitle>;
    //         }
    //         if(imageSubTitle.some((ti) => c.class[i] === ti)){
    //             title = <IonCardSubtitle  className={ic} key={ik}>{t}</IonCardSubtitle>;
    //         }
    //         return [...a, title];
    //     }
    //     return a;
    // }, [])
  }

  return imageTitles;
};

const parseParagraphData = (c, i) => {
  //    console.log({c, i});
  //AMSTODO:use LINE_TYPE_ENUM
  let thisId = c.type + c.chapterNumber + c.lineNumber;
  let paragraph =
    c.paragraph === true ? (
      <p key={"p" + thisId} className="smallSpace">
        &nbsp;
      </p>
    ) : null;

  let indentClasses = [];
  if (c && c.class) {
    // console.log(c.class);
    // console.log(typeof c.class);
    if (typeof c.class === "string" && c.class.indexOf(" ") > -1) {
      indentClasses.concat(c.class.split(" "));
    } else {
      indentClasses.push(c.class);
    }
  }
  //was else if (c.paragraph) {
  if (c.paragraph) {
    indentClasses.push("paragraphIndent");
  }

  //                    indentClasses.push("normalParagraph");

  if (c.lineNumber === 1) {
    indentClasses.push("firstChar");
  }

  if (c.lineNumber > 1 && c.length > 0 && c.trim().indexOf(" ") > -1) {
    indentClasses.push("spaceAfter");
  }

  if (c.break) {
    indentClasses.push("break");
  }

  return [paragraph, thisId, indentClasses];
};

export { notChapterTitleHeader, buildSection, parseParagraphData, parseImageTitles, parseFootnote };
