import React from 'react';
//import { Link } from 'react-router-dom';
import AyogiFooters from '../AyogiFooters/AyogiFooters';
import Button from '../Button/Button';
//import classes from './AyogiQuote.css';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon
} from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import './AyogiQuote.css';
//import parseBookData from '../../../utility/parseBookData';
//import {useTraceUpdate} from '../../../utility/helpUtility';

//COMPONENT NOT CURRENTLY USED
const AyogiQuote = (props) => {
    console.log(props);
    return (
        <div className="AyogiQuote">
            <div>{props.currentQuoteText.map && props.currentQuoteText.map((c) => {
                console.log('c', c);
                return c;
            })
            }
            </div>
        </div>
    )
};

export default AyogiQuote;
