import { StyleSheet } from 'react-native';
import colorSet from '../../style/color-set';

const style = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorSet['color-skin'],
  },
  lightLine: {
    height: 2,
    width: 100,
    marginTop: -20,
    backgroundColor: 'silver'
  },
  titleGroup: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonGroup: {
    width: '60%',
  },
  button: {
    width: '100%',
    padding: 17,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colorSet['color-red'],
    borderRadius: 17,
  },
});
export default style;
