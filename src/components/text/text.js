import React from 'react';
import { Text } from 'react-native';
import { material, human, systemWeights } from 'react-native-typography';

export const HeaderText = ({ children, option }) => (
  <Text style={{
    ...human.largeTitleObject,
    ...systemWeights.bold,
    ...option,
  }}
  >
    { children }
  </Text>
);

export const NormalText = ({ children, fontColor, option }) => (
  <Text style={{
    ...material.body2Object,
    color: fontColor || null,
    ...option
  }}
  >
    { children}
  </Text>
);

export const NormalTextLight = ({ children }) => (
  <Text style={{
    ...material.body2Object,
    ...systemWeights.light,
  }}
  >
    { children }
  </Text>
);
