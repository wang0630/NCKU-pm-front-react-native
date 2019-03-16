import React from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';
import colorSet from '../../style/color-set';

export class RefreshButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topValue: new Animated.Value(2)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.topValue, {
      toValue: 20,
      easing: Easing.bounce,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <Animated.View style={{
        ...style.container,
        marginTop: this.state.topValue
      }}
      >
        <Icon
          name="refresh"
          type="material"
          size={30}
          onPress={this.props.refresh}
          iconStyle={style.refreshButton}
        />
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    padding: 5,
    borderWidth: 3,
    borderColor: colorSet['color-red'],
    marginRight: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    color: colorSet['color-red'],
  }
});

export default RefreshButton;
