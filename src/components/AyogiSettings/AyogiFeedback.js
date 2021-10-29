import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonListHeader,
  IonLabel
} from "@ionic/react";
import { textOutline, sunny } from "ionicons/icons";
import { useForm } from "react-hook-form";

import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiFeedback.css";
import constants from "../../store/constants";

const AyogiFeedback = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => {
    setResult(JSON.stringify(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonList>
        <IonItem>
          <IonListHeader>
            <IonLabel>Send Feedback</IonLabel>
          </IonListHeader>
        </IonItem>
        <IonItem>
          <IonInput ref={register("feedbackTitle")} placeholder="Feedback Title" />
        </IonItem>
        <IonItem>
          <IonInput ref={register("feedbackDescription")} placeholder="Feedback Description" />
        </IonItem>
        <IonItem>
          <IonLabel>Feedback Area</IonLabel>
          <IonSelect 
            name="feedbackArea" 
            ref={register("feedbackArea")}
            placeholder="Select One" 
            // onIonChange={e => setGender(e.detail.value)}
            >
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <input type="submit" />
        </IonItem>
        <IonItem>
          {result}
        </IonItem>
      </IonList>
    </form>
  );
};

export default AyogiFeedback;
