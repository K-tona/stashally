import React from 'react';
import AppNavigator from './navigator/AppNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  console.disableYellowBox = true;

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
