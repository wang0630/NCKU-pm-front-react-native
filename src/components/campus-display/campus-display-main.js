import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  getCurrentCampusInfo,
  getPMData,
} from './campus-display-actions';
import style from './campus-display-style';

class CampusDisplayMain extends React.Component {
  constructor(props) {
    super(props);
  }

  refresh = () => {
    this.props.getPMData(this.props.selectedCampus.id);
  }

  render() {
    return (
      <View style={style.campusDisplayMain}>
        <Text>
          { `${this.props.curTime.getUTCHours()}:${this.props.curTime.getUTCMinutes()}` }
        </Text>
      </View>
    );
  }
}

export default connect(
  getCurrentCampusInfo,
  {
    getPMData
  }
)(CampusDisplayMain);
