import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import style from './home-menu-style';
import { HeaderText, NormalText, NormalTextLight } from '../text/text';
import colorSet from '../../style/color-set';

const HomeMenu = ({ navigation }) => (
  <View style={style.home}>
    <StatusBar barStyle="light-content" />
    <View style={style.titleGroup}>
      <HeaderText> 成大空污雷達 </HeaderText>
      <View style={style.lightLine} />
      <NormalTextLight> Developed by Biomedical Imaging Laboratory </NormalTextLight>
    </View>
    <View style={style.buttonGroup}>
      <TouchableOpacity
        style={style.button}
        onPress={() => { navigation.navigate('CampusDisplay'); }}
      >
        <NormalText fontColor={colorSet['color-red']}> 即時觀看數據 </NormalText>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.button}
        onPress={() => { navigation.navigate('Prediction'); }}
      >
        <NormalText fontColor={colorSet['color-red']}> 空氣品質預測 </NormalText>
      </TouchableOpacity>
    </View>
  </View>
);
export default HomeMenu;
