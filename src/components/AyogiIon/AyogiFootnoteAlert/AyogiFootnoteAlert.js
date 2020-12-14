import React, { useState } from 'react';
import { parseFootnote } from '../../../utility/parseUtility';
import {
    IonBadge,
    IonPopover,
    // IonCard,
    // IonCardContent,
    // IonCardHeader,
    // IonCardSubtitle,
    // IonCardTitle
} from '@ionic/react';
//import classes from './AyogiFootnoteAlert.css';
import './AyogiFootnoteAlert.css';

const AyogiFootnoteAlert = props => {
    // console.log(props);
    const [showhide, setShowhide] = useState(false);

    const showhideClick = () => {
        setShowhide(!showhide);
//        console.log(`butt click-${showhide}`);
    }

    const showhideButton =
        <IonBadge
            key={'fn' + props.c.footnoteCount}
            onClick={() => showhideClick()}
        >
            {props.c.footnoteCount}
        </IonBadge>;

    const footnote = parseFootnote(props.c, false, 'p');
    // console.log('f-popup');
    // console.log(props);
    // console.log(footnote);

    let footnoteContent =                 
        showhide ?
            <IonPopover
                padding="true"
                isOpen={showhide}
                onDidDismiss={() => setShowhide(false)}>
                {footnote}
            </IonPopover>
            : null;

    return (
        <span className="AyogiFootnoteAlert">
            {showhideButton}
            {footnoteContent}
        </span>
    )
}

export default AyogiFootnoteAlert;