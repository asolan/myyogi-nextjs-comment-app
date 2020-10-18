//import * as React from 'react';
import React, { useEffect } from "react";
import "../../../theme/AyogiImage.css";
//import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';
import { parseImageTitles } from "../../../utility/parseUtility";
import { Link } from "react-router-dom";
import {
  // IonSlides,
  // IonSlide,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonCard,
  //    IonCardContent,
  IonCardHeader,
  //    IonCardSubtitle,
  //    IonCardTitle
  // IonButtons,
  // IonButton,
  // IonContent,
  // IonHeader,
  // IonPage,
  // IonTitle,
  // IonToolbar,
  // IonIcon
} from "@ionic/react";

// const slideOpts = {
//     initialSlide: 0,
//     speed: 400,
//     effect: 'cube',
//     autoHeight: true,
//     cssMode: true
// };

const AyogiImage = (props) => {
  console.log("IonAyogiImage");
  console.log(props);

  // const [titlesHeight, setTitlesHeight] = useState([0]);
  //    const ref = useRef(null);

  useEffect(() => {
    // let titleHeight = ref && ref.current && ref.current.clientHeight ?
    //     ref.current.clientHeight : '20px' ;
    // setTitlesHeight(titleHeight);
  }, []);

  let imageTitles;
  const imageContent = props.items.map((image, i) => {
    let maxWidth = image.width > 400 ? image.width : 400;
    let imgStyle = { maxWidth: maxWidth + "px" };
    console.log(image);
    // console.log(imgStyle);
    return (
      <IonRow
        className="ion-padding AyogiImage"
        lines="none"
        key={"image" + image.id}
      >
        <IonCol center text-center>
          <Link to={"/ayogi/" + image.chapterNumber + "/" + image.lineNumber}>
            <div className="AyogiImageOuter">
              <IonCard className="" style={imgStyle}>
                <img
                  alt={image.text}
                  width={image.width}
                  height={image.height}
                  src={image.src}
                  border={image.border}
                  id={image.id}
                  name={image.name}
                  key={image.id}
                />
                <IonCardHeader>
                  {(imageTitles = parseImageTitles(image))}
                  {imageTitles &&
                    imageTitles.children &&
                    imageTitles.children.map((c, i) => {
                      return imageTitles;
                    })}
                </IonCardHeader>
              </IonCard>
            </div>
          </Link>
        </IonCol>
      </IonRow>
    );
  });

  return (
    <div className="image-div">
      <IonGrid key={props.items.map((p) => p._id).join("_")}>
        {imageContent}
      </IonGrid>
    </div>
  );
};

export default AyogiImage;
