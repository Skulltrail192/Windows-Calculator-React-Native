import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import StandardScreen from './StandardScreen';
import CientificScreen from './CientificScreen';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Left, Icon as NativeIcon } from 'native-base';

export default class App extends Component {
  render() {
    return (
      // <UWPThemeProvider
      //   theme={getTheme({
      //     themeName: "dark", // set custom theme
      //     accent: "#0078D7", // set accent color
      //     useFluentDesign: true, // sure you want use new fluent design.
      //     desktopBackgroundImage: "http://127.0.0.1:8092/staticimages/jennifer-bailey-10753.jpg" // set global desktop background image
      //   })}
      // >
      //   <AppDrawerNavigator style={{ backgroundColor: '#202020' }} />
      // </UWPThemeProvider>
      <AppDrawerNavigator style={{ backgroundColor: '#202020' }} />
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#202020' }}>
    <ScrollView>
      <Left style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
        <NativeIcon name='menu' onPress={() =>
          this.props.navigation.openDrawer()} style={{ marginLeft: 10, color: 'white', paddingTop: 15 }} />
      </Left>
      <Text style={{ fontSize: 15, color: 'white', padding: 10, left: 20, marginTop: 20 }}>Calculator</Text>
      <DrawerItems {...props} />
      <Text style={{ fontSize: 15, color: 'white', padding: 10, left: 20 }}>Conversor</Text>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Standard: {
    screen: StandardScreen,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="calculator" style={{ fontSize: 24, color: tintColor }} />
      )
    }
  },
  Cientific: {
    screen: CientificScreen,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon name="flask" style={{ fontSize: 24, color: tintColor }} />
      )
    }
  }
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white'
  }
});

const styles = StyleSheet.create({
});