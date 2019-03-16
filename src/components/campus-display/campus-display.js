import React from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import {
  changeCampusArea,
  getCurrentCampusInfo,
  getPMData,
  setInvalidate
} from './campus-display-actions';
import CompusDisplayMain from './campus-display-main';
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
    },
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
    // data should be update after 5 minutes!
    const setInvalidateId = setInterval(
      this.props.setInvalidate.bind(null, this.state.index),
      5000
    );
    this.setState({ setInvalidateId });
  }

  componentDidUpdate() {
    // console.log(prevProps);
    // console.log('this is current Props');
    // console.log(this.props);
  }

  componentWillUnmount() {
    console.log(`componentWillOnMount with ${this.state.index}`);
    clearInterval(this.state.setInvalidateId);
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

    // use componenetDidUpdate to get the new value
    this.props.getPMData(this.state.index);
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
            : <CompusDisplayMain />
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
    setInvalidate,
    getPMData
  }
)(CampusDisplay);
