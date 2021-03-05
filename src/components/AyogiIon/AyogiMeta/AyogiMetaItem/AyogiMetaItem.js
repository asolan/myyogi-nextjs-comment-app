import React from 'react';
import './AyogiMetaItem.css';
import AyogiMetaPopup from '../AyogiMetaPopup/AyogiMetaPopup';
import { META_TYPE_ENUM } from '../../../../utility/metaTypes';
//import parseBookData from '../../../utility/parseBookData';

const AyogiMetaItem = props => {
// console.log(`AyogiMetaItem-${props}`);
// console.log(props);
// console.log(META_TYPE_ENUM.PERSON);

    let content = [];
    if(props.c.scripture) {
        content.push(                    
            <AyogiMetaPopup
                type={META_TYPE_ENUM.SCRIPTURE}
                item={props.c.scripture}
                detail={props.c.scripturedetail}
                key={'AyogiMetaPopup'+props.c._id} >
            </AyogiMetaPopup>);
    } 

    if(props.c.person) {
        content.push(                    
            <AyogiMetaPopup
                type={META_TYPE_ENUM.PERSON}
                item={props.c.person}
                detail={props.c.persondetail}
                key={'AyogiMetaPopup'+props.c._id} >
            </AyogiMetaPopup>);
    } 

    return (
        <span className="AyogiMetaItem">
        {content.map((c,i) => {
            return c;
            })
        }
        </span>);
};

export default AyogiMetaItem;
