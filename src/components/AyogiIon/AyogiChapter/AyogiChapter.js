import React from 'react';
//import { Link } from 'react-router-dom';
import AyogiFooters from '../AyogiFooters/AyogiFooters';
import Button from '../Button/Button';
//import classes from './AyogiChapter.css';
import './AyogiChapter.css';
//import parseBookData from '../../../utility/parseBookData';
//import {useTraceUpdate} from '../../../utility/helpUtility';

const AyogiChapter = (props) => {
    //AMSTODO-BUG - Rendered twice
    // console.log('AyogiChapter');
    // console.log(props);
    //end buildSection function

    return (
        <div className="AyogiChapter">
            <div>{props.currentChapterText.map((c) => {
//                console.log(c);
                return c;
            })
            }
            </div>
            <AyogiFooters currentChapterText={props.currentChapterText}>
            </AyogiFooters>
            <Button
                key={'chapnext' + props.currentChapterNumber}
                onClick={() => { props.setChapter(props.currentChapterNumber) }}>
                Next Chapter
            </Button>
        </div>
    )
};

export default AyogiChapter;
