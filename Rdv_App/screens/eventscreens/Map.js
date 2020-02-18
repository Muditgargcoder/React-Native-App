import * as React from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Button,
  FlatList,
  StatusBar
} from 'react-native';
import axios from 'axios';
import {Header,Icon} from 'native-base'
import Modal from 'react-native-modal';


export default class Map extends React.Component {
  static navigationOptions = {
    title: 'Venues',
    headerStyle: {
      backgroundColor: '#f4511e',
      font: 'Algerian',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.events = {
      dance: {
        name: 'Dance',
      },
      comedy: {
        name: 'Comedy',
      },
      debating: {
        name: 'Debating',
      },
      dramatics: {
        name: 'Dramatics',
      },
      facc: {
        name: 'Fine Arts & Crafts',
      },
      glamour: {
        name: 'Glamour',
      },
      hindisamiti: {
        name: 'Hindi Samiti',
      },
      informal: {
        name: 'Informal',
      },
      literary: {
        name: 'Literary',
      },
      magic: {
        name: 'Magic',
      },
      music: {
        name: 'Music',
      },
      pfc: {
        name: 'Photography, Films and Design',
      },
      quizzing: {
        name: 'Quizzing',
      },
      spicmacay: {
        name: 'SPIC MACAY',
      },
      international: {
        name: 'International',
      },
      flagship: {
        name: 'Flagship',
      },
      pronight: {
        name: 'Pronight',
      },
    };
    this.venue = {
      'Biotech Lawns': {
        events: [],
      },
      'Dogra Hall': {
        events: [],
      },
      'Ex-Hall': {
        events: [],
      },
      'Football Ground': {
        events: [],
      },
      'Himadri Lawns': {
        events: [],
      },
      LH: {
        events: [],
      },
      'Nalanda Ground': {
        events: [],
      },
      OAT: {
        events: [],
      },
      'Red Square': {
        events: [],
      },
      SAC: {
        events: [],
      },
      'Seminar Hall': {
        events: [],
      },
      'WS 101': {
        events: [],
      },
      'Wind Tunnel': {
        events: [],
      },
    };
    this.selectedVenue = null;
    this.default = {
      markers: [
        {
          coordinate: {
            latitude: 28.545217,
            longitude: 77.193658,
          },
          title: 'Biotech Lawns',
          description: null,
        },
        {
          coordinate: {
            latitude: 28.544847,
            longitude: 77.192046,
          },
          title: 'Dogra Hall',
          description: null,
        },
        {
          coordinate: {
            latitude: 28.545367,
            longitude: 77.19237,
          },
          title: 'Ex-Hall',
          description: null,
        },
        {
          coordinate: {
            latitude: 28.544914,
            longitude: 77.187722,
          },
          title: 'Football Ground',
          description: null,
        },
        {
          coordinate: {
            latitude: 28.545609,
            longitude: 77.196704,
          },
          title: 'Himadri Lawns',
          description: null,
        },
        {
          coordinate: {
            latitude: 28.543172,
            longitude: 77.193204,
          },
          title: 'LH',
          description: 'Lecture Hall Complex',
        },
        {
          coordinate: {
            latitude: 28.54655,
            longitude: 77.184028,
          },
          title: 'Nalanda Ground',
          description: null,
        },

        {
          coordinate: {
            latitude: 28.545107,
            longitude: 77.185292,
          },
          title: 'OAT',
          description: 'Open Air Theatre',
        },
        {
          coordinate: {
            latitude: 28.54511,
            longitude: 77.191373,
          },
          title: 'Red Square',
          description: null,
        },

        {
          coordinate: {
            latitude: 28.54567,
            longitude: 77.185079,
          },
          title: 'SAC',
          description: 'Student Activity Center',
        },
        {
          coordinate: {
            latitude: 28.545069,
            longitude: 77.192607,
          },
          title: 'Seminar Hall',
          description: null,
        },
        {
          coordinate: {
            latitude: 28.543866,
            longitude: 77.192083,
          },
          title: 'WS 101',
          description: 'Central Workshop',
        },
        {
          coordinate: {
            latitude: 28.545206,
            longitude: 77.192241,
          },
          title: 'Wind Tunnel',
          description: null,
        },
        // {
        //   coordinate: {
        //     latitude: 28.546289,
        //     longitude: 77.191961,
        //   },
        //   title: '5-LT-1',
        //   description: null,
        // },
        // {
        //   coordinate: {
        //     latitude: 0,
        //     longitude: 0,
        //   },
        //   title: 'current',
        //   description: null,
        // },
      ],
      region: {
        latitude: 28.54431,
        longitude: 77.18871,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.021,
      },
    };
    this.date = 1;
  }

  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    // console.log(this.state.isModalVisible);
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  myButton2(val) {
    return <Button title={val} style={styles.btn} onPress={this.toggleModal} />;
  }

  getEvents = () => {
    // console.log(JSON.stringify(this));
    var sVenue = this.selectedVenue;
    var myloop = [];
    if (sVenue != null) {
      var arr = this.venue[sVenue].events;
      if (arr.length == 0) {
        myloop = [];
        myloop.push(
          <View style={{ flex: 1, padding: 25 }}>
            <Text style = {styles.des}>No events scheduled</Text>
          </View>
        );
        return myloop;
      }
      // console.log(arr);
      // console.log("sel "+ sVenue);
      arr.map(events => {
        // console.log(events);
        myloop.push(
          <View style={{ flex: 1, padding: 10, paddingTop: 4 }}>
            <Text style={styles.des}>
              {events}
              {'\n'}-------------------------------
            </Text>
          </View>
        );
      });
    }
    // console.log(myloop);
    return myloop;
  };

  func = x => {
    // console.log('x = ' + x);
    this.selectedVenue = x;
    this.toggleModal();
  };

  componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    axios.get('https://rdviitd.org/api/event').then(res => {
      var arr = res.data.events;
      arr.map(eventsData => {
        const eventCat = eventsData.category;
        var arrVenue = eventsData.dtv;
        arrVenue.map(venueData => {
          const loc = venueData.venue;
          const val =
            'Timing: ' +
            new Date(JSON.parse(JSON.stringify(venueData.start_time)))
              .toString()
              .substring(16, 21) +
            ' - ' +
            new Date(JSON.parse(JSON.stringify(venueData.end_time)))
              .toString()
              .substring(16, 21) +
            '\n' +
            this.events[eventCat].name +
            ' : ' +
            eventsData.name;
          // const val = this.events[eventCat].name + ' : ' + eventsData.name;
          const eventDate = parseInt(venueData.date.split(' ')[1]) + 1;
          try {
            if (year == 2019) {
              if (month == 9) {
                if (eventDate == 2) {
                  this.date = 2;
                  this.venue[loc].events.push(val);
                }
              }
              if (month == 10) {
                if (date <= 2) {
                  if (eventDate == 2) {
                    this.date = 2;
                    this.venue[loc].events.push(val);
                  }
                } else if (date > 2 && date < 6) {
                  if (eventDate == date) {
                    this.date = eventDate;
                    this.venue[loc].events.push(val);
                  }
                }
              }
            }
            // this.venue[loc].events.push(val);
          } catch (error) {
            if (loc.startsWith('LH') == false) {
              // console.log(loc);
            } else {
              this.venue['LH'].events.push(val + '\n' + venueData.venue);
            }
          }
        });
      });
      this.events = Object.values(this.events);
      for (var key in this.venue) {
        if (this.venue.hasOwnProperty(key)) {
          this.venue[key].events = Array.from(this.venue[key].events).sort();
        }
      }
    });
  }

