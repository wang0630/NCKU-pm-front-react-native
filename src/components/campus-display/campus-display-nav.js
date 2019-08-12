import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CampusDisplay from './campus-display';
import campusNames from '../../constants/campus-names';

const campusLists = campusNames.map((item, index) => ({
  [`area-${index}`]: {
    screen: CampusDisplay,
    // This option is used in TabNavigator
    // Navigator behavior is only controlled by its screens
    navigationOptions: {
      tabBarLabel: item,
      tabBarIcon: ({ focused, tintColor }) => {
        const IconComponent = Ionicons;
        return (
          focused
            ? <IconComponent name="ios-water" size={25} color={tintColor} />
            : null
        );
      },
      // tabBarOnPress({ navigation, defaultHandler }) {
      //   const { routeName } = navigation.state;
      //   const campusId = parseInt(routeName.substr(-1), 10);
      //   navigation.setParams({ campusId });
      //   // perform your logic here
      //   // this is mandatory to perform the actual switch
      //   // don't call this if you want to prevent focus
      //   defaultHandler();
      // }
    }
  }
}));

const campusListsObj = Object.assign({}, ...campusLists);
const campusTabConfigs = {
  swipeEnabled: true
};

const CampusDisplayNavigator = createBottomTabNavigator(campusListsObj, campusTabConfigs);

// the navigationOptions will be the one which is passed to the homeStack
// because this tabNavigator is the child of the homestack
CampusDisplayNavigator.navigationOptions = ({ navigation }) => ({
  // get the currentactive campusName
  // navigation.state.index is the number of the active tab
  headerTitle: campusNames[navigation.state.index]
});

export default CampusDisplayNavigator;
