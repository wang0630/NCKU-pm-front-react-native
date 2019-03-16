import { StyleSheet } from 'react-native';
import colorSet from '../../style/color-set';

const style = StyleSheet.create({
  spinnerContainer: {
    flex: 1, // 100% of the parent, since it is the only child of the parent
    flexDirection: 'row',
    backgroundColor: colorSet['color-brown'],
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinnerChild: {
    width: 10,
    marginLeft: 8,
    backgroundColor: colorSet['color-skin']
  }
});

export default style;