  //  findLoc() {
  //   // navigator.geolocation.setRNConfiguration({skipPermissionRequests: false});
  //   // navigator.geolocation.requestAuthorization();
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       // console.log('wokeeey');
  //       console.log(position);
  //       const l = this.default.markers.length;
  //       this.default.markers[l - 1].coordinate.latitude =
  //         position.coords.latitude;
  //       this.default.markers[l - 1].coordinate.longitude =
  //         position.coords.longitude;
  //       console.log(this.default.markers[l - 1]);
  //       // console.log('hhh');
  //     },
  //     error => Alert.alert(error.message),
  //     { enableHighAccuracy: true, timeout: 90000, maximumAge: 1000 }
  //   );

  //   // this.forceUpdate();
  // }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <StatusBar hidden={false} />
              <Header styles={stylesheader.header}>
                      <Icon style={stylesheader.icon} name="menu" onPress={() =>
                                      this.props.navigation.openDrawer()} />
                        <Text style={stylesheader.headerText}>Venues</Text>
                  </Header>
        <Modal
          isVisible={this.state.isModalVisible}
          style={{ justifyContent: 'center' }}
          animationType="fade">
          <View style={styles.modal}>
            <Text
              style={[
                styles.des,
                { flex: null },
                { paddingBottom: 0 },
                { marginTop: 10 },
              ]}>
              {' '}
              {"Event's"} in {this.selectedVenue} on {this.date + ' Oct'}
              {'\n'}
            </Text>
            <FlatList
              data={this.getEvents()}
              renderItem={({ item }) => {
                return <View>{item}</View>;
              }}
            />
            <View style={[styles.buttonHor, { padding: 10 }]}>
              <Text> </Text>
              <Button
                title="Close"
                style={styles.buttonHor2}
                onPress={() => this.toggleModal()}
              />
            </View>
          </View>
        </Modal>
        <MapView style={{ flex: 1 }} initialRegion={this.default.region}>
          {this.default.markers.map((marker, index) => {
            return (
              
              
              <MapView.Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                onCalloutPress={() => this.func(marker.title)}
                // onPress = {()=>this.func.bind(marker.title)}
                // onPress = {()=>Alert.alert('hi')}
                // onCalloutPress={() => Alert.alert('Hello')}
              />
            );
          })}
          
        </MapView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonHor: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHor2: {
    margin: 15,
    width: '40%',
    height: 40,
  },

  btn: {
    flex: 1,
    padding: 8,
    backgroundColor: '#4284ff',
  },
  des: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
    fontSize: 20,
    color: 'white',
  },
  modal: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6282fc',
    borderRadius: 5,
  },
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