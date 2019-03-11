import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import style from './home-menu-style';
import { HeaderText, NormalText } from '../text/text';

const HomeMenu = ({ navigation }) => (
  <View style={style.home}>
    <View>
      <HeaderText fontColor="white" fontSize={40}> 成大空氣品質App </HeaderText>
    </View>
    <View style={style.buttonGroup}>
      <TouchableOpacity
        style={style.button}
        onPress={() => { navigation.navigate('CampusDisplay'); }}
      >
        <NormalText fontColor="white"> 即時觀看數據 </NormalText>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.button}
        onPress={() => {
          console.log('cool');
        }}
      >
        <NormalText fontColor="white"> 空氣品質預測 </NormalText>
      </TouchableOpacity>
    </View>
  </View>
);
export default HomeMenu;
