import React from "react";
import AyogiLine from "../AyogiLine/AyogiLine";
import "./AyogiPoem.css";
import { LINE_TYPE_ENUM } from "../../../utility/dataTypes";
import { IonCard, IonCardHeader, IonGrid, IonRow, IonCol } from "@ionic/react";

const AyogiPoem = ({ items }) => {
  //    console.log('AyogiPoem');
  //    console.log(items);

  let poemContent = items.reduce((acc, curr, pos, src) => {
    //            //console.log({acc, curr, pos, src});
    if (curr.class === "poemStart") {
      acc.push({ pos: pos, title: curr.text + "yeah" });
    }
    return acc;
  }, []);

  poemContent.push({ pos: items.length, title: "endofpeoms" });
  // console.log('poemContent');
  // console.log(poemContent);

  let poemsz =
    poemContent &&
    poemContent.slice(0).reduce((a, c, i) => {
      // console.log(a);
      if (i > 0) {
        // console.log(a);
        let ppos = poemContent[i - 1].pos;
        a.push(items.slice(ppos, c.pos));
      }
      return a;
    }, []);

  // console.log('poemsz');
  // console.log(poemsz);
  return (
    <div className="poem-div" key={`ayogipoem-div-${items[0]._id}`}>
      <IonGrid>
        {poemsz.map((p) => {
          const poemClasses = ["AyogiPoem"];
          //AMSTODO: add class to content
          if (p[0].text.indexOf("Samadhi" > -1)) {
            poemClasses.push("samadhi");
          }

          return (
            <IonRow key={"poemrow" + p[0]._id}>
              <IonCol center text-center>
                <IonCard key={"poem" + p[0]._id}>
                  <IonCardHeader>{p[0].text}</IonCardHeader>
                  {/* <div className={poemClasses.split(' ')}> */}
                  <div className="AyogiPoem">
                    {p &&
                      p.slice(1).map((c, i) => {
                        return (
                          <AyogiLine
                            key={c._id}
                            c={c}
                            i={i}
                            type={LINE_TYPE_ENUM.POEM}
                          ></AyogiLine>
                        );
                      })}
                  </div>
                </IonCard>
              </IonCol>
            </IonRow>
          );
        })}
      </IonGrid>
    </div>
  );
};
export default AyogiPoem;
