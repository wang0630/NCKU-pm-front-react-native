import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingButton = () => (
  <Icon
    name="ios-settings"
    type="ionicon"
    iconStyle={style.settingButton}
  />
);

const style = StyleSheet.create({
  settingButton: {
    marginRight: 15,
    color: 'white',
  }
});

export default SettingButton;
