import React from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import {
  changeCampusArea,
  getCurrentCampusInfo,
  getPMData
} from './campus-display-actions';
import Spinner from '../spinner/spinner';
import style from './campus-display-style';

class CampusDisplay extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const IconComponent = Ionicons;
      return (
        focused
          ? <IconComponent name="ios-water" size={25} color={tintColor} />
          : null
      );
    }
  });

  // only called once, this component will stay
  componentDidMount() {
    // console.log('Mount');
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    // console.log('this is current Props');
    // console.log(this.props);
  }

  componentWillUnmount() {
    // console.log('Unmount');
  }

  handleCampusAreaChange = (payload) => {
    // change the index
    const { routeName } = payload.state;
    const index = parseInt(routeName.substr(-1), 10);
    this.props.changeCampusArea(index);

    // dispatch the fetching
    this.props.getPMData();
  }

  render() {
    return (
      <View style={style.campusDisplay}>
        <NavigationEvents
          onWillFocus={this.handleCampusAreaChange}
        />
        {
          this.props.PMData.isFetching
            ? (
              <Spinner />
            )
            : (
              <Text>
                { `You are in ${this.props.campusIndex}` }
              </Text>
            )
        }
        {/* {
          this.props.PMData.data
            ? (
              <Text style={{ color: 'yellow' }}>
                { this.props.PMData.data.title }
              </Text>
            )
            : null
        } */}
      </View>
    );
  }
}

// connect will bind action creator to the dispatch
// so we can call this.props.action_creator() to dispatch
export default connect(
  getCurrentCampusInfo,
  {
    changeCampusArea,
    getPMData
  }
)(CampusDisplay);
