import React from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import {
  changeCampusArea,
  getCurrentCampusInfo,
  getPMData,
  getPMDataInit
} from './campus-display-actions';
import CompusDisplayMain from './campus-display-main';
import Spinner from '../spinner/spinner';
import style from './campus-display-style';
import { localTimeToTaiwanTime } from '../../services/time';

class CampusDisplay extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const IconComponent = Ionicons;
      return (
        focused
          ? <IconComponent name="ios-water" size={25} color={tintColor} />
          : null
      );
    },
  });

  constructor(props) {
    super(props);
    const { routeName } = this.props.navigation.state;
    const index = parseInt(routeName.substr(-1), 10);
    console.log(`constructor with ${index}`);
    this.state = {
      index,
      time: localTimeToTaiwanTime()
    };
  }

  // only called once, this component will stay
  componentDidMount() {
    console.log(`componentDidMount with ${this.state.index}`);
    // Get data when user enter the page
    this.props.getPMDataInit(this.state.index);
    // Fire this function every minute for updating time
    // Also fetch the newest data on specific minute
    // const timerId = setInterval(() => {
    //   this.setState({ time: localTimeToTaiwanTime() }, () => {
    //     const minute = this.state.time.getUTCMinutes();
    //     if (minute === 0 || minute !== 30) {
    //       this.props.getPMData(this.state.index);
    //       console.log('it is about time');
    //     }
    //   });
    // }, 60 * 1000);
    console.log(this.state.time.getUTCSeconds());
    setTimeout(this.updateData, 60 - this.state.time.getUTCSeconds());
    // Store the interval id
    // this.setState({ timerId });
  }

  componentDidUpdate() {
    // console.log(prevProps);
    // console.log('this is current Props');
    // console.log(this.props);
  }

  componentWillUnmount() {
    console.log(`componentWillOnMount with ${this.state.index}`);
    // Clean up when unmounted
    // clearInterval(this.state.timerId);
  }

  updateData = () => {
    this.setState({ time: localTimeToTaiwanTime() }, () => {
      const minute = this.state.time.getUTCMinutes();
      if (minute === 0 || minute !== 30) {
        this.props.getPMData(this.state.index);
        console.log('it is about time');
      }
      // Refire this function after one minute
      setTimeout(this.updateData, 60 * 1000);
    });
  }

  handleCampusAreaChange = () => {
    console.log('about to go in to changeCampusArea');
    // set the selectedCampusArea to current campus
    this.props.changeCampusArea(this.state.index);
    console.log('leaving changeCampusArea');
    // dispatch the fetching
    // if this.props.selectedCampus.id is used here instead of this.state.index
    // there will be an error, since redux is not updating the store syncly
    // https://stackoverflow.com/questions/51247040/redux-does-not-update-state-immediately
  }

  render() {
    return (
      <View style={style.campusDisplay}>
        <NavigationEvents
          onWillFocus={this.handleCampusAreaChange}
        />
        {
          this.props.campusInfo[this.props.selectedCampus.id].isFetching
            ? <Spinner />
            : <CompusDisplayMain curTime={this.state.time} />
        }
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
    getPMDataInit,
    getPMData
  }
)(CampusDisplay);
