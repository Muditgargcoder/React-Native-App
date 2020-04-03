import React,{Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator} from 'react-navigation'; 
import LoginScreen from './screens/LoginScreen';
import DrawerNavigator from './screens/DrawerNavigator';
import SignUp from './screens/SignUp'
import {ActivityIndicator, StatusBar , AsyncStorage} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const navigator = createStackNavigator(
  {
    DrewerNav:{screen:DrawerNavigator,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      }},
    
    // Home:{screen:HomeScreen},
    SignUp:{screen:SignUp,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      } 
    },
    Login :{screen:LoginScreen,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      } 
    },
    
  },
  
  
);
//export default navigator;

const AuthStack = createStackNavigator(
  {
    Login :{screen:LoginScreen,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      } 
    },
    SignUp:{screen:SignUp,
      navigationOptions: {
        title: 'Home',
        header: null //this will hide the header
      } 
    },
  },
  {
    defaultNavigationOptions:{
    headerMode: 'none',
    gesturesEnabled: false,}

  }
  );

class AuthLoadingScreen extends Component
{
  constructor(props)
  {
    super(props);
    this._loadData();
  }

  render(){
    return(
      <View>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
        </View>
    );
  }
  _loadData = async() => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !== '1'? 'Auth' : 'App');
  }
}

export default 
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: navigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      headerMode: 'none',
      navigationOptions: {
      headerVisible: false,
  }
    }
  )
;

