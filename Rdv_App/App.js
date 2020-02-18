/*import React from 'react';
import { StyleSheet, Text,Image, View, SafeAreaView,ScrollView,Dimensions } from 'react-native';
import {createDrawerNavigator, DrawerItems , StackNaigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import LocationsScreen from './screens/Locations'
import EventsScreen from './screens/Events'
import LoginScreen from './screens/LoginScreen'
import SignUp from './screens/SignUp'


const {width} = Dimensions.get('window');


const App =() => {
    return(
    <AppDrawerNavigator/>)
};

export default App;

const CustomDrawerComponent = (props)=>(
  <SafeAreaView style={{flex:1}}>
   <View style={styles.container}>
      <Image source={require('./assets/download.png')} style={{height:200,width:200,marginTop:20}}/>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({

Settings:SettingsScreen,
Login:LoginScreen,
Events:EventsScreen,
Locations:LocationsScreen,
Home:HomeScreen,
SignUp:SignUp

},{
  contentComponent : CustomDrawerComponent,
  drawerWidth:width*65/100,
  contentOptions: {
    activeTintColor:'orange'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
    
    
  },
});  */

//--------------------------

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

