import React from 'react';
import AyogiLine from '../AyogiLine/AyogiLine';
import './AyogiWisdom.css';
import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';

const AyogiWisdom = props => {
    // console.log('AyogiWisdom');
    // console.log(props);
    return (
        <div className="AyogiWisdom">
            {props.items && props.items.map((c,i) => {
            return <AyogiLine 
                        key={c._id} 
                        c={c} 
                        i={i} 
                        type={LINE_TYPE_ENUM.WISDOM}
                        {...props}>
                    </AyogiLine>
                })
            }
        </div>
    )

}

export default AyogiWisdom;