import React from 'react';
//import { Link } from 'react-router-dom';
import AyogiImage from '../AyogiImage/AyogiImage';
import AyogiPoem from '../AyogiPoem/AyogiPoem';
import AyogiFootnoteAlert from '../AyogiFootnoteAlert/AyogiFootnoteAlert';
import './AyogiType.css';
//import parseBookData from '../../utility/parseBookData';
import { LINE_TYPE_ENUM } from '../../utility/dataTypes';

const AyogiType = props => {
console.log(`ayogitype-${props.type}`);
console.log(props.typeItems);

    let content = [];
    if(props.typeItems && props.typeItems.length > 0 && props.type){
        switch(props.type){
            // case (LINE_TYPE_ENUM.WISDOM):
            //     return <AyogiWisdom items={props.typeItems}></AyogiWisdom>;
            case (LINE_TYPE_ENUM.FOOTNOTE):
                content.push(
                    <AyogiFootnoteAlert  
                        items={props.typeItems}
                        key={'AyogiTypeAyogiFootnoteAlert'+content.length} >
                    </AyogiFootnoteAlert>);
                break;
            case (LINE_TYPE_ENUM.POEM):
                content.push(
                    <AyogiPoem 
                        items={props.typeItems}
                        key={'AyogiTypeAyogiPoem'+content.length} 
                        >
                    </AyogiPoem>);
                break;
            case (LINE_TYPE_ENUM.IMAGE):
                content.push(
                    <AyogiImage 
                        items={props.typeItems}
                        key={'AyogiTypeAyogiImage'+content.length} >
                    </AyogiImage>);
                break;
            default:
                break;
            }
    }

    return (
        <div className="AyogiType">
        {content.map((c,i) => {
            return c;
            })
        }
        </div>);
};

export default AyogiType;
