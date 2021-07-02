// import React, { useState, useEffect } from 'react';
// import { parseFootnote } from '../../utility/parseUtility';
// import {
//     IonBadge,
//     IonPopover,
//     // IonCard,
//     // IonCardContent,
//     // IonCardHeader,
//     // IonCardSubtitle,
//     // IonCardTitle
// } from '@ionic/react';
// //import classes from './AyogiDefinitionAlert.css';
// import './AyogiDefinitionAlert.css';

// const AyogiDefinitionAlert = props => {
//     console.log(props);
//     const [showhide, setShowhide] = useState(false);

//     // useEffect(()=> {
//     //     if(props.definitionCount > 0){
//     //         setShowhide(true);
//     //     }

//     // }, [props.definitionCount])

//     // const showhideClick = () => {
//     //    console.log(`butt click-${showhide}`);
//     //     setShowhide(!showhide);
//     //     console.log(showhide);
//     // }

//     const showhideButton =
//         (<IonBadge
//             className="wisdom"
//             fill="outline"
//             color="light"
//             key={'dn' + props.word}
//             onClick={(e) => {
//                 console.log('definition click');
//                 e.stopPropagation();  //  <------ Here is the magic
// //                showhideClick();
//                 setShowhide(!showhide);
//             }}
//         >   
//             {props.word}
//         </IonBadge>);

//     // console.log('f-popup');
//     // console.log(props);
//     // console.log(definition);

//     let definitionContent =                 
//         showhide ?
//             <IonPopover
//                 padding="true"
//                 isOpen={showhide}
//                 onDidDismiss={() => {
//                     setShowhide(false)}}     vbh
                    



//                 {props.meaning}
//             </IonPopover>
//             : null;

//     return (
//         <span className="AyogiDefinitionAlert">
//             {showhideButton}
//             {definitionContent}
//         </span>
//     )
// }

// export default AyogiDefinitionAlert;