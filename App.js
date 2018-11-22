/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
// import { Button , Icon, Form} from 'native-base';
// import { StackNavigator, Tabbar } from 'react-navigation';
import BaseNavigationView from './src/BaseView/BaseNavigationView';



export default class App extends Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Button>
      //     <Text style={{flex: 1, alignItems: "center", justifyContent: "center"}}>Button</Text>
      //   </Button>
      // </View>

      <BaseNavigationView/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];
console.disableYellowBox = true // 关闭全部黄色警告