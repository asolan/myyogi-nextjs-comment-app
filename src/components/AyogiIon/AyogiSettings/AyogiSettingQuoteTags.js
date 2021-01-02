import React, { useState, useEffect, useRef } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import "./AyogiSettingQuoteTags.css";
import constants from "../../../store/constants";
import { add } from "ionicons/icons";

const AyogiSettingQuoteTags = (props) => {
  const [editingTag, setEditingTag] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setTagList(props.currentQuoteTags);
  }, [props.currentQuoteTags])

  const updateTagList = (newItem) => {
    setIsChanged(true);
    if(editingTag){

      setEditingTag(false);
    }
    if(addingTag){
      const newTagList = [...tagList];
      newTagList.push(newItem)
      setTagList(newTagList);
      setNewTag("");
      setAddingTag(false);
    }
  };

  const addMarkup = addingTag ? (<React.Fragment>
    <IonInput value={newTag} placeholder="Enter New Tag" onIonChange={e => {setNewTag(e.detail.value);}}></IonInput>
    <IonButton color="primary" fill="outline" onClick={() => {updateTagList(newTag);}}>Add to list</IonButton>
    </React.Fragment>) :
    (             <IonButton color="primary" fill="outline" disabled={editingTag} onClick={() => {setAddingTag(true);}}>Add New</IonButton>);

  return (
    <IonList>
      {/* <IonItemDivider>
        <h2 className="ion-margin-start">Quote Selection</h2>
      </IonItemDivider> */}
      <IonItem>
        <IonList>
          {tagList.map((t) => {
            return <IonItem><IonLabel>{t}</IonLabel></IonItem>;
          })}
        </IonList>
      </IonItem>
      <IonItem>
        {addMarkup}
      </IonItem>
      <IonItem>
        {isChanged && <React.Fragment>
          <IonButton color="primary" 
          disabled={editingTag || addingTag} 
          onClick={() => {
            setIsChanged(false);
            props.onChangeMyQuoteTags(tagList);
            }}>Save
          </IonButton>
          <IonButton color="secondary" 
          disabled={editingTag || addingTag} 
          onClick={() => {
            setIsChanged(false);
            setTagList(props.currentQuoteTags);
            }}>Cancel
          </IonButton></React.Fragment>}
      </IonItem>
    </IonList>
  );
};

export default AyogiSettingQuoteTags;
