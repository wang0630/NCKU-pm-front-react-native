import React from 'react';
import { Text } from 'react-native';
import { material, human, systemWeights } from 'react-native-typography';

export const HeaderText = ({ children }) => (
  <Text style={{
    ...human.largeTitleObject,
    ...systemWeights.bold
  }}
  >
    { children }
  </Text>
);

export const NormalText = ({ children, fontColor }) => (
  <Text style={{
    ...material.body2Object,
    color: fontColor || null
  }}
  >
    { children}
  </Text>
);
