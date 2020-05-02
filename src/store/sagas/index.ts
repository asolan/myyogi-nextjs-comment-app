import userData from './userData';

export default function * rootSaga() {
  yield [
    ...userData
  ];
}
