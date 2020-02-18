import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView,BackHandler,Button, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/Feather';
import {AsyncStorage} from 'react-native';
import {Header, Icon} from 'native-base';

export default class Profile extends React.Component {
  static navigationOptions = {
    header:null
    // title: 'Profile',
    // headerStyle: {
    //   backgroundColor: '#4858AD',
    //   font: 'Algerian',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
  };

  constructor(props){
    super(props);
      this._toLoginScreen;
    this.userData = {
      name: '',
      rdv_number: '',
      rdv_points: '',
      dob: '',
      gender: '',
      contact_number: '',
      email: '',
      college: '',
      registered_events: []
    }
    this.state = {isLoading: true}
  }
  // async retrieveItem(key){
  //   try {
  //     const retrievedItem =  await AsyncStorage.getItem(key);
  //     const item = JSON.parse(retrievedItem);
  //     return item;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return
  // };
  _logout=async()=>{

    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
  return true;
}
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    var userN;
    var userP;
    (async () => {
      await AsyncStorage.getItem('userId',(err, result) => {
        userN=result;
        console.log(typeof result);
      });;
      await AsyncStorage.getItem('password',(err, result) => {
        userP=result;
        console.log(typeof result);
      });;
      axios.post('https://rdviitd.org/api/login',{
        login_id : userN,
        password : userP
    })
    .then(res => {
      console.log('Success');
      console.log(res);
      this.userData.name = res.data.user.first_name + ' ' + res.data.user.last_name;
      this.userData.rdv_number = res.data.user.rdv_number;
      this.userData.rdv_points = res.data.user.rdv_points;
      this.userData.dob = res.data.user.dob;
      this.userData.gender = res.data.user.gender;
      this.userData.contact_number = res.data.user.contact_number;
      this.userData.email = res.data.user.email;
      this.userData.college = res.data.user.college;
      this.userData.registered_events = res.data.user.registered_events;
      this.setState({isLoading: false})
      console.log(this.userData);
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
    })
    })();

    console.log(userN)
    console.log(userP)

    // axios.post('https://rdviitd.org/api/login',{
    //     login_id : userN,
    //     password : userP
    // })
    // .then(res => {
    //   console.log('Success');
    //   console.log(res);
    //   this.userData.name = res.data.user.first_name + ' ' + res.data.user.last_name;
    //   this.userData.rdv_number = res.data.user.rdv_number;
    //   this.userData.rdv_points = res.data.user.rdv_points;
    //   this.userData.dob = res.data.user.dob;
    //   this.userData.gender = res.data.user.gender;
    //   this.userData.contact_number = res.data.user.contact_number;
    //   this.userData.email = res.data.user.email;
    //   this.userData.college = res.data.user.college;
    //   this.userData.registered_events = res.data.user.registered_events;
    //   this.setState({isLoading: false})
    //   console.log(this.userData);
    // })
    // .catch((err) => {
    //   console.log("error");
    //   console.log(err);
    // })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          
            <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <StatusBar hidden={false} />
              <Header styles={stylesheader.header}>
                      <Icon style={stylesheader.icon} name="menu" onPress={() =>
                                      this.props.navigation.openDrawer()} />
                        <Text style={stylesheader.headerText}>Profile</Text>
                  </Header>
      
      <ScrollView style={{flex: 1, paddingTop: 20, paddingBottom: 20, backgroundColor: 'white' }}>
      
        <View style = {{justifyContent: 'center'}}>
          <View style={styles.searchSection}>
            <Text style={{fontSize: 30, justifyContent: 'center', lineHeight: 40}}>{this.userData.name}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./number.jpg')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>RDV Number: {this.userData.rdv_number}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./gift.png')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>RDV Points: {this.userData.rdv_points}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./calender.png')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>DOB: {this.userData.dob}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./gender.png')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>Gender: {this.userData.gender}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./phone.png')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>Contact No: {this.userData.contact_number}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./mail.png')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>Email: {this.userData.email}</Text>
          </View>
          <View style={styles.searchSection}>
            <Image 
                source = {require('./college.png')}
                style={{ width: 30, height: 30, margin: 10}} />
            <Text style={styles.tx}>College: {this.userData.college}</Text>
          </View>
        </View>
        <View style={{ borderBottomColor: 'black', marginLeft:20, marginRight: 20, borderBottomWidth: 1}} />
        <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
        
          <Text style={{ fontSize: 20 }}>Events Registered: {'\n'}</Text>
          {this.userData.registered_events.map((val, key) => {
            return (
              <Text style={{ fontSize: 18 }}>
                {val.name+'\n\n'}
              </Text>
            );
          })}
        </View>
        <View style={{flex:3, flexDirection:'row'}}>
          <View style={{flex:1}}></View>
          <View style={{flex:1}}>

        <Button  onPress={this._logout}
          
          title="SignOut"/>
          </View>
          <View style={{flex:1}}></View>
          </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    padding: 10,
    
  },
  im: {
    height: 40,
    width: 40,
    marginTop: 10,
    alignSelf: 'center',
  },
  tx: {
    fontSize: 16,
    justifyContent: 'center',
    lineHeight: 40,
  },
  searchSection: {
    // marginTop: 12,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
const stylesheader = StyleSheet.create({
  icon:{
      padding:13,
      
      flex:1
  },
  container:{
      
  },
  header:{
      flexDirection:'row'    
  },
  headerText:{
      flex:8,
      padding:8,
      fontSize:30,
      color:'white',
      fontFamily:'sans-serif'
  }


})