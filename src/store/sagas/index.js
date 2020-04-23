import userData from './userData.js';
// console.log('userDatasaga');
// console.log(userData);

export default function * rootSaga() {
  yield [
    ...userData
  ];
}
