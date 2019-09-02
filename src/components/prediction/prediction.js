import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Picker } from 'react-native';
import { getPMDataInit } from '../campus-display/campus-display-actions';
import { HeaderText, NormalText } from '../text/text';
import Spinner from '../spinner/spinner';
import campusNames from '../../constants/campus-names';
import style from './prediction-style';

const returnFormula = (pm25, pm25P1, h, ws, rain, intercept) => (
  1.0634 * pm25 + 0.023 * h + 0.052 * ws + 0.0025 * rain + 0.144 * pm25P1 + 0.0081 * intercept
);

const Prediction = (props) => {
  const [prediction, setPrediction] = useState(0);
  const [selected, setSelected] = useState(0);
  // const [rain, setRain] = useState(0);
  // const [ws, setws] = useState(0);

  // Fire the api when mounting
  useEffect(() => {
    // Initialize the data
    campusNames.forEach((name, index) => {
      props.getPMDataInit(index);
    });
  }, []);

  // Get rain data and ws from Weather Bureau
  useEffect(() => {

  });

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
    // Round to the first digit
    setPrediction(Math.round(returnFormula(pm25, pm25P1, humidity, 40, 10, 0.08) * 10) / 10);
  }, [selected, props.pmData]);

  const thing = props.campusInfo.isFetching
    ? <Spinner />
    : (
      <View
        style={style.prediction}
      >
        <View style={style.textGroup}>
          <HeaderText option={{ fontSize: 30 }}> 下個小時的pm2.5濃度為： </HeaderText>
          <NormalText
            option={{ fontSize: 20 }}
          >
            { `${prediction} \u03BCg/m\xB3` }
          </NormalText>
        </View>
        <Picker
          selectedValue={selected}
          onValueChange={itemValue => setSelected(itemValue)}
          style={style.picker}
          itemStyle={style.pickerItem}
        >
          {
            campusNames.map((name, index) => <Picker.Item label={name} value={index} key={name} />)
          }
        </Picker>
      </View>
    );

  return thing;
};

// mapsStateToProps
// get the whole state tree and return what component needs
// can access by this.props.campusInfo for example
const getData = state => ({
  pmData: state.pmData,
  campusInfo: state.campusInfo[0],
});

export default connect(
  getData,
  {
    getPMDataInit
  }
)(Prediction);
