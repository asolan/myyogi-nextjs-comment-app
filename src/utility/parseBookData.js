import { LINE_TYPE_ENUM } from '../dataTypes';

export const ParseBookData = (data) => {

    let poemCounter = 0;
    let currentClasses = [];
    let image = [];
    let poem = [];
    let footnote = [];
    let wisdom = [];
    let sectionHtml = [];

    data && data.map((c, i) => {
        addItemToSection(c, i);
    });

    buildHtmlFromSection();

    const addItemToSection = (c, i) => {
        console.log(c.type);
        switch (c.type) {
            case LINE_TYPE_ENUM.WISDOM:

                if(c.footnote && c.footnote.length > 0){
                    footnote.push(c);
                }
                wisdom.push(c);
                break;
            // case LINE_TYPE_ENUM.FOOTNOTE:
            //     footnote.push(c);
            //     break;
            case LINE_TYPE_ENUM.POEM:
                poem.push(c);
                break;
            case LINE_TYPE_ENUM.IMAGE:
                image.push(c);
                break;
        }
    }

    const buildHtmlFromSection = () => {
        return null;
    }


    return [wisdom, footnote, poem, image];

}

export default ParseBookData;
