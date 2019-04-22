import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../src/features/rejection/rejection-sagas';
import rejection from '../src/features/rejection/rejection-reducer';

const makeStore = (initialState = [], options) => {
  const saga = createSagaMiddleware();
  const store = createStore(rejection, initialState, applyMiddleware(saga));
  saga.run(rootSaga);

  return store;
};

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }

}

export default withRedux(makeStore)(MyApp);
