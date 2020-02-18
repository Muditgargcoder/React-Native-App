import React,{Component} from 'react';
import { StyleSheet, Text,Image, View, SafeAreaView,ScrollView,Dimensions } from 'react-native';
import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'
import SignOutNavigator from './SignOutNavigator'
import Map from './eventscreens/Map'
import EventsScreen from './EventsScreen'



const {width} = Dimensions.get('window');


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
Events:EventsScreen,
Profile:SignOutNavigator,
Locations:Map,


},{
  contentComponent : CustomDrawerComponent,
  drawerWidth:width*65/100,
  contentOptions: {
    activeTintColor:'orange'
  }
},
{
navigationOptions : ({navigation}) => {
  return {
      headerLeft: (
        <Icon name="md-menu" style={{ marginLeft: 10 }} 
        onPress={() => navigation.toggleDrawer()}
        />
      )
    }
  }
  });



export default class DrawerNavigator extends Component {
  render(){
    return <AppDrawerNavigator/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
    
    
  },
});
