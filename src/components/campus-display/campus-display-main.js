import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  getCurrentCampusInfo,
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

  getTickValue = (dataType, dataField) => {

  }

  render() {
    const hour = this.props.curTime.getUTCHours();
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={style.campusDisplayMain}>
        <Text>
          { `現在時間：${hour}:${this.props.curTime.getUTCMinutes()}` }
        </Text>
        {/* \u03BC is mu, \xB3 is cube */}
        <Chart
          target="pm25"
          targetList={this.props.pmData[this.props.index].pm25List}
          text="PM2.5 density in past six hours"
          valueArray={[20, 30, 40, 50, 60, 70, 80]}
          tickFormat={y => `${y}\n\u03BCg/m\xB3`}
        />
        <Chart
          target="temp"
          targetList={this.props.pmData[this.props.index].tempList}
          text="Temperature in past six hours"
          valueArray={[20, 30, 40, 50, 60, 70, 80]}
          tickFormat={y => `${y}\xB0C`}
        />
        <Text> aasasas </Text>
        <Text> aasasas </Text>
        <Text> aasasas </Text>
        <Text> aasasas </Text>
        <Text> aasasas </Text>
        {/* <Chart
          target="humidity"
          targetList={this.props.pmData[this.props.index].humidityList}
          text="Humidity in past six hours"
          valueArray={[20, 30, 40, 50, 60, 70, 80]}
          tickFormat={y => `${y}%`}
        /> */}
      </ScrollView>
    );
  }
}

export default connect(
  getCurrentCampusInfo,
  {
    getPMData
  }
)(CampusDisplayMain);
