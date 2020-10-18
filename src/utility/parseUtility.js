import React from 'react';
//import { LINE_TYPE_ENUM } from './dataTypes';
import AyogiFootnoteAlert from '../components/AyogiIon/AyogiFootnoteAlert/AyogiFootnoteAlert';
import { 
    IonCardTitle, 
    IonCardSubtitle,
    IonCardContent
} from '@ionic/react';

const imageCredit = ["ImageCredit"];
const imageSubTitle = ["ImageSubTitle1","ImageSubTitle1a", "ImageSubTitle2"];
const imageMainTitle = ["ImageMainTitle"];

const parseFootnote = (c, wrap, type) => {
//    console.log(`${c._id}-${type}`);
    // console.log(wrap);
    // console.log(type);
    let fnote = c && c.footnote && c.footnote.length > 0 ? 
        c.footnote.reduce((a, f, i) => [...a, <span key={'footnote'+type+c._id+i} className={c.footnoteClass[i]}>{f}</span>], [])
        : null;
  
    if(fnote){
        fnote = <span className='footnote'>{fnote}</span>;
        fnote = wrap ? 
            <li key={'fnote' + type + c.chapterNumber + c.lineNumber}>{fnote}</li> 
            : fnote;
    } 

    return fnote;
}

const parseImageTitles = (c) => {
    let imageTitles = []; 
    if(c.titles && c.titles && c.titles.length > 0) {
        // console.log(c); 
        // console.log(c.titles); 
        let title = [], subtitle = [], credit = '', contentClass = '', content = [];
        c.titles.forEach((t, i) => {
            if(c.class[i] !== 'image'){
                let ic = c.class[i];
                let ik = 'imagetitle'+c._id+'-'+i;
               if(imageMainTitle.some((ti) => c.class[i] === ti)){
                    title.push(<div className={ic} key={ik}>{t}</div>);
                } 
                else if(imageSubTitle.some((ti) => c.class[i] === ti))
                {
                    subtitle.push(<div className={ic} key={ik}>{t}</div>); 
                }
                else if(imageCredit.some((ti) => c.class[i] === ti))
                {
                    credit = (<IonCardContent  className={ic} key={ik}>{t}</IonCardContent>); 
                }else {
                    contentClass = contentClass.length === 0 ? ic : contentClass;
//                    content.push(<span className={ic}>{t}</span>);
                    content.push(<span>{t}</span>);
                }
            }
        });

        title = <IonCardTitle>{title}</IonCardTitle>;
        subtitle = <IonCardSubtitle>{subtitle}</IonCardSubtitle>;
        // let contentFull = (<IonCardContent className={contentClass} key={'imagetitle'+c._id+'-content'}>
        //         {content}
        //     </IonCardContent>);
        let contentFull = (<IonCardContent className="ImageCaption" key={'imagetitle'+c._id+'-content'}>
                {content}
            </IonCardContent>);

        imageTitles = [title, subtitle, credit, contentFull];

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
}

const parseParagraphData = (c, i) => {
    //    console.log({c, i});
    //AMSTODO:use LINE_TYPE_ENUM
    let thisId = c.type + c.chapterNumber + c.lineNumber;
    let paragraph = c.paragraph === true ? <p key={'p' + thisId} className="smallSpace">&nbsp;</p> : null;
    let footnote = c.footnote && c.footnote.length > 0 ?
        <AyogiFootnoteAlert 
            key={'f' + thisId} 
            c={c} />
        : '';

    let indentClasses = [];
    if (c && c.class) {
//        console.log(c.class);
        if(typeof c.class === 'string') {
            indentClasses.push(c.class.split(' '));
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

    if (c.lineNumber > 1 && c.length > 0 && c.trim().indexOf(' ') > -1) {
        indentClasses.push("spaceAfter");
    }

    if (c.break) {
        indentClasses.push("break");
    }

    return [paragraph, footnote, indentClasses];

}

export { parseParagraphData, parseImageTitles, parseFootnote };
