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
import { ellipse, square, triangle } from 'ionicons/icons';
import ImageListTab from './pages/ImageListTab';
import ImageTab from './pages/ImageTab';
import PoemListTab from './pages/PoemListTab';
import PoemTab from './pages/PoemTab';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/imagelist" component={ImageListTab} exact={true} />
          <Route path="/image" component={ImageTab} exact={true} />
          <Route path="/poemlist" component={PoemListTab} exact={true} />
          <Route path="/poem" component={PoemTab} exact={true} />
          <Route path="/" render={() => <Redirect to="/imagelist" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="imagelist" href="/imagelist">
            <IonIcon icon={triangle} />
            <IonLabel>Images</IonLabel>
          </IonTabButton>
          <IonTabButton tab="image" href="/image">
            <IonIcon icon={ellipse} />
            <IonLabel>Image</IonLabel>
          </IonTabButton>
          <IonTabButton tab="poemlist" href="/poemlist">
            <IonIcon icon={square} />
            <IonLabel>Poems</IonLabel>
          </IonTabButton>
          <IonTabButton tab="poem" href="/poem">
            <IonIcon icon={ellipse} />
            <IonLabel>Poem</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
