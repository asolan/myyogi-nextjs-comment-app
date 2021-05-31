import React, { useState, useEffect } from "react";
import { IonActionSheet } from "@ionic/react";
import {
  clipboardOutline,
  chatbox,
  chatboxEllipses,
  flag,
  close,
  reader,
  book
} from "ionicons/icons";
import { queries } from "@testing-library/dom";

const AyogiLineAction = (props) => {
  if (props.lineActionItems.length > 2) {
    //        console.log(props.lineActionItems);
  }
  const iconMap = {
    clipboardOutline: clipboardOutline,
    chatbox: chatbox,
    chatboxEllipses: chatboxEllipses,
    flag: flag,
    close: close,
    reader: reader,
    book: book
  }
//  console.log(props.showLineAction);

  return (
    <React.Fragment>
      <IonActionSheet
        isOpen={props.showLineAction}
        onDidDismiss={() => props.setShowLineAction(false)}
        cssClass="my-custom-class"
        buttons={props.lineActionItems.map((ai) => {
          return {
            text: ai.val,
            //                role: "destructive",
            icon: iconMap[ai.icon],
            handler: () => {
              props.updateLineAction(ai.action, ai.key);
            },
          };
        })}
      ></IonActionSheet>
    </React.Fragment>
  );
};

export default AyogiLineAction;
