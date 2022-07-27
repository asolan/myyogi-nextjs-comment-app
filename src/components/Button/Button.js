import React from 'react';
import { IonButton } from '@ionic/react';
//import { IonButton, IonIcon, IonContent } from '@ionic/react';
import './Button.css';

const Button = props => 
(<IonButton
    size="large"
    className={`button ion-margin ${props.buttonClass}`} 
    {...props}>
    {props.children}
</IonButton>)

export default Button;
