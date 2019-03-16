import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeMenu from './src/components/home-menu/home-menu';
import CampusDisplayNavigator from './src/components/campus-display/campus-display-nav';
import store from './src/redux/store';
import colorSet from './src/style/color-set';

// Every router should be passed a 'navigation' object
const AppNavigator = createStackNavigator(
  {
    HomeMenu: {
      screen: HomeMenu,
      navigationOptions: {
        headerBackTitle: null
      }
    },
    CampusDisplay: {
      screen: CampusDisplayNavigator
    }
  },
  {
    initialRouteName: 'HomeMenu',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colorSet['color-brown']
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
