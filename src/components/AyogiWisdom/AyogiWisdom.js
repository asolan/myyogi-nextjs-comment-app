import React, { useState, useEffect } from "react";
import AyogiLine from '../AyogiLine/AyogiLine';
import './AyogiWisdom.css';
import { LINE_TYPE_ENUM } from '../../utility/dataTypes';

const AyogiWisdom = props => {
    // console.log('AyogiWisdom');
    // console.log(props);
    const [itemsSelected, setItemsSelected] = useState([]);
    const [itemTags, setItemTags] = useState([]);

    //AMSTODO:REMOVE Are itemtags used here anymore?
    // not used in AyogiLine
    useEffect(() => {
        let itemsSel = {};
        let itemTags = {};
        props.items && props.items.map((c,i) => {
            let {isQuote, tags} = itemQuoteTags(c, props.selectedQuotes);
            itemsSel[c._id] = isQuote;
            itemTags[c._id] = tags;
        });
        setItemsSelected(itemsSel);
        setItemTags(itemTags);
//        console.log(itemTags);
    }, [props.selectedQuotes]);

    const itemQuoteTags = (c, s) => {
        // console.log(s.findIndex(q => 
        //     q.chapter === c.chapterNumber && 
        //     q.line === c.lineNumber 
        // ) > -1);
        let quoteIndex = s && s.findIndex(q => 
            q.chapter === c.chapterNumber && 
            q.startline === c.lineNumber 
        );

        let quoteTags = quoteIndex > -1 ? s[quoteIndex].tags : [];
        return { 
            isQuote: quoteIndex > -1,
            tags: quoteTags};
    };

    return (
        <div className="AyogiWisdom" key={`AyogiWisdom${props.items[0]._id}`}>
            {props.items && props.items.map((c,i) => {
                 return (<AyogiLine 
                    isLineSelected={itemsSelected[c._id]}
                    itemTags={itemTags[c._id]}
                    key={`AyogiWisdomLine-${c._id}`} 
                    c={c} 
                    i={i} 
                    type={LINE_TYPE_ENUM.WISDOM}
                    {...props}>
                </AyogiLine>)
                })
            }
        </div>
    )
}

export default AyogiWisdom;