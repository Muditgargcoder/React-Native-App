
import { createStackNavigator } from 'react-navigation';
import Profile from './profile/Profile';
import LoginScreen from './LoginScreen';
import SignUp from './SignUp'
import {Header,Icon} from 'native-base'
import React,{Component} from 'react';

 navigationOptions = {
  drawerIcon:({ tintColor }) => (
      <Icon name="profile" style={{fontSize:24, color:tintColor}}/>
  )

}

const SignOutNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
        title: 'Profile',
        header: null //this will hide the header
      } 
  },
  Login: {
    screen: LoginScreen,
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
  initialRouteName:'Profile',
  defaultNavigationOptions:{
    headerStyle:{height : 10 , backgroundColor:'orange'},
  }
}
);

export default SignOutNavigator;