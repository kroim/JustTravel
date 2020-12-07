/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/navigation';
import {SafeAreaProvider} from "react-native-safe-area-context";
import store from './src/redux/store';

class App extends Component {
  render(): * {
    return (
        <Provider store={store}>
          <SafeAreaProvider>
            <AppNavigator/>
          </SafeAreaProvider>
        </Provider>
    )
  }
}
export default App;
