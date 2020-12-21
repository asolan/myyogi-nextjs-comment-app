//import React, { useState } from 'react';
import React from 'react';
import './AyogiLine.css';
import AyogiMetaItem from '../AyogiMeta/AyogiMetaItem/AyogiMetaItem';
import { parseParagraphData } from '../../../utility/parseUtility';
//import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';

const AyogiLine = (props) => {    // <div className={classes.AyogiChapter}>

    let [paragraph, footnote, indentClasses] = parseParagraphData(props.c, props.i);
    indentClasses.push(props.type.toLowerCase());
    //    console.log([paragraph, footnote, indentClasses]);

    let returnVal = (<div/>);

    returnVal = (
            <React.Fragment>
                {paragraph}
                <span
                    id={props.c._id}
                    // style={props.style}
                    className={indentClasses.join(' ')}>
                    {props.c.text}
                    <AyogiMetaItem c={props.c} />
                </span>
                {footnote}
            </React.Fragment>
        )
    return returnVal;
};

export default AyogiLine;
