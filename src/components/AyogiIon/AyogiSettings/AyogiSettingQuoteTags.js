import React, { useState, useEffect, useRef } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {catTagsToObject} from '../../../utility/quoteUtility';
import "./AyogiSettingQuoteTags.css";
import constants from "../../../store/constants";
import { add } from "ionicons/icons";


const AyogiSettingQuoteTags = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryTags, setCategoryTags] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [editingTag, setEditingTag] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setupCategories();
  }, [props.aycategories])
//}, [props.currentQuoteTags])

  useEffect(() => {
    console.log(categories, categoryTags);
    if(categories && 
      categories.length > 0 
      // categoryTags && 
      // Object.keys(categoryTags).length > 0
      ){
      setCurrentCategoryAndTags(categories[0]);
    }
  }, [categoryTags])

  const setupCategories = () => {
    console.log('setupCategories');
    let newCategories = [];
    let newCategoryTags = [];

    if(props.currentQuoteTags.length > 0){
      newCategories = props.currentQuoteTags.map(c => c.category);
      newCategoryTags = props.currentQuoteTags.reduce(function(map, obj) {
        map[obj.category] = obj.tags;
          return map;
      }, {});
    };

    //    console.log(newCategories);
    console.log(newCategoryTags);
    setCategories(newCategories);
    setCategoryTags(newCategoryTags);
  };

  const setCurrentCategoryAndTags = (nextCategory) => {
    if(nextCategory.length > 0){
//      console.log("setCurrentCategoryAndTags", nextCategory);
      setCurrentCategory(nextCategory);
      const newTagList = [...categoryTags[nextCategory]];
      console.log(categoryTags);
      console.log(newTagList);
      setTagList(newTagList);
    }
  };

  const updateCategoryList = (newCategory) => {
    setIsChanged(true);
    if(editingCategory){
      setEditingCategory(false);
      //AMSTODO:edit item
    }
    if(addingCategory){
      const newCategories = [...categories];
      newCategories.push(newCategory)
      setCategories(newCategories);
      const newCategoryTags = {...categoryTags};
      newCategoryTags[newCategory] = ["first"];
      setCategoryTags(newCategoryTags);
      setTagList([]);
      setNewCategory("");
      setAddingCategory(false);
    }
  };

  const updateTagList = (category, newItem) => {
    setIsChanged(true);
    if(editingTag){

      setEditingTag(false);
    }
//AMSTODO:editing
    if(addingTag){
      const newCategoryTags = {...categoryTags};
      console.log(newCategoryTags, category, newItem);
      newCategoryTags[category].push(newItem);
      setCategoryTags(newCategoryTags);
      console.log(newCategoryTags);
      const newTagList = [...tagList];
      newTagList.push(newItem)
      setTagList(newTagList);
      setNewTag("");
      setAddingTag(false);
    }
  };

  let addCategoryMarkup;
  const isEditing = addingCategory || editingCategory || addingTag || editingTag;

  if(addingCategory || editingCategory){
    addCategoryMarkup = (<React.Fragment><IonItem>
      <IonLabel>Enter new category:</IonLabel>
      <IonInput 
        value={newCategory} 
        placeholder="Enter New Category" 
        onIonChange={e => {setNewCategory(e.detail.value);}}>
      </IonInput>
      </IonItem>
      <IonItem>
      <IonButton color="primary" fill="outline" onClick={() => {updateCategoryList(newCategory);}}>Save Category</IonButton>
      </IonItem></React.Fragment>)
  } else if (addingTag || editingTag){
    addCategoryMarkup = (<IonItem><IonLabel>Category:</IonLabel> { <h4>{currentCategory}</h4>}</IonItem>);
  } else {
    addCategoryMarkup = (
      <React.Fragment> 
        <IonItem>
        <IonLabel>Category:</IonLabel>
          <IonSelect 
            // className="ion-padding ion-margin"
            value={currentCategory} 
            okText="Okay" 
            cancelText="Dismiss"  
            onIonChange={e => {setCurrentCategoryAndTags(e.detail.value);}}>
          {categories && categories.map(c => {
            return (<IonSelectOption key={`settingscategoryselect${c}`} value={c}>{c}</IonSelectOption>);
          })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonButton 
            color="primary" fill="outline" slot="start"
            // disabled={editingCategory} 
            onClick={() => {setAddingCategory(true);}}>
            Add Category
          </IonButton>
          <IonButton 
            color="primary" fill="outline" slot="end"
            // disabled={editingCategory} 
            onClick={() => {setEditingCategory(true);}}>
            Edit Category
          </IonButton>
        </IonItem>
      </React.Fragment>);
  };

  let addTagMarkup;
  if(addingTag) { 
    addTagMarkup = (<IonItem>
    {/* <IonSelect value={newCategory} okText="Okay" cancelText="Dismiss"  onIonChange={e => {setCurrentCategoryAndTags(e.detail.value);}}>
      {categories && categories.map(c => {
        return (<IonSelectOption value={c}>{c}</IonSelectOption>);
      })}
    </IonSelect> */}
    <IonInput value={newTag} placeholder="Enter New Tag" onIonChange={e => {setNewTag(e.detail.value);}}></IonInput>
    <IonButton color="primary" fill="outline" onClick={() => {updateTagList(currentCategory, newTag);}}>Add to list</IonButton>
    </IonItem>);
  } else if(!addingCategory && !editingCategory) {
    addTagMarkup = (<IonItem>
      <IonButton color="primary" fill="outline" disabled={editingTag} onClick={() => {setAddingTag(true);}}>Add Tag</IonButton>
    </IonItem>);
  }


  const tagMarkup = isEditing ? null : (
  <React.Fragment>
    <IonItem>
      <IonLabel>Tags for {currentCategory}</IonLabel>
    </IonItem>
    <IonItem>
      <IonList>
        {tagList.length > 0 && tagList.map((t) => {
          return <IonItem key={`quotesettingstag${t}`}><IonLabel>{t}</IonLabel></IonItem>
        })}
      </IonList>
    </IonItem>
  </React.Fragment>
);

  return (
    <IonList>
      {/* <IonItemDivider>
        <h2 className="ion-margin-start">Quote Selection</h2>
      </IonItemDivider> */}
      {addCategoryMarkup}
      {tagMarkup}
      {addTagMarkup}
      {isChanged && !isEditing && <IonItem>
          <IonButton color="primary" 
          disabled={editingTag || addingTag} 
          onClick={() => {
            setIsChanged(false);
            const newTagsObj = catTagsToObject(categoryTags);
            console.log(newTagsObj);
            props.onChangeMyQuoteTags(newTagsObj);
            }}>Save
          </IonButton>
          <IonButton color="secondary" 
          slot="end"
          disabled={editingTag || addingTag} 
          onClick={() => {
            setIsChanged(false);
              setTagList(props.currentQuoteTags);
            }}>Cancel
          </IonButton>
      </IonItem>}
    </IonList>
  );
};

export default AyogiSettingQuoteTags;
