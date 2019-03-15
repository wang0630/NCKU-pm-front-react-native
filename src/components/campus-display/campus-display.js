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

  constructor(props) {
    super(props);
    const { routeName } = this.props.navigation.state;
    const index = parseInt(routeName.substr(-1), 10);
    console.log(`constructor with ${index}`);
    this.state = {
      index
    };
  }

  // only called once, this component will stay
  componentDidMount() {
    // console.log('Mount');
    console.log(`componentDidMount with ${this.state.index}`);
  }

  componentDidUpdate() {
    // console.log(prevProps);
    // console.log('this is current Props');
    // console.log(this.props);
  }

  componentWillUnmount() {
    // console.log('Unmount');
    console.log(`componentWillOnMount with ${this.state.index}`);
  }

  handleCampusAreaChange = () => {
    console.log('about to go in to changeCampusArea');
    // set the selectedCampusArea to current campus
    this.props.changeCampusArea(this.state.index);
    console.log('about to go in to getPMData');
    // dispatch the fetching
    this.props.getPMData(this.state.index);
  }

  render() {
    console.log('inside render');
    return (
      <View style={style.campusDisplay}>
        <NavigationEvents
          onWillFocus={this.handleCampusAreaChange}
        />
        {
          this.props.campusInfo[this.props.selectedCampus.id].isFetching
            ? (
              <Spinner />
            )
            : (
              <Text>
                { `You are in ${this.props.selectedCampus.name}` }
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
