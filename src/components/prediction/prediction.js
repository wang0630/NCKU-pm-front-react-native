import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Picker } from 'react-native';
import axios from 'axios';
import { getPMDataInit } from '../campus-display/campus-display-actions';
import { HeaderText, NormalText } from '../text/text';
import Spinner from '../spinner/spinner';
import campusNames from '../../constants/campus-names';
import RETURNMODEL from '../../constants/campus-formula';
import style from './prediction-style';

const returnPrediction = (index, pm25, pm25P1, h, ws, rain) => {
  const model = RETURNMODEL[index];
  return ((model.pm25 * (pm25 - model.m_pm25)) / model.s_pm25
    + (model.h * (h - model.m_h)) / model.s_h
    + (model.ws * (ws - model.m_ws)) / model.s_ws
    + (model.pm25P1 * (pm25P1 - model.m_pm25P1)) / model.s_pm25P1
    + (model.rain * (rain - model.m_rain)) / model.s_rain
    + model.intercept) * model.s + model.m;
};

const Prediction = (props) => {
  const [prediction, setPrediction] = useState(0);
  const [selected, setSelected] = useState(0);
  const [bureauFetch, setbureauFetch] = useState(false);
  const [rain, setRain] = useState(0);
  const [ws, setws] = useState(0);

  // Fire the api when mounting
  useEffect(() => {
    // Initialize the data
    campusNames.forEach((name, index) => {
      props.getPMDataInit(index);
    });
  }, []);

  // Get rain data and ws from Weather Bureau
  useEffect(() => {
    const getRainAndWs = async () => {
      try {
        setbureauFetch(true);
        const res = await Promise.all([
          axios.get(`http://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?authorization=CWB-13E43698-F2E2-45C4-A5B0-A805260E96B7&elementName=WDSD&locationName=${encodeURIComponent('永康')}`),
          axios.get(`http://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?authorization=CWB-13E43698-F2E2-45C4-A5B0-A805260E96B7&elementName=NOW&locationName=${encodeURIComponent('永康')}`)
        ]);
        setws(res[0].data.records.location[0].weatherElement[0].elementValue);
        setRain(res[1].data.records.location[0].weatherElement[0].elementValue);
        setbureauFetch(false);
      } catch (e) {
        console.log(e);
      }
    };

    getRainAndWs();
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
    // Round to the first digit
    setPrediction(Math.round(returnPrediction(selected, pm25, pm25P1, humidity, ws, rain) * 10) / 10);
  }, [ws, rain, selected, props.pmData]);

  const thing = props.campusInfo.isFetching || bureauFetch
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
