import React from 'react';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

import './AyogiHeader.css';

const AyogiHeader = (props) => {
    console.log('AyogiHeader');
    console.log(props);

    let headerContent = null;
    switch (props.headerType) {
        case "settings":
            headerContent =
                (<IonRow>
                    <IonCol className="otherheader">
                        Settings
                    </IonCol>
                </IonRow>);
            break;
        case "chapterlist":
            headerContent =
                (<IonRow>
                    <IonCol className="otherheader">
                        Chapter List
                    </IonCol>
                </IonRow>);
            break;
        case "image":
            headerContent =
                (<IonRow>
                    <IonCol className="otherheader">
                        Images
                    </IonCol>
                </IonRow>);
            break;
        case "poem":
            headerContent =
                (<IonRow>
                    <IonCol className="otherheader">
                        Poems
                    </IonCol>
                </IonRow>);
            break;
        case "chapter":
        default:
            headerContent =
                (<React.Fragment>
                    <IonRow>
                        <IonCol className="chapterheader">
                            Chapter: <span>{props.headerNumber}</span>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="chaptertitle">
                            {props.headerTitle}
                        </IonCol>
                    </IonRow></React.Fragment>);
            break;
    }

    return (
        <IonHeader no-border>
            <IonToolbar>
                <IonTitle size="small">
                    <IonGrid>
                        <IonRow className="yogananda-row">
                            <IonCol size="3">
                                <IonAvatar>
                                    <div className="yogananda-portrait">
                                        <img alt="Yogananda" src="/images/paramhansa_yogananda_portrait_96dpi.jpg" />
                                    </div>
                                </IonAvatar>
                            </IonCol>
                            <IonCol size="9">
                                {headerContent}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonTitle>
                {/* <img src="/images/py.png" /> */}
                {/* <IonButtons slot="secondary">
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" name="listBox" />
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" name="planet" />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" name="more" />
                    </IonButton>
                </IonButtons> */}
            </IonToolbar>
        </IonHeader>
    )
}

export default AyogiHeader;