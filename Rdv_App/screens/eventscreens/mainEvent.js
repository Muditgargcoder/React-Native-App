import * as React from 'react';
import Modal from 'react-native-modal';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Button,
  ImageBackground,
  ScrollView,
  TextInput,
  Alert,
  StatusBar
} from 'react-native';
import {Header,Icon} from 'native-base'
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import DropDownItem from 'react-native-drop-down-item';

export default class MainEvent extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackImage: (
      <Image
        source={require('./assets/backArrowbutton.png')}
        style={{ height: 20, width: 20 }}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.default = {
      imageUrl: '',
      catName: '',
      registration: ['', ''], // 0 -> Team Name, 1 -> Leader Name , 2 --- n -> Team Members
      minMember: 0,
      event: this.props.navigation.getParam('event', []), //full event JSON
      sub: '', // submission link
      op: '', // Registration is open now or not
    };
  }

  state = {
    isModalVisible: false,
    error: false,
    message: '',
  };

  renderAlert() {
    if (this.state.error || this.state.message) {
      return Alert.alert(this.state.message);
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  myButton(val, link, type) {
    const req = this.default.op;
    if (req != 'Not Required') {
      return (
        <TouchableOpacity
          onPress={() => {
            req == 'Closed'
              ? null
              : type == 'email'
              ? Linking.openURL('mailTo:' + link)
              : type == 'External' && req == 'Open'
              ? this.toggleModal()
              : Linking.openURL(link);
          }}
          style={styles.btn}>
          <Text style={styles.btntex}>
            {req == 'Open'
              ? val
              : req == 'Closed'
              ? 'Registration Closed'
              : req == 'Not Open'
              ? 'Registration Not Open'
              : 'null'}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  // myButton2(val) {
  //   const req = this.default.op;
  //   console.log(req);
  //   if (req == 'Open') {
  //     return (
  //       <Button title={val} style={styles.btn} onPress={this.toggleModal} />
  //     );
  //   } else if (req == 'Closed') {
  //     return <Button title="Closed" disabled={true} />;
  //   } else if (req == 'Not Open') {
  //     return <Button title="Registration Not Open" disabled={true} />;
  //   }
  // }

  mod() {
    return (
      <View style={{ margin: 100 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  dropDown(head, content) {
    return (
      <DropDownItem
        invisibleImage={require('./assets/DownAr.png')}
        visibleImage={require('./assets/UpArrow.png')}
        style={{ flex: 1, marginBottom: 15 }}
        header={
          <View>
            <Text style={styles.dropDownHeader}>{head}</Text>
          </View>
        }>
        <Text style={styles.dropDownContent}>
          {head == 'Contact' ? (
            content.map(data => {
              return (
                <Text>
                  {data.name}
                  {'\n'}
                  {data.designation}
                  {'\n'}Phone: {data.contact}
                  {'\n'}
                  {data.rdv_email}
                  {'\n'}
                  {data.email}
                  {'\n'}
                  -------------------------------------------{'\n'}
                </Text>
              );
            })
          ) : head == 'Schedule' ? (
            content.map(data => {
              return (
                <Text>
                  {data.type}
                  {'\n'}
                  {data.date}
                  {'\n'}
                  Timings:{' '}
                  {new Date(JSON.parse(JSON.stringify(data.start_time)))
                    .toString()
                    .substring(16, 21)}{' '}
                  To{' '}
                  {new Date(JSON.parse(JSON.stringify(data.end_time)))
                    .toString()
                    .substring(16, 21)}
                  {'\n'}Venue: {data.venue}
                  {'\n'}
                  -------------------------------------------{'\n'}
                </Text>
              );
            })
          ) : (
            <Text>{this.stripHTML(content)}</Text>
          )}
        </Text>
      </DropDownItem>
    );
  }

  reg(type, min, max) {
    if (type == 'Single' || type == null) {
      min = 1;
      max = 1;
    }
    var myloop = [];

    if (this.default.event.reg_link_upload) {
      myloop.push(
        <View style={{ flex: 1, padding: 25 }}>
          <TextInput
            editable={true}
            style={styles.inputText}
            placeholder="Upload Link*"
            onChangeText={text => {
              this.default.sub = text;
            }}
          />
        </View>
      );
    }

    // this.default.registration.length = max + 1;
    this.default.minMember = min;
    for (let i = 0; i < max; i++) {
      myloop.push(
        <View style={{ flex: 1, padding: 25 }}>
          <TextInput
            style={styles.inputText}
            onChangeText={text =>
              type == 'Single'
                ? (this.default.registration[1] = text)
                : (this.default.registration[i] = text)
            }
            editable={true}
            placeholder={
              type == 'Single'
                ? 'Rdv Number'
                : i == 0
                ? 'Team Name'
                : i == 1
                ? 'Team Leader RDV Number'
                : 'Team Member ' + i + "'s RDV Number"
            }
          />
        </View>
      );
    }
    return myloop;
  }

  stripHTML(text) {
    text = text.replace(/&.*?;/gm, '');
    text = text.replace(/&.*?p/gm, '');
    return text.replace(/<.*?>/gm, '');
  }

  showDate() {
    const now = Date.now();
    const deadline = new Date(this.default.event.reg_deadline).getTime();
    const reg_closed = this.default.registration && now > deadline;
    if (!this.default.event.registration) {
      this.default.op = 'Not Required';
      return <Text>Not required</Text>;
    } else if (reg_closed) {
      this.default.op = 'Closed';
      return <Text>Closed</Text>;
    } else if (this.default.event.reg_status) {
      this.default.op = 'Open';
      return <Text>Open</Text>;
    }
    this.default.op = 'Not Open';
    return <Text>Not Open</Text>;
  }

  render() {
    const { navigation } = this.props;
    const event = this.default.event;
    this.default.catName = navigation.getParam('category', '');
    this.default.imageUrl = navigation.getParam('imageUrl', '');
    const date = new Date(event.reg_deadline);
    const req = this.default.op;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          blurRadius={2}
          source={require('./assets/EventBackground.jpg')}
          style={{ flex: 1, resizeMode: 'cover' }}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.3)',
            }}>
            <View style={{ flex: 1, paddingBottom: 20 }}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: this.default.imageUrl }}
                  style={{
                    width: '100%',
                    aspectRatio: 2 / 1.3,
                    resizeMode: 'cover',
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.headCatName}>{event.name}</Text>

                <Text style={styles.des}>
                  {event.subheading != event.name ? (
                    <Text style={{ fontSize: 25 }}>{event.subheading}</Text>
                  ) : null}
                  {'\n'}
                  {'\n'}
                  {event.dtv[0] === undefined ? null : (
                    <Text>
                      Starting from {''}
                      {event.dtv[0].date}
                    </Text>
                  )}
                  {'\n'}
                  Registration: {this.showDate()}
                  {'\n'}
                  {event.reg_deadline ? (
                    <Text>
                      Deadline:{' '}
                      {new Date(JSON.parse(JSON.stringify(event.reg_deadline)))
                        .toString()
                        .substring(4, 21)}
                    </Text>
                  ) : null}
                  {'\n'}
                  {'\n'}
                  {this.stripHTML(event.description)}
                </Text>
              </View>

              {event.rules != null ? this.dropDown('Rules', event.rules) : null}

              {event.prizes != null
                ? this.dropDown('Prizes', event.prizes)
                : null}

              {event.dtv[0] === undefined
                ? null
                : this.dropDown('Schedule', event.dtv)}

              {event.poc === undefined
                ? null
                : this.dropDown('Contact', event.poc)}
            </View>

            {event.reg_mode == 'Email' ? (
              <View>
                {this.myButton('Click to Register', event.reg_email, 'email')}
              </View>
            ) : event.reg_mode == 'External' ? (
              <View>
                {this.myButton('Click to Register', event.reg_link, 'link')}
              </View>
            ) : (
              // <View style={ { flex: 1, justifyContent: 'center'}}>
              <View>
                {this.myButton('Click to Register', '', 'External')}

                <Modal
                  isVisible={this.state.isModalVisible}
                  style={{ justifyContent: 'center' }}
                  animationType="fade">
                  <View style={styles.modal}>
                    <FlatList
                      data={this.reg(
                        event.reg_type,
                        event.reg_min_team_size,
                        event.reg_max_team_size
                      )}
                      renderItem={({ item }) => {
                        return <View>{item}</View>;
                      }}
                    />
                    <View style={[styles.buttonHor, { padding: 10 }]}>
                      <Button
                        title="Register"
                        style={styles.buttonHor2}
                        onPress={() => {
                          var filtered = this.default.registration.filter(
                            el => {
                              return el != null;
                            }
                          );
                          var r = filtered.slice(1);
                          if (
                            this.default.event.reg_type == 'Single' ||
                            this.default.event.type == null
                          )
                            r = filtered[1];

                          var reg = {
                            register: r, // array of Team members
                            submission: this.default.sub, // submission link (if exists)
                            team_name: this.default.registration[0], // team name
                          };

                          const data = {
                            id: this.default.event.id,
                            reg: reg,
                          }; // data to be given to API

                          console.log(data);
                          axios
                            .post(
                              `https://rdviitd.org/api/event/register/${
                                data.id
                              }`,
                              data.reg
                            )
                            .then(res => {
                              this.setState({
                                error: res.data.error,
                                message: res.data.message,
                              });
                              console.log(res);
                              this.renderAlert();
                            })
                            .catch(err => {
                              this.setState({
                                error: true,
                                message: err.response.data.message,
                              });
                              // console.log(err.response);
                              this.renderAlert();
                            });
                        }}
                      />
                      <Text> </Text>
                      <Button
                        title="Cancel"
                        style={styles.buttonHor2}
                        onPress={this.toggleModal}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </ScrollView>
        </ImageBackground>
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
  headCatName: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
    padding: 20,
    paddingBottom: 10,
  },
  des: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    fontSize: 20,
    marginBottom: 1,
    color: 'white',
  },
  btn: {
    flex: 1,
    padding: 8,
    backgroundColor: '#4284ff',
  },
  dropDownHeader: {
    fontSize: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  dropDownContent: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    padding: 10,
  },
  inputText: {
    height: 30,
    color: 'black',
    padding: 4,
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  modal: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  btntex: { flex: 1, alignSelf: 'center', fontSize: 30, color: 'white' },
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