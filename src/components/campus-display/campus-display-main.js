import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import {
  getPMData,
} from './campus-display-actions';
import Chart from './campus-display-chart';
import style from './campus-display-style';

class CampusDisplayMain extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      // console.log('enter');
      // console.log(this.props.pmData[0].humidityList);
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={style.campusDisplayMain}>
        {/* \u03BC is mu, \xB3 is cube */}
        {/* pointerEvents to none to prevent chart from touch event */}
        {/* So the chart can be scrolled in ScrollView */}
        <View pointerEvents="none">
          <Chart
            target="pm25"
            targetList={this.props.pm25List}
            text="PM2.5 density in past six hours"
            valueArray={_.range(0, 201, 20)}
            tickFormat={y => `${y}\n\u03BCg/m\xB3`}
            domain={[0, 200]}
          />
          <Chart
            target="temp"
            targetList={this.props.tempList}
            text="Temperature in past six hours"
            valueArray={_.range(0, 51, 5)}
            tickFormat={y => `${y}\xB0C`}
            domain={[0, 50]}
          />
          <Chart
            target="humidity"
            targetList={this.props.humidityList}
            text="Humidity in past six hours"
            valueArray={_.range(0, 101, 10)}
            tickFormat={y => `${y}%`}
            domain={[0, 100]}
          />
        </View>
      </ScrollView>
    );
  }
}

/*
  Get only its own campus data to prevent re-rendering
  means only re-render when its own campus data actually change
*/
const getPartialPMData = (state, ownProps) => {
  const { index } = ownProps;
  const { pmData } = state;
  // console.log(pmData[index]);
  return pmData[index];
};

export default connect(
  getPartialPMData,
  {
    getPMData
  }
)(CampusDisplayMain);
