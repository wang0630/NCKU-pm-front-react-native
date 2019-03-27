import { createBottomTabNavigator } from 'react-navigation';
import CampusDisplay from './campus-display';
import campusNames from '../../constants/campus-names';
// import SettingButton from '../button/setting-button';

const campusLists = campusNames.map((item, index) => ({
  [`area-${index}`]: {
    screen: CampusDisplay,
    navigationOptions: {
      tabBarLabel: item
    }
  }
}));

const campusListsObj = Object.assign({}, ...campusLists);
const campusTabConfigs = {
  swipeEnabled: true
};

const CampusDisplayNavigator = createBottomTabNavigator(campusListsObj, campusTabConfigs);

// the navigationOptions will be the one which is passed to the homeStack
CampusDisplayNavigator.navigationOptions = ({ navigation }) => {
  console.log('navigator called');
  return {
    // headerRight: (
    //   <SettingButton />
    // ),
    // get the currentactive campusName
    // navigation.state.index is the number of the active tab
    headerTitle: campusNames[navigation.state.index]
  };
};

export default CampusDisplayNavigator;
