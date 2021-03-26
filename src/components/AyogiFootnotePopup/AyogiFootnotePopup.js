import React, { useState } from 'react';
//import { AyogiConsumer } from '../../../context/AyogiContext';

import { parseFootnote } from '../../utility/parseUtility';
import {
    IonBadge,
    //IonButton,
    // IonCard,
    // IonCardContent,
    // IonCardHeader,
    // IonCardSubtitle,
    // IonCardTitle
} from '@ionic/react';
//import classes from './AyogiFootnotePopup.css';
import './AyogiFootnotePopup.css';

const AyogiFootnotePopup = props => {

    const [showhide, setShowhide] = useState(false);
    const [showhidehover, setShowhidehover] = useState(false);

    const showhideClick = () => {
        setShowhide(!showhide);
        console.log(`butt click-${showhide}`);
    }

    const showhideHover = (newVal) => {
        setShowhidehover(newVal);
    }

    const showhideButton =
        <IonBadge
            key={'fn' + props.c.footnoteCount}
            onClick={() => showhideClick()}
            onMouseEnter={() => showhideHover(true)}
            onMouseLeave={() => showhideHover(false)}
        >
            {showhidehover ? 'P' : props.c.footnoteCount}
        </IonBadge>;

    const footnote = parseFootnote(props.c, false, 'p');
    // console.log('f-popup');
    // console.log(props);
    // console.log(footnote);

    return (
        // <AyogiConsumer>
        //     { ctx => (
        <span className="AyogiFootnotePopup">
            {showhideButton}
            {showhide || showhidehover ? footnote : ''}
        </span>
        // )}
        // </AyogiConsumer>
    )
}

export default AyogiFootnotePopup;