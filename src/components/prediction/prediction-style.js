import { StyleSheet } from 'react-native';
import colorSet from '../../style/color-set';

const style = StyleSheet.create({
  prediction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colorSet['color-skin']
  },
  textGroup: {
    height: '20%',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  picker: {
    height: 100,
    width: '70%'
  },
  pickerItem: {
    color: colorSet['color-red']
  }
});

export default style;
