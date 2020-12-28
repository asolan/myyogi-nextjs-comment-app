import React, { useState, useEffect } from "react";
import AyogiLine from '../AyogiLine/AyogiLine';
import './AyogiWisdom.css';
import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';

const AyogiWisdom = props => {
    // console.log('AyogiWisdom');
    // console.log(props);
    const [itemsSelected, setItemsSelected] = useState([]);

    useEffect(() => {
        let itemsSelected = {};
        props.items && props.items.map((c,i) => {
            itemsSelected[c._id] = itemIsQuote(c, props.selectedQuotes);
        });
        setItemsSelected(itemsSelected);
    }, [props.selectedQuotes]);

    const itemIsQuote = (c, s) => {
        // console.log(s.findIndex(q => 
        //     q.chapter === c.chapterNumber && 
        //     q.line === c.lineNumber 
        // ) > -1);

        return s && s.findIndex(q => 
            q.chapter === c.chapterNumber && 
            q.line === c.lineNumber 
        ) > -1;
    };

    return (
        <div className="AyogiWisdom">
            {props.items && props.items.map((c,i) => {
                 return (<AyogiLine 
                    isLineSelected={itemsSelected[c._id]}
                    key={c._id} 
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