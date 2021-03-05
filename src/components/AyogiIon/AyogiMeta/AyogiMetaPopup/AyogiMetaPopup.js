import React, { useState } from 'react';
//import { AyogiConsumer } from '../../../context/AyogiContext';

import {
    IonBadge,
    //IonButton,
    // IonCard,
    // IonCardContent,
    // IonCardHeader,
    // IonCardSubtitle,
    // IonCardTitle
} from '@ionic/react';
//import classes from './AyogiMetaPopup.css';
import './AyogiMetaPopup.css';

const AyogiMetaPopup = props => {

    const [showhide, setShowhide] = useState(false);

    console.log(props);
    const metaClasses = `AyogiMetaPopup ${props.type}`
    const showhideClick = () => {
        setShowhide(!showhide);
        console.log(`butt click-${showhide}`);
    }

    const showhideButton =
        <IonBadge
            key={'meta' }
            onClick={() => showhideClick()}
            >
            {props.detail.substring(0,3)}
        </IonBadge>;

    // console.log('m-popup');
    // console.log(props);

    return (
        <span className={metaClasses}>
            {showhideButton}
            {showhide ? props.item + props.detail : ''}
        </span>
    )
}

export default AyogiMetaPopup;