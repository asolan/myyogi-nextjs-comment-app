import React from 'react';
//import { Link } from 'react-router-dom';
import AyogiFooters from '../AyogiFooters/AyogiFooters';
import Button from '../Button/Button';
//import classes from './AyogiChapter.css';
import {
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/react";
import './AyogiChapter.css';
//import parseBookData from '../../../utility/parseBookData';
//import {useTraceUpdate} from '../../../utility/helpUtility';


const AyogiChapter = (props) => {
    //AMSTODO-BUG - Rendered twice
    // console.log('AyogiChapter');
    // console.log(props);
    //end buildSection function

    const chapButton = (chNum, next) => {
        return (
            <Button
                key={'chapnext' + chNum}
                onClick={() => {
                    props.onChangeChapter(chNum);
                    props.history.push(`/ayogi/${chNum}/1`);
                }}>
                {next ? 'Next Chapter' : 'Previous Chapter'}
            </Button>
        );
    }

    const prevChapt = props.currentChapterNumber > 1 ? chapButton(props.currentChapterNumber - 1, false) : null;
    const nextChapt = props.currentChapterNumber < 48 ? chapButton(props.currentChapterNumber + 1, true) : null;

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
            <IonGrid>
                <IonRow className="ion-text-center">
                    <IonCol>{prevChapt}</IonCol>
                    <IonCol>{nextChapt}</IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
};

export default AyogiChapter;
