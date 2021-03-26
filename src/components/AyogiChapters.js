import React from 'react';
import AyogiChapter from './AyogiChapter/AyogiChapter';
import AyogiChapterList from './AyogiChapterList/AyogiChapterList';

//import classes from './AyogiChapters.css';
import './AyogiChapters.css';
// let currentChapter = 1;
// //let currentChapterText = [];

// const setChapter =  (c) => {
//   console.log('setChapter');
//   console.log(c);
//     currentChapter=c.chapterNumber
// }

const AyogiChapters = props => {

//  console.table(props.chapters);
  console.table(props.currentChapterNumber);
  console.table(props.currentChapterTitle);
  console.table(props.currentChapterText);
  return (
  <section className="AyogiChapters">
    {/* <AyogiChapterList chaptersList={props.chaptersList}></AyogiChapterList> */}
    {/* <AyogiChapter 
      currentChapterNumber={props.currentChapterNumber} 
      currentChapterTitle={props.currentChapterTitle} 
      currentChapterText={props.currentChapterText ? props.currentChapterText.slice(2) : ''}
      setChapter={props.setCurrentChapter}>
    </AyogiChapter> */}
  </section>
  )};

// if(c.chapterNumber > 4 && c.text !== 'J') {
//   <p>
//     {c.chapterNumber}:{c.text}
//   </p>
// }

export default AyogiChapters;
