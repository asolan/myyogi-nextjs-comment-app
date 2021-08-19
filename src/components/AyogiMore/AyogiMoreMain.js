import React, { useState, useEffect } from "react";
import "./AyogiMoreMain.css";
import AyogiSettingFontSize from "../AyogiSettings/AyogiSettingFontSize";
import AyogiImage from '../AyogiImage/AyogiImage';
// import AyogiSettingQuoteSelection from "../AyogiSettings/AyogiSettingQuoteSelection";
// import AyogiSettingQuoteTags from "../AyogiSettings/AyogiSettingQuoteTags";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonIcon,
  IonItem,
  IonButton,
  IonTitle,
  IonLabel,
  IonPage,

} from "@ionic/react";
import { umbrella, triangle } from "ionicons/icons";

const MORE = {
  MORE_MENU: "MORE_MENU",
  IMAGE_LIST: "IMAGE_LIST",
  SETTING: "SETTING",
  LEARN_KRIYA: "LEARN_KRIYA",
};

const AyogiMoreMain = (props) => {
  const [pageToShow, setPageToShow] = useState(MORE.MORE_MENU);

  let returnVal = (
    <React.Fragment>
      More1-{pageToShow}-Main<br/>
      More1-{MORE.MORE_MENU}-Main<br/>
      More2-{pageToShow === MORE.MORE_MENU ? 'y': 'n'}-Main<br/>
    {pageToShow === MORE.MORE_MENU && 
      <React.Fragment>
        <p>moremenu</p>
      <IonMenu side="start" contentId="moremenu" menuId="moremenu">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>More</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button onClick={() => {setPageToShow(MORE.IMAGE_LIST);}}>
              <IonLabel>Images</IonLabel>
            </IonItem>
            <IonItem button onClick={() => {setPageToShow(MORE.SETTING);}}>
              <IonLabel>Settings</IonLabel>
            </IonItem>
            <IonItem button onClick={() => {setPageToShow(MORE.LEARN_KRIYA);}}>
              <IonLabel>Learn Kriya</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
    </IonMenu>
    </React.Fragment>}
    {pageToShow === MORE.SETTING && 
      <React.Fragment>
        <AyogiSettingFontSize {...props} />
        <IonButton expand="block" size="large"
            onClick={() => {setPageToShow(MORE.MORE_MENU);}}><h3>Close</h3>
          <IonIcon
            slot="end"
            icon={"umbrella"}
          />
        </IonButton>
      </React.Fragment>
      }
    {pageToShow === MORE.IMAGE_LIST && 
      <React.Fragment>
          <IonButton expand="block" size="large"
            onClick={() => {setPageToShow(MORE.MORE_MENU);}}><h3>Close</h3>
          <IonIcon
            slot="end"
            icon={"triangle"}
          />
        </IonButton>
          <AyogiImage 
              items={props.ayimage}
              key={'AyogiImageList'} >
          </AyogiImage>
      </React.Fragment>
      }
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiMoreMain;
