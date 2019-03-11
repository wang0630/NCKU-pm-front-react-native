import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const HeaderText = ({ children, fontColor, fontSize }) => {
  const style = StyleSheet.create({
    header: {
      color: fontColor,
      fontWeight: 'bold',
      fontSize: fontSize || 30,
    }
  });

  return (
    <Text style={style.header}>
      { children }
    </Text>
  );
};

export const NormalText = ({ children, fontColor, fontSize }) => {
  const style = StyleSheet.create({
    text: {
      color: fontColor,
      fontWeight: 'bold',
      fontSize: fontSize || 15,
    }
  });

  return (
    <Text style={style.text}>
      { children}
    </Text>
  );
};
