import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  getCurrentCampusInfo,
  getPMData,
} from './campus-display-actions';
import style from './campus-display-style';
import RefreshButton from '../button/refresh-button';

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
        {
          this.props.campusInfo[this.props.selectedCampus.id].isValidate
            ? null
            : <RefreshButton refresh={this.refresh} />
        }
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
