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
      setCategoryAndTags(categories[0]);
    }
  }, [categoryTags])

  const setupCategories = () => {
    let newCategories = [];
    let newCategoryTags = [];
//AMSTODONOW: Replace with currentQuoteTags
    if(props.aycategories.length > 0){
      newCategories = props.aycategories.map(c => c.category);
      newCategoryTags = props.aycategories.reduce(function(map, obj) {
        map[obj.category] = obj.tags;
        return map;
      }, {});
    };
    // if(props.currentQuoteTags.length > 0){
    //   newCategories = props.currentQuoteTags.map(c => c.category);
    //   newCategoryTags = props.currentQuoteTags.reduce(function(map, obj) {
    //     map[obj.category] = obj.tags;
    //     return map;
    //   }, {});
    // };

    //    console.log(newCategories);
    console.log(newCategoryTags);
    setCategories(newCategories);
    setCategoryTags(newCategoryTags);
  };

  const setCategoryAndTags = (nextCategory) => {
    if(nextCategory.length > 0){
      console.log("setCategoryAndTags", nextCategory);
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
      setTagList([]);
      setNewCategory("");
      setAddingCategory(false);
    }
  };

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

  let addCategoryMarkup;
  if(addingCategory || editingCategory){
    addCategoryMarkup = (<IonItem>
      <IonLabel>Enter new category:</IonLabel>
      <IonInput 
        value={newCategory} 
        placeholder="Enter New Category" 
        onIonChange={e => {setNewCategory(e.detail.value);}}>
      </IonInput>
      <IonButton color="primary" fill="outline" onClick={() => {updateCategoryList(newCategory);}}>Save Category</IonButton>
      </IonItem>)
  } else if (addingTag || editingTag){
    addCategoryMarkup = (<IonItem><IonLabel>Category:</IonLabel> { <h4>{currentCategory}</h4>}</IonItem>);
  } else {
    addCategoryMarkup = (
      <React.Fragment> 
        <IonItem>
        <IonLabel>Category:</IonLabel>
          <IonSelect value={currentCategory} okText="Okay" cancelText="Dismiss"  onIonChange={e => {setCategoryAndTags(e.detail.value);}}>
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

  const addTagMarkup = addingTag ? (<React.Fragment>
    {/* <IonSelect value={newCategory} okText="Okay" cancelText="Dismiss"  onIonChange={e => {setCategoryAndTags(e.detail.value);}}>
      {categories && categories.map(c => {
        return (<IonSelectOption value={c}>{c}</IonSelectOption>);
      })}
    </IonSelect> */}
    <IonInput value={newTag} placeholder="Enter New Tag" onIonChange={e => {setNewTag(e.detail.value);}}></IonInput>
    <IonButton color="primary" fill="outline" onClick={() => {updateTagList(newCategory, newTag);}}>Add to list</IonButton>
    </React.Fragment>) :
    (             <IonButton color="primary" fill="outline" disabled={editingTag} onClick={() => {setAddingTag(true);}}>Add Tag</IonButton>);

  return (
    <IonList>
      {/* <IonItemDivider>
        <h2 className="ion-margin-start">Quote Selection</h2>
      </IonItemDivider> */}
      {addCategoryMarkup}
      <IonItem>
        <IonLabel>Tags for {currentCategory}</IonLabel>
        </IonItem>
        <IonItem>
        <IonList>
          {tagList.length > 0 && tagList.map((t) => {
            return <IonItem><IonLabel>{t}</IonLabel></IonItem>
          })}
        </IonList>
      </IonItem>
      <IonItem>
        {addTagMarkup}
      </IonItem>
      {isChanged && <IonItem>
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
          </IonButton>
      </IonItem>}
    </IonList>
  );
};

export default AyogiSettingQuoteTags;
