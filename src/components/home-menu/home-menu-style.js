import { StyleSheet } from 'react-native';
import colorSet from '../../style/color-set';

const style = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorSet['color-dark-blue'],
  },
  buttonGroup: {
    width: '60%',
  },
  button: {
    width: '100%',
    padding: 17,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 17,
    backgroundColor: '#8A2BE2'
  },
});
export default style;
