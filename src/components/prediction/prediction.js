import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { getPMDataInit } from '../campus-display/campus-display-actions';
import campusNames from '../../constants/campus-names';

const returnFormula = (pm25, pm25P1, h, ws, rain, intercept) => (
  1.0634 * pm25 + 0.023 * h + 0.052 * ws + 0.0025 * rain + 0.144 * pm25P1 + 0.0081 * intercept
);

const Prediction = (props) => {
  const [prediction, setPrediction] = useState(0);
  const [selected, setSelected] = useState(0);

  // Fire the api when mounting
  useEffect(() => {
    // Initialize the data
    campusNames.forEach((name, index) => {
      props.getPMDataInit(index);
    });
  }, []);

  // Change the display value
  useEffect(() => {
    // Choose the current hour
    const LAST = 11;
    const helper = (list, field, last = LAST) => (
      list.length ? list[last][field] : 0
    );
    const data = props.pmData[selected];
    const humidity = helper(data.humidityList, 'humidity');
    const pm25 = helper(data.pm25List, 'pm25');
    const pm25P1 = helper(data.pm25List, 'pm25', LAST - 2);
    setPrediction(returnFormula(pm25, pm25P1, humidity, 40, 10, 0.08));
  }, [selected, props.pmData]);

  return (
    <View>
      <Picker
        selectedValue={selected}
        onValueChange={itemValue => setSelected(itemValue)}
        style={{ height: 50, width: 100 }}
      >
        {
          campusNames.map((name, index) => <Picker.Item label={name} value={index} key={name} />)
        }
      </Picker>
      <Text>
        { prediction }
      </Text>
    </View>
  );
};

// mapsStateToProps
// get the whole state tree and return what component needs
// can access by this.props.campusInfo for example
const getData = (state) => {
  // console.log(state.pmData[5].humidityList);
  // const LAST = 11;
  // const helper = (list, last = LAST) => (
  //   list.length ? list[last] : 0
  // );
  // return {
  //   humidity: helper(state.pmData[5].humidityList),
  //   temp: helper(state.pmData[5].tempList),
  //   pm25: helper(state.pmData[5].pm25List),
  //   pm25P1: helper(state.pmData[5].pm25List, LAST - 2),
  // };
  // console.log(state.pmData);
  return {
    pmData: state.pmData
  };
};

export default connect(
  getData,
  {
    getPMDataInit
  }
)(Prediction);
