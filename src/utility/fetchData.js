//import * as React from 'react';
import axios from 'axios';

const fetchAYChapterList = () => {
    return axios
      .get('http://localhost:3100/ayogi')
      .then(r => {
        // console.log('fetchAYChapterList');
        // console.log(r.data.slice(0));
        return r.data.slice(0);
      })
      .catch(err => {
        //        this.props.onError('Loading chapter list failed. Please try again later');
        console.log(err);
 //       [];
      });
  }

  const fetchAYChapterText = () => {
    return axios
      //    .get('http://localhost:3100/ayogi/create')
      .get('http://localhost:3100/ayogi/chapters')
      .then(r => {
        // console.log('fetchAYChapterText');
        // console.log(r.data);
        return r.data;
      })
      .catch(err => {
        //      this.props.onError('Loading chapter text failed. Please try again later');
        console.log(err);
//        [];
      });
  };

  const fetchAYDataOfType = (type) => {
    console.log(`fetchAYDataOfType:${type}`);
    let params = {params: {type: type}};

    return axios
      //    .get('http://localhost:3100/ayogi/create')
      .get('http://localhost:3100/ayogi/type', params)
      .then(r => {
        // console.log(`type:${type}`);
        // console.log(r.data);
        return r.data;
      })
      .catch(err => {
        console.log(`fetchDataTypeErr:${err}`);
        //      this.props.onError('Loading chapter text failed. Please try again later');
        console.log(err);
//        [];
      });
  };



export { fetchAYChapterList, fetchAYChapterText, fetchAYDataOfType };
