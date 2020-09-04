import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import DefaultScreen from './DefaultScreen';
import CientificScreen from './CientificScreen';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends Component {
  render() {
    return (
      <AppDrawerNavigator style={{ backgroundColor: '#404040' }}/>
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1, backgroundColor: '#404040'}}>
    <ScrollView>
      <DrawerItems {...props} style={{color: 'white'}}/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Default: DefaultScreen,
  Cientific: CientificScreen
},{
  contentComponent: CustomDrawerComponent
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#404040'
  },

  historyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    justifyContent: 'space-between'
  },

  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#404040'
  },

  numberContainer: {
    flex: 4,
    backgroundColor: '#202020'
  },

  inputContainer: {
    flex: 8,
    backgroundColor: '#202020'
  },

  resultText: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    textAlign: 'right',
  },

  historyText: {
    color: 'white',
    fontSize: 30,
    padding: 5,
    textAlign: 'right',
  },

  inputRow: {
    flex: 1,
    flexDirection: 'row',
  }
});
