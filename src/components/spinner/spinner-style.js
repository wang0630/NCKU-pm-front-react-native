import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  spinnerContainer: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinnerChild: {
    width: 10,
    marginLeft: 8,
    backgroundColor: 'white'
  }
});

export default style;
