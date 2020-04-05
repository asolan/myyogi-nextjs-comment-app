let aydata = require('../aydata.json');
let aypoem = require('../aypoem.json');
let ayimage = require('../ayimage.json');

const fetchAYChapterList = () => {
    return aydata;
}

  const fetchAYChapterText = () => {
    return aydata;
  };

  const fetchAYDataOfType = (type) => {
    switch(type){
      case 'POEM':
        return aypoem;
      case 'IMAGE':
        return ayimage;
      }
  };



export { fetchAYChapterList, fetchAYChapterText, fetchAYDataOfType };
