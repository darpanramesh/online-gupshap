import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import AppNavigator from './src/Config/Navigation/AppNavigation'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
    <AppNavigator />
    // <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
    // style={{width: 400, height: 400}} />
  );
}
}

