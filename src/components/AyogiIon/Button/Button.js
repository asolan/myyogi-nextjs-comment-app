import React from 'react';
import { IonButton } from '@ionic/react';
//import { IonButton, IonIcon, IonContent } from '@ionic/react';
import './Button.css';

const Button = props => 
(<IonButton
    className="button" 
    {...props}>
        {props.children}
</IonButton>)

export default Button;
