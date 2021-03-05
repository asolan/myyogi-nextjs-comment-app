import {watchUser} from './userData';
// // console.log('userDatasaga');
// // console.log(userData);

export default function* rootSaga() {
  yield [
    watchUser
  ];
}
