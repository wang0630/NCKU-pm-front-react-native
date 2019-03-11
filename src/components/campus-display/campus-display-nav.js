import { createBottomTabNavigator } from 'react-navigation';
import CampusDisplay from './campus-display';
import campusNames from '../../constants/campus-names';

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
export default CampusDisplayNavigator;
