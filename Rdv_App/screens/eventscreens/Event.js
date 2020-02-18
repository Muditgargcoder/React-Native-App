import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Linking,
  Button,
  ImageBackground,
  StatusBar
} from 'react-native';
import {Header,Icon} from 'native-base'

import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';

export default class Event extends React.Component {
  static navigationOptions = ({navigation}) => {
    if(navigation.getParam('loading')){
      return{
        header:null
        // title: "Rendezvous'19",
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        //   font: 'Algerian',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // }
      };
    }
    else{
      return{
        header:null
      };
    }
  };

  constructor(props){
    super(props);
    this.events = {
      dance : {
        name: 'Dance', 
        url: 'https://assets.rdviitd.org/images/events/categories/dance.jpg', 
        present: -1, 
        events: []
      },
      comedy : {
        name: 'Comedy', 
        url: 'https://assets.rdviitd.org/images/events/categories/comedy.jpg', 
        present: -1,
        events: []
      },
      debating : {
        name: 'Debating', 
        url: 'https://assets.rdviitd.org/images/events/categories/debating.jpg', 
        present: -1, 
        events: []
      },
      dramatics : {
        name: 'Dramatics', 
        url: 'https://assets.rdviitd.org/images/events/categories/dramatics.jpg', 
        present: -1, 
        events: []
      },
      facc : {
        name: 'Fine Arts & Crafts', 
        url: 'https://assets.rdviitd.org/images/events/categories/facc.jpg', 
        present: -1, 
        events: []
      },
      glamour : {
        name: 'Glamour', 
        url: 'https://assets.rdviitd.org/images/events/categories/glamour.jpg', 
        present: -1, 
        events: []
      },
      hindisamiti : {
        name: 'Hindi Samiti', 
        url: 'https://assets.rdviitd.org/images/events/categories/hindisamiti.jpg', 
        present: -1, 
        events: []
      },
      informal : {
        name: 'Informal', 
        url: 'https://assets.rdviitd.org/images/events/categories/informal.jpg', 
        present: -1, 
        events: []
      },
      literary : {
        name: 'Literary', 
        url: 'https://assets.rdviitd.org/images/events/categories/literary.jpg', 
        present: -1, 
        events: []
      },
      magic : {
        name: 'Magic', 
        url: 'https://assets.rdviitd.org/images/events/categories/magic.jpg', 
        present: -1, 
        events: []
      },
      music : {
        name: 'Music', 
        url: 'https://assets.rdviitd.org/images/events/categories/music.jpg', 
        present: -1, 
        events: []
      },
      pfc : {
        name: 'Photography, Films and Design', 
        url: 'https://assets.rdviitd.org/images/events/categories/pfc.jpg', 
        present: -1, 
        events: []
      },
      quizzing : {
        name: 'Quizzing', 
        url: 'https://assets.rdviitd.org/images/events/categories/quizzing.jpg', 
        present: -1, 
        events: []
      },
      spicmacay : {
        name: 'SPIC MACAY',
        url: 'https://assets.rdviitd.org/images/events/categories/spicmacay.jpg',
        present: -1,
        events: []
      },
      international: {
        name: 'International',
        url: 'https://assets.rdviitd.org/images/events/categories/international.jpg',
        present: -1,
        events: []
      },
      flagship:{
        name: 'Flagship',
        url: 'https://assets.rdviitd.org/images/events/categories/flagship.jpg',
        present: -1,
        events: []
      },
      pronight:{
        name: 'Pronight',
        url: 'https://assets.rdviitd.org/images/events/categories/pronight.jpg',
        present: -1,
        events: []
      }
    };
    this.state ={ isLoading: true};
  }

  componentDidMount(){
    axios.get('https://rdviitd.org/api/event')
      .then(res=>{
        var arr = res.data.events;
        arr.map((eventsData) => {
          const eventCat = eventsData.category;
          this.events[eventCat].present = 1;
          this.events[eventCat].events.push(eventsData)
        });
        this.events = Object.values(this.events);
        this.setState({isLoading: false});
        this.props.navigation.setParams({loading:true})
        

      }).catch(res => {
        console.log(res)
      })
    
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Image source = {require('./assets/RdvLogo.png')}
            style={{width: 400, height: 400,justifyContent: 'center', alignItems: 'center',resizeMode: 'cover',alignSelf: 'stretch'}} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
              <Header styles={stylesheader.header}>
                      <Icon style={stylesheader.icon} name="menu" onPress={() =>
                                      this.props.navigation.openDrawer()} />
                        <Text style={stylesheader.headerText}>Rendezvous'19</Text>
                  </Header>
        <FlatList
          data={this.events}
          renderItem={({ item }) => {
            if(item.present == -1){
              return(<View></View>)
            }
            return (
              <View style= {styles.listStyle}>                
                <ImageBackground
                  source={{uri: item.url}}
                  style={{ flex: 1,width: '100%',aspectRatio: 16/9, height: undefined }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('cat', {loading: true, events: item.events, category: item.name, imageUrl: item.url})}
                    style={{flex: 1,backgroundColor: 'rgba(0,0,0,.2)'}}>
                    <View style={styles.tx}>
                      <Text style={styles.text}>{item.name}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            );
          }}
        />
        <View style={{ marginTop: 15}}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  n: {
    padding: 10,
    borderRadius: 3,
    marginBottom: 1,
    backgroundColor: '#98e3d3',
  },
  tx:{
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    marginLeft: 5
  },
  text:{
    color: 'white',
    fontSize: 25
  },
  listStyle: {
    // height: 120,
    marginTop: 15, 
    marginLeft: 15, 
    marginRight: 15, 
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    overflow: "hidden"
  }
});

const Mybutton = ({ val, func }) => {
  return (
    <TouchableOpacity
      style={styles.n}
      onPress={() => {
        func(val);
      }}>
      <Text style={styles.btntext}>{val}</Text>
    </TouchableOpacity>
  );
};

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

let stylesbg = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});