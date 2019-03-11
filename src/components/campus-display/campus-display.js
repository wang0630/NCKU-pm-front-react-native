import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

export default class CampusDisplay extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const IconComponent = Ionicons;
      return (
        focused
          ? <IconComponent name="ios-water" size={25} color={tintColor} />
          : null
      );
    }
  }

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    console.log(this.props.navigation.isFocused());
    return (
      <View>
        <Text> 
          { `${this.props.navigation}` }
        </Text>
      </View>
    );
  }
}
