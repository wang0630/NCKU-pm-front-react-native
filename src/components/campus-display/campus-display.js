import React from 'react';
import { connect } from 'react-redux';
// import { View } from 'react-native';
import {
  changeCampusArea,
  getCurrentCampusInfo,
  getPMData,
  getPMDataInit
} from './campus-display-actions';
import CompusDisplayMain from './campus-display-main';
import Spinner from '../spinner/spinner';
import { localTimeToTaiwanTime } from '../../services/time';

class CampusDisplay extends React.Component {
  /*
    This navigationOptions can overwirte the navigationOptions in the
   `campus-display-nav
    static navigationOptions = ({ navigation }) => {
      .....
    };
  */
  constructor(props) {
    super(props);
    const { routeName } = this.props.navigation.state;
    const index = parseInt(routeName.substr(-1), 10);
    console.log(this.props.navigation.state);
    console.log(`constructor with ${index}`);
    this.state = {
      index,
      mountedTime: localTimeToTaiwanTime(),
    };
  }

  // only called once, this component will stay
  componentDidMount() {
    console.log(`componentDidMount with ${this.state.index}`);
    // Get data when user enter the page
    this.props.getPMDataInit(this.state.index);
  }

  componentDidUpdate(prevProps) {
    // After the init, setInterval for the updating
    if (prevProps.campusInfo[this.state.index].isFetching
      && !this.props.campusInfo[this.state.index].isFetching) {
      const minute = this.state.mountedTime.getUTCMinutes();
      const nextTime = minute < 30 ? 30 - minute : 60 - minute;
      setTimeout(this.updateData, nextTime * 60 * 1000);
    }
  }

  componentWillUnmount() {
    console.log(`componentWillOnMount with ${this.state.index}`);
    // Clean up when unmounted
    clearInterval(this.state.timerId);
  }

  updateData = () => {
    this.props.getPMData(this.state.index);
    console.log('it is about time');
    // Refire this function after one minute
    const timerId = setInterval(this.updateData, 30 * 60 * 1000);
    this.setState({ timerId });
  }

  render() {
    const thing = this.props.campusInfo[this.state.index].isFetching
      ? <Spinner />
      : (
        <CompusDisplayMain
          index={this.state.index}
          // curTime={this.state.time}
        />
      );
    return thing;
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
