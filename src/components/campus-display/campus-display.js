import React from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import {
  changeCampusArea,
  getCurrentCampusArea,
  getPMData
} from './campus-display-actions';
import style from './campus-display-style';


class CampusDisplay extends React.Component {
  static navigationOptions = () => {
    return ({
      tabBarIcon: ({ focused, tintColor }) => {
        const IconComponent = Ionicons;
        return (
          focused
            ? <IconComponent name="ios-water" size={25} color={tintColor} />
            : null
        );
      },
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      mockdata: 'There is my mockdata',
    };
  }

  // only called once, this component will stay
  componentDidMount() {
    // console.log('Mount');
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
    this.props.getPMData(this.state.mockdata);
  }

  render() {
    return (
      <View style={style.campusDisplay}>
        <NavigationEvents
          onWillFocus={this.handleCampusAreaChange}
        />
        <Text>
          { `You are in ${this.props.campusIndex}` }
        </Text>
      </View>
    );
  }
}

// connect will bind action creator to the dispatch
// so we can call this.props.action_creator() to dispatch
export default connect(
  getCurrentCampusArea,
  {
    changeCampusArea,
    getPMData
  }
)(CampusDisplay);
