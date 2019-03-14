import React from 'react';
import {
  Animated,
  View,
} from 'react-native';
import style from './spinner-style';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleY0: new Animated.Value(20),
      scaleY1: new Animated.Value(20),
      scaleY2: new Animated.Value(20),
      scaleY3: new Animated.Value(20),
      scaleY4: new Animated.Value(20),
    };

    this.scaleY = this.scaleYCreator();
  }

  componentDidMount() {
    // start the animation
    this.scaleY.start();
  }

  scaleYCreator = () => {
    const aniList = [];
    for (let i = 0; i < 5; i += 1) {
      // first, every block should have a scaleY animation in sequence
      // to expand and shrink smoothly
      const scaleY = Animated.sequence([
        Animated.timing(this.state[`scaleY${i}`], {
          toValue: 80,
          duration: 400
        }),
        Animated.timing(this.state[`scaleY${i}`], {
          toValue: 20,
          duration: 400
        })
      ]);
      aniList.push(scaleY);
    }
    // Animated.stagger is used for creating trailing effect
    // each animations inside the aniList will be delayed for 100ms = 0.1s
    return Animated.loop(Animated.stagger(100, aniList));
  };

  render() {
    return (
      <View style={style.spinnerContainer}>
        <Animated.View style={{ ...style.spinnerChild, height: this.state.scaleY0 }} />
        <Animated.View style={{ ...style.spinnerChild, height: this.state.scaleY1 }} />
        <Animated.View style={{ ...style.spinnerChild, height: this.state.scaleY2 }} />
        <Animated.View style={{ ...style.spinnerChild, height: this.state.scaleY3 }} />
        <Animated.View style={{ ...style.spinnerChild, height: this.state.scaleY4 }} />
      </View>
    );
  }
}
