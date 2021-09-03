import React, { useState, useEffect } from 'react';
import { parseFootnote } from '../../utility/parseUtility';
import {
    IonBadge,
    IonPopover,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from '@ionic/react';
//import classes from './AyogiDefinitionInline.css';
import './AyogiDefinitionInline.css';

const AyogiDefinitionInline = props => {

  const [showMeaning, setShowMeaning] = useState(false);
//  const notValidChar = new RegExp("'", "");

//  const newWord = props.word.replace(notValidChar, '');
  let wordDefinition = null;
  if(props.dictionary && props.dictionary.length > 0){
      const defIndex = props.dictionary.findIndex(f => f.term === props.word);
      if(defIndex > -1){
        wordDefinition = props.dictionary[defIndex].definition;
      }
  } 

  if(wordDefinition){
      return(
          <React.Fragment>
              <IonText className="definition" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMeaning(true);}}>
                  {props.word}
              </IonText>
              <IonPopover
                  padding="true"
                  isOpen={showMeaning}
                  onDidDismiss={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMeaning(false)
                    }}>
                <IonCard className="">
                  <IonCardHeader>{props.word}</IonCardHeader>
                  <IonCardContent>
                    {wordDefinition}
                  </IonCardContent>
                </IonCard>
              </IonPopover>
          </React.Fragment>
      );
  } else {
    return props.word + (props.isLast ? '' : ' ');
  }
};

export default AyogiDefinitionInline;