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
  IonCard,
  IonCardHeader,
} from "@ionic/react";

const AyogiImage = (props) => {
  // console.log("IonAyogiImage");
  // console.log(props);

  // const [titlesHeight, setTitlesHeight] = useState([0]);
  //    const ref = useRef(null);

  useEffect(() => {
    // let titleHeight = ref && ref.current && ref.current.clientHeight ?
    //     ref.current.clientHeight : '20px' ;
    // setTitlesHeight(titleHeight);
  }, []);

  let imageTitles;
  let imageId;
  const imageContent = props.items.map((image, i) => {
    let maxWidth = image.width > 400 ? image.width : 400;
    let imgStyle = { maxWidth: maxWidth + "px" };

    // console.log(imgStyle);
    imageId += image.id;
    return (
      <IonRow
        className="ion-padding AyogiImage"
        lines="none"
        key={"image-row" + image.id}
        id={image._id}
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
    <div className="image-div" key={`ayogiimage-${imageId}`}>
      <IonGrid key={props.items.map((p) => p._id).join("_")}>
        {imageContent}
      </IonGrid>
    </div>
  );
};

export default AyogiImage;
