import React from 'react';
//import { Link } from 'react-router-dom';
import AyogiFooters from '../AyogiFooters/AyogiFooters';
import Button from '../Button/Button';
//import classes from './AyogiChapter.css';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon
} from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import './AyogiChapter.css';
import constants from '../../store/constants';
//import parseBookData from '../../utility/parseBookData';
//import {useTraceUpdate} from '../../utility/helpUtility';


const AyogiChapter = (props) => {
    //AMSTODO-BUG - Rendered twice
    // console.log('AyogiChapter');
    // console.log(props);
    //end buildSection function
//    console.log('selectedQuotes', props.selectedQuotes);

    const chapButton = (chNum, next) => {
        const title = next ? 'Next' : 'Previous';
        const arrow = next ?
            <IonIcon icon={chevronForwardOutline} /> :
            <IonIcon icon={chevronBackOutline} />;

        return (
            <Button
                title={title}
                alt={title}
                key={'chapnext' + chNum}
                onClick={() => {
                    props.onChangeChapter(chNum);
                    props.history.push(`/ayogi/${chNum}/1`);
                }}>
                {arrow}
            </Button>
        );
    }

    const prevChapt = props.currentChapterNumber > constants.MIN_CHAPTER ? chapButton(props.currentChapterNumber - 1, false) : null;
    const nextChapt = props.currentChapterNumber < constants.MAX_CHAPTER ? chapButton(props.currentChapterNumber + 1, true) : null;

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
            <IonGrid className="prevnext">
                <IonRow className="ion-text-center">
                    <IonCol>{prevChapt}</IonCol>
                    <IonCol>{nextChapt}</IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
};

export default AyogiChapter;
