import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { imagesOutline, listOutline, bookOutline} from 'ionicons/icons';
import ImageListTab from './pages/ImageListTab';
import ImageTab from './pages/ImageTab';
import PoemListTab from './pages/PoemListTab';
import PoemTab from './pages/PoemTab';
import AyogiPage from './pages/AyogiPage';
import AyogiChapterPage from './pages/AyogiChapterPage';
import AyogiTypePage from './pages/AyogiTypePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { LINE_TYPE_ENUM } from './utility/dataTypes';

import aydata  from "./aydata.json";
import aychaptlist from "./aychaptlist.json";
import aychaptpos from "./aychaptpos.json";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route 
            path="/aychap" 
            render={(props) => <AyogiChapterPage {...props} />}
            exact={true} />
          <Route
            path="/ayogi/:id"
            // aydata={aydata}
            // aychaptlist={aychaptlist} 
            render={(props) => 
            <AyogiPage 
                chPos={aychaptpos}
                aychaptlist={aychaptlist} 
                aydata={aydata} {...props} />}
            exact={true} />
          <Route path="/imagelist"  render={(props) => <ImageListTab />} exact={true} />
          <Route path='/aypoems'
            render={(props) => <AyogiTypePage {...props} type={LINE_TYPE_ENUM.POEM} />}
          />
          {/* <Route path="/" render={() => <Redirect to="/aychap" />} exact={true} /> */}
           <Route path="/" render={() => <Redirect to="/aychap" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="chapterlist" href="/aychap">
            <IonIcon icon={listOutline} />
            <IonLabel>Chapters</IonLabel>
          </IonTabButton>
          <IonTabButton tab="book" href="/ayogi/-1">
            <IonIcon icon={bookOutline} />
            <IonLabel>Book</IonLabel>
          </IonTabButton>
          <IonTabButton tab="imagelist" href="/imagelist">
            <IonIcon icon={imagesOutline} />
            <IonLabel>Images</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
