import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonListHeader,
  IonButton,
  IonLabel,
  IonTextarea
} from "@ionic/react";
import { textOutline, sunny } from "ionicons/icons";
import { useForm } from "react-hook-form";

//import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiFeedback.css";
import constants from "../../store/constants";

const AyogiFeedback = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => {
    console.log('onSubmit', data);
    setResult(JSON.stringify(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonList>
        <IonItem lines="full" className="ion-margin-end">
          <IonListHeader>
            <IonLabel><h1>Submit Feedback</h1></IonLabel>
          </IonListHeader>
        </IonItem>
        <IonItem lines="full">
          <IonLabel className="ion-margin-end">Summary</IonLabel>
          <IonInput 
            {...register("feedbackTitle", { required: true, maxLength: 100 })}
            placeholder="Summary of Feedback" />
        </IonItem>
        <IonItem lines="full">
        <IonLabel className="ion-margin-end">Description</IonLabel>
          <IonTextarea 
            autoGrow="true" 
            {...register("feedbackDescription", { required: true, maxLength: 2000 })}
            // ref={register("feedbackDescription")} 
            placeholder="Please describe" />
        </IonItem>
        <IonItem lines="full">
          <IonLabel>Area</IonLabel>
          <IonSelect
            name="feedbackArea" 
            {...register("feedbackArea", { required: false })}
            placeholder="Select One" 
            // onIonChange={e => setGender(e.detail.value)}
            >
              <IonSelectOption value="chapters">Chapters</IonSelectOption>
              <IonSelectOption value="book">Book</IonSelectOption>
              <IonSelectOption value="shareQuote">Share Quote</IonSelectOption>
              <IonSelectOption value="saveQuote">Save Quote</IonSelectOption>
              <IonSelectOption value="search">Search</IonSelectOption>
              <IonSelectOption value="quotes">Quotes</IonSelectOption>
              <IonSelectOption value="Settings">Settings</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem lines="full">
          <IonButton slot="start" color="primary" type="submit">Submit</IonButton>
          <IonButton slot="end" color="light  ">Cancel</IonButton>
        </IonItem>
        <IonItem lines="full">
          {JSON.parse(JSON.stringify(result)) }
        </IonItem>
      </IonList>
    </form>
  );
};

export default AyogiFeedback;
