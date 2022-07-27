import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  IonContent,
  IonPage,
  IonItem,
  IonRange,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonListHeader,
  IonList
} from "@ionic/react";import { textOutline, sunny } from "ionicons/icons";
import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiFeedback.css";
import constants from "../../store/constants";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  fullName: "",
  gender: "",
  feedbackArea: "",
  email: ""
};

const AyogiFeedback = (props) => {
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [feedbackData, setFeedbackData] = useState();
  renderCount++;

  /* @param _fieldName   */
  const showError = _fieldName => {
    return (
      errors[_fieldName] && (
        <div style={{ color: "red", padding: 5, paddingLeft: 12, fontSize: "smaller"}}>
          {_fieldName}: {errors[_fieldName].message || "This field is required"}
        </div>
      )
    );
  };

  /* @param data */
  const onSubmit = data => {
    alert(JSON.stringify(data, null, 2));
    setFeedbackData(data);
  };

  console.log('errors', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 18 }}>
      <IonList>
        <IonItem>
          <IonListHeader>
            <IonLabel>Send Feedback</IonLabel>
          </IonListHeader>
        </IonItem>
        <IonItem>
            <IonLabel>Name - IonInput</IonLabel>
            <Controller
              as={IonInput}
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log("fullName", selected.detail.value);
                return selected.detail.value;
              }}
              name="fullName"
              rules={{
                required: true,
                minLength: { value: 4, message: "Must be 4 chars long" }
              }}
            />
          </IonItem>
          {showError("fullName")}

          <IonItem>
            <IonLabel>Email</IonLabel>
            <Controller
              as={IonInput}
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                return selected.detail.value;
              }}
              name="email"
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address"
                }
              }}
            />
          </IonItem>
          {showError("email")}
          <Controller
            as={
              <IonRadioGroup>
                <IonListHeader>
                  <IonLabel>
                    <h1>Feedback Area</h1>
                  </IonLabel>
                </IonListHeader>
                <IonItem>
                  <IonLabel>Chapters</IonLabel>
                  <IonRadio value="chapters" />
                </IonItem>
                <IonItem>
                  <IonLabel>Book</IonLabel>
                  <IonRadio value="book" />
                </IonItem>
                <IonItem>
                  <IonLabel>Share Quote</IonLabel>
                  <IonRadio value="shareQuote" />
                </IonItem>
                <IonItem>
                  <IonLabel>Save Quote</IonLabel>
                  <IonRadio value="saveQuote" />
                </IonItem>
                <IonItem>
                  <IonLabel>Search</IonLabel>
                  <IonRadio value="search" />
                </IonItem>
                <IonItem>
                  <IonLabel>Quotes</IonLabel>
                  <IonRadio value="quotes" />
                </IonItem>
                <IonItem>
                  <IonLabel>Settings</IonLabel>
                  <IonRadio value="settings" />
                </IonItem>
              </IonRadioGroup>
          }
            control={control}
            name="feedbackArea"
            rules={{ required: true }}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              return selected.detail.value;
            }}
          />

          <IonItem>
            <IonLabel>Gender</IonLabel>
            <Controller
              as={
                <IonSelect placeholder="Select One">
                  <IonSelectOption value="FEMALE">Female</IonSelectOption>
                  <IonSelectOption value="MALE">Male</IonSelectOption>
                </IonSelect>
              }
              control={control}
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log(selected.detail.value);
                return selected.detail.value;
              }}
              name="gender"
              rules={{ required: true }}
            />
          </IonItem>

          <IonItem>
            <Controller
              as={
                <IonRange min={-200} max={200} color="secondary">
                  <IonLabel slot="start">-200</IonLabel>
                  <IonLabel slot="end">200</IonLabel>
                </IonRange>
              }
              control={control}
              name="rangeInfo"
              onChangeName="onIonChange"
              onChange={([selected]) => {
                console.log(selected.detail.value);
                return selected.detail.value;
              }}
              rules={{ required: true }}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              formState.isValid: {(formState.isValid === true).toString()}
            </IonLabel>
          </IonItem>
          {feedbackData && (
            <pre style={{ textAlign: "left" }}>
              {JSON.stringify(feedbackData, null, 2)}
            </pre>
          )}

          <IonButton
            type="button"
            onClick={() => {
              reset(initialValues);
            }}
          >
            Reset Form
          </IonButton>
          <IonButton type="submit" disabled={formState.isValid === false}>
            submit
          </IonButton>
        <IonItem>
          {feedbackData}
        </IonItem>
      </IonList>
    </form>
  );
};

export default AyogiFeedback;
