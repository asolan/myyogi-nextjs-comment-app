import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { imagesOutline, listOutline, bookOutline, settingsOutline } from "ionicons/icons";
import ImageListTab from "./pages/ImageListTab";
import ImageTab from "./pages/ImageTab";
import PoemListTab from "./pages/PoemListTab";
import PoemTab from "./pages/PoemTab";
import AyogiPage from "./pages/AyogiPage";
import AyogiChapterPage from "./pages/AyogiChapterPage";
import AyogiTypePage from "./pages/AyogiTypePage";
import AyogiSettings from './pages/AyogiSettings';

// Delme
//import AyogiPageTest from "./pages/AyogiPageTest";

// Redux

// import { createStructuredSelector } from "reselect";
// import { connect } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { LINE_TYPE_ENUM } from "./utility/dataTypes";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import aydata from "./aydata.json";
import aychaptlist from "./aychaptlist.json";
import aychaptpos from "./aychaptpos.json";

import selectors from "./store/selectors";
//import selectors from "./store/selectors/index.js";
// import actions from "./store/actions";
// import constants from "./store/constants";

const App: React.SFC = (props) => {
  console.log('app');
  console.log(props);

  let currentTab = "/ayogi";
  // Page load
  useEffect(() => {
    setCurrentTab(props["currentTab"]);
    document.documentElement.style.setProperty("--yogi-font-size", props["currentFontSize"] + "em");
    document.documentElement.style.setProperty("--yogi-text-align", props["currentFontJustification"] ? "justify" : "left");
  }, []);
  
  useEffect(() => {
    setCurrentTab(props["currentTab"]);
  }, [props["currentTab"]]);

  const setCurrentTab = (tab: string) => {
   currentTab = tab;
  };


  return (
    <IonApp>
      <IonReactRouter>
        {/* <IonTabs ref={tabRef}> */}
        <IonTabs>
          <IonRouterOutlet>
          {/* <Route
              path="/aychaptest"
              render={(props) => <AyogiPageTest 
                chPos={aychaptpos}
                aychaptlist={aychaptlist}
                aydata={aydata}
                {...props} />}
              exact={true}
            /> */}
            <Route
              path="/aychap"
              render={(props) => <AyogiChapterPage {...props} />}
//              exact={true}
            />
            <Route
              path="/ayogi/:id/:line"
              // aydata={aydata}
              // aychaptlist={aychaptlist}
              render={(props) => (
                <AyogiPage
                  chPos={aychaptpos}
                  aychaptlist={aychaptlist}
                  aydata={aydata}
                  {...props}
                />
              )}
  //            exact={true}
            />
            <Route
              path="/:tab(imagelist)"
              render={(props) => <ImageListTab />}
//              exact={true}
            />
            <Route
              path="/aypoems"
              render={(props) => (
                <AyogiTypePage {...props} type={LINE_TYPE_ENUM.POEM} />
              )}
            />
            <Route
              path="/settings"
              render={(props) => (
                <AyogiSettings items={aydata.slice(3,9)} {...props} />
              )}
            />            
            {/* <Route path="/" render={() => <Redirect to="/aychap" />} exact={true} /> */}
            <Route
              path="/"
              render={(props) => <Redirect to={currentTab} />}
//              render={(props) => console.log(props)}
//              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="chapterlist" href="/aychap">
              <IonIcon icon={listOutline} />
              <IonLabel>Chapters</IonLabel>
            </IonTabButton>
            <IonTabButton tab="book" href={currentTab}>
              <IonIcon icon={bookOutline} />
              <IonLabel>Book</IonLabel>
            </IonTabButton>
            <IonTabButton tab="imagelist" href="/imagelist">
              <IonIcon icon={imagesOutline} />
              <IonLabel>Images</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = () =>
   createStructuredSelector({
     currentTab: selectors.makeSelectTab(),
     currentFontSize: selectors.makeSelectFontSize(),
     currentFontJustification: selectors.makeSelectFontJustification(),     
});

export default connect(mapStateToProps)(App);
