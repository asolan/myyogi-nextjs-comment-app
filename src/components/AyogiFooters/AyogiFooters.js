import React from 'react';
import {parseFootnote} from '../../utility/parseUtility';

//import Button from '../../Button/Button';

//import classes from './AyogiFooters.css';
import './AyogiFooters.css';
//import {useTraceUpdate} from '../../utility/helpUtility';

const AyogiFooters = props => {
    // console.log('AyogiFooters');
    // console.log(props);
//    useTraceUpdate(props);

    if(props.currentChapterText.length === 0){
        return null;
    }

    // console.dir('AyogiFooters');
    // console.dir(props.currentChapterText);
    const footers =
        props.currentChapterText &&
        props.currentChapterText.reduce((acc1, b) => {
            // console.log(a);
            // console.log(b);
            const theseFnotes = b.props.items.reduce((acc2, c) => {
                if(c.footnote && c.footnote.length > 0) {
                    acc2.push(parseFootnote(c, true,'b', ''));
                }
                return acc2;
            }, []);
            return acc1.concat(theseFnotes);
        }, []);

        // console.log('footers');
        // console.log(footers);

    return (
        <div className="AyogiFooters">
            <hr/>
            <ol>
                {footers}
            </ol>
            <hr/>
        </div>
    )
}

export default AyogiFooters;