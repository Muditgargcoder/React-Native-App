import * as React from 'react';
import axios from 'axios';
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
  Dimensions,
  StatusBar
} from 'react-native';
import {Header,Icon} from 'native-base'

export default class SubEvent extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const w = Dimensions.get('window').width;
    var titl = navigation.getParam('category', '');
    if (titl === 'Photography, Films and Design') {
      titl = 'PFC';
    }
    return {
      title: titl + ' Events',
      headerStyle: {
        backgroundColor: '#4858AD',
        font: 'Algerian',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  

  constructor(props) {
    super(props);
    this.default = {
      imageUrl: '',
      catName: '',
      event: this.props.navigation.getParam('events', [])
    };
  }

  renderElement(item) {
    var url = item.photos[0];
    if (url === 'None') {
      url = this.default.imageUrl;
    }
    var sub = item.name;
    if (sub === null) {
      sub = item.subheading;
    }
    if (this.default.catName === 'Hindi Samiti') {
      sub = item.name;
    }
    if (sub === null) {
      sub = this.default.catName;
    }
    return (
      <View style={styles.listStyle}>
        <ImageBackground source={{ uri: url }} style={{ flex: 1,width: '100%',aspectRatio: 16/9, height: undefined, }} >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('mainEvent', {
                event: item,
                category: sub,
                imageUrl: url,
              })
            }
            style={{ flex: 1 ,backgroundColor: 'rgba(0,0,0,.2)'}}>
            <View style={styles.tx}>
              <Text style={styles.text}>{sub}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    // const events = navigation.getParam('events', []);
    const events = this.default.event;
    this.default.catName = navigation.getParam('category', '');
    this.default.imageUrl = navigation.getParam('imageUrl', '');
    // this.props.navigation.setParams({Title: this.default.catName+' Events'});
    console.log(this.default.catName + this.default.catName);
    return (
      <View style={styles.container}>
        <FlatList
          data={events}
          renderItem={({ item }) => {
            return this.renderElement(item);
          }}
        />
        <View style={{ marginTop: 15 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#a9e8e3',
  },
  n: {
    padding: 10,
    borderRadius: 3,
    marginBottom: 1,
    backgroundColor: '#98e3d3',
  },
  tx: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    marginLeft: 5,
  },
  text: {
    color: 'white',
    fontSize: 25,
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
    overflow: 'hidden',
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