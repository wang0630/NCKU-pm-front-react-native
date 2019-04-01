import React from 'react';
import { connect } from 'react-redux';
// import { View } from 'react-native';
import {
  changeCampusArea,
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
    console.log(`constructor with ${index}`);
    this.state = {
      index,
      mountedTime: localTimeToTaiwanTime(),
      didTimeoutFired: false,
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
    if (prevProps.campusInfo.isFetching
      && !this.props.campusInfo.isFetching) {
      const minute = this.state.mountedTime.getUTCMinutes();
      const nextTime = minute < 30 ? 30 - minute : 60 - minute;
      const timerId = setTimeout(this.updateData, nextTime * 60 * 1000);
      this.setState({ timerId });
    }
  }

  componentWillUnmount() {
    console.log(`componentWillOnMount with ${this.state.index}`);
    // Clean up when unmounted
    if (this.state.didTimeoutFired) {
      clearInterval(this.state.timerId);
    } else {
      clearTimeout(this.state.timerId);
    }
  }

  updateData = () => {
    this.props.getPMData(this.state.index);
    console.log('it is about time');
    // Refire this function after a half hour
    if (!this.state.didTimeoutFired) {
      const timerId = setInterval(this.updateData, 30 * 60 * 1000);
      this.setState({
        timerId,
        didTimeoutFired: true
      });
    }
  }

  render() {
    const thing = this.props.campusInfo.isFetching
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

// mapsStateToProps
// get the whole state tree and return what component needs
// can access by this.props.campusInfo for example
export const getCurrentCampusInfo = (state, ownProps) => {
  const { routeName } = ownProps.navigation.state;
  const index = parseInt(routeName.substr(-1), 10);
  return {
    campusInfo: state.campusInfo[index]
  };
};

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
