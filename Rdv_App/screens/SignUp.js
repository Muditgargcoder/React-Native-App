import React,{useState,Component} from 'react';
import{View,Text,StyleSheet,Button,TextInput,Image,Alert,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import axios from 'axios';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { ScrollableComponent } from 'react-native-keyboard-aware-scroll-view';

const SignUp = props => {      
                        
        const [firstname , setFirstName] = useState('');
        const [lastname , setLastName] = useState('');
        const [contactno , setContactNo] = useState('');
        const [college , setCollege] = useState('');
        const [dob , setdob] = useState("2000-01-01");
        const [email , setEmail] = useState('');
        const [gender , setGender] = useState('Male');
        const [password , setPasswords] = useState('');
        const [conpassword , setconPasswords] = useState('');
        const [otp , setotp] = useState('');
        const [on , setOn] = useState(false);
        const [buttonText , setButtonText] = useState("SUBMIT");
        const [otpState , setOtpState] = useState(false);

        var genderProps = [
                {label: 'Male', value: 'Male'},
                {label: 'Female', value: 'Female'}
        ];
        this.state ={date:"2000-01-01"}
        _toLoginScreen=() => {props.navigation.navigate('Login')}
        
        onSignUpPress = (e) => {

                e.preventDefault();               
                // dob=this.state.date;
                //console.log(userN);
             if(!otpState){   

                                        if(!firstname || !lastname || !contactno || !college || !email || !gender || !password) {Alert.alert("Please enter complete details");}
                                
                                        else if(password != conpassword){Alert.alert("The passwords dont match!");}

                                        else {
                                                setOn(true);
                                                setButtonText("SIGN UP");
                                                setOtpState(true);
                                axios.post('https://rdviitd.org/api/register',
                                {
                                        first_name :firstname.trim(),
                                        last_name :lastname.trim(),
                                        email :email.trim(),
                                        dob :dob.trim(),
                                        college : college.trim(),
                                        contact_number :contactno.trim(),
                                        gender :gender.trim(),
                                        password :password.trim()
                                })
                                        .then((res) => {
                                                Alert.alert("Otp sent");
                                                setOtpState(true);
                                                 })
                                        .catch((err) => {
                                                console.log("Error");
                                                console.log(err);
                                        })

                                                /*
                                                setOn(true);
                                                setButtonText("SIGN UP");
                                                axios.post('https://rdviitd.org/api/register',
                                                {
                                                        first_name :firstname,
                                                        last_name :lastname,
                                                        email :email,
                                                        dob :dob,
                                                        college : college,
                                                        contact_number :contactno,
                                                        gender :gender,
                                                        password :password
                                                })
                                                        .then((res) => {

                                                                Alert.alert("Otp sent");
                                                                axios.post('https://rdviitd.org/api/register',
                                                                {
                                                                        dob :dob,
                                                                        first_name :firstname,
                                                                        last_name :lastname,
                                                                        email :email,
                                                                        college : college,
                                                                        contact_number :contactno,
                                                                        gender :gender,
                                                                        password :password,
                                                                        otp: otp
                                                                })
                                                                .then((res)= async() => {
                                                                console.log(res);
                                                                Alert.alert("Signup Success!!")
                                                                props.navigation.navigate('DrewerNav')
                                                                
                                                                })
                                                                .catch((err) => {
                                                                        Alert.alert("Error");
                                                                        console.log("Error");
                                                                        console.log(err);
                                                                })
                                                        console.log(res);
                                                        
                                                        })
                                                        .catch((err) => {
                                                                console.log("Error");
                                                                console.log(err);
                                                        })*/
                                                        }
                        }
                else {
                                               
                        setOtpState(false);
                        axios.post('https://rdviitd.org/api/register',
                                                                {
                                                                first_name :firstname.trim(),
                                                                last_name :lastname.trim(),
                                                                email :email.trim(),
                                                                dob :dob.trim(),
                                                                college : college.trim(),
                                                                contact_number :contactno.trim(),
                                                                gender :gender.trim(),
                                                                password :password.trim(),
                                                                otp: otp.trim()
                                                                })
                                                                .then((res)= async() => {
                                                                console.log(res);
                                                                Alert.alert("Signup Success!");
                                                                await AsyncStorage.setItem('isLoggedIn','1');  
                                                                await AsyncStorage.setItem('userId',email);  
                                                                await AsyncStorage.setItem('password',password);  
                                                                props.navigation.navigate('DrewerNav');

                                                                
                                                                })
                                                                .catch((err) => {
                                                                        Alert.alert("Error!");
                                                                        console.log("Error");
                                                                        console.log(err);
                                                                })
                                                        console.log(res);
                }
        }

   
    return(
        <ScrollView style={{backgroundColor: 'white'}}>
        <View>
        <Image 
        source = {require('./assets/logo2.png')}
        style={{ width: '100%', height: undefined, aspectRatio: 639/192, justifyContent: 'center', alignItems: 'center', marginBottom: 25}} />
            

                    <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/user.png')}
                    style={{ width: 30, height: 30, margin: 10}} />
            <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={firstname}
                    onChangeText={newfirstname => setFirstName(newfirstname)}
                    
            /></View>
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/user.png')}
                    style={{ width: 30, height: 30, margin: 10}} /> 
            <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={lastname}
                    onChangeText={newlastname => setLastName(newlastname)}
            />
            </View>
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/phone.png')}
                    style={{ width: 30, height: 30, margin: 10}} /> 
            <TextInput
                    placeholder="Contact Number"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={contactno}
                    onChangeText={newcontactno => setContactNo(newcontactno)}
            />
            </View>
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/college.png')}
                    style={{ width: 30, height: 30, margin: 10}} /> 
            <TextInput
                    placeholder="College"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={college}
                    onChangeText={newcollege => setCollege(newcollege)}
            />
            </View>
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/mail.png')}
                    style={{ width: 30, height: 30, margin: 10}} /> 
            <TextInput
                    placeholder="E-Mail"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={email}
                    onChangeText={newemail => setEmail(newemail)}
            />
            </View>
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/gender.png')}
                    style={{ width: 30, height: 30, margin: 10}} /> 
            {/* <TextInput
                    placeholder="Gender"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={gender}
                    onChangeText={newgender => setGender(newgender)}
            /> */}
            <RadioForm
                radio_props = {genderProps}
                initial = {0}
                onPress = {(value) => {setGender(value)}}
            />
            </View>

            <View style={styles.searchSection}>
                {/* <Image 
                    source = {require('./assets/calender.png')}
                    style={{ width: 30, height: 30, margin: 10}} />  */}
             {/* <TextInput
                    placeholder="DOB (DD-MM-YYYY)"
                    placeholderTextColor="#FF8F77"                         
                    style={[styles.input2, {width: '80%'}]}
                    value={dob}
                    onChangeText={newdob => setdob(newdob)}
            /> */}
            <DatePicker
                style={{width: 200}}
                date={dob}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1970-01-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
                },
                dateInput: {
                marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                // onDateChange={(date) => {this.setState({date:date})}}
                onDateChange={(date) => {setdob(date)}}
        />
            </View>
        
        <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/lock.png')}
                    style={{ width: 30, height: 30, margin: 10}} />
            <TextInput
                    placeholder="Password"
                    placeholderTextColor="#FF8F77" 
                    secureTextEntry
                    style={[styles.input2, {width: '80%'}]}
                    value={password}
                    onChangeText={newpassword => setPasswords(newpassword)}
                    />
         </View>  
         <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/lock.png')}
                    style={{ width: 30, height: 30, margin: 10}} />         
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#FF8F77"
                    secureTextEntry
                    style={[styles.input2, {width: '80%'}]}
                    value={conpassword}
                    onChangeText={newconpassword => setconPasswords(newconpassword)}
                    />
                 </View>   

                 

                 {
                   on &&
                   <View>
                   <Text style = {{fontSize: 10, color: '#FF8F77', alignSelf: 'center'}}> An OTP has been sent to your e-mail</Text>
                   <View style={styles.searchSection}>
                   <Image 
                       source = {require('./assets/key.png')}
                       style={{ width: 30, height: 30, margin: 10}} /> 
   
                        
                       <TextInput
                       placeholder="Enter OTP"
                       placeholderTextColor="#FF8F77"                     
                       style={[styles.input2, {width: '80%'}]}
                       value={otp}
                       onChangeText={newotp => setotp(newotp)}
                       />
                       </View>
                       </View>
                 }

                                  
         <TouchableOpacity
                onPress={this.onSignUpPress}
                style={styles.btn}>
                <Text style={styles.btntex}>{buttonText}</Text>
            </TouchableOpacity>
            
            <Text style = {{fontSize: 15, color: '#FF8F77', alignSelf: 'center'}}>Already have an account?</Text>
            <TouchableOpacity
                onPress={this._toLoginScreen}
                style={styles.btn2}>
                <Text style={styles.btntex2}>Login</Text>
            </TouchableOpacity>  
                 </View>
                 <View style={{height:20}}></View>
                 </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
       input : {
               height: 40,
               backgroundColor:'white',
               margin:5,
               color:'black',
               paddingLeft:4,
               borderColor:'black',
               borderWidth:1
    },
    searchSection: {
        // marginTop: 12,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input2: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        fontSize: 20,
        color: '#E23E1B',
        borderBottomWidth: 1,
        borderBottomColor: '#FF8F77'
    },
    btntex: { 
        alignSelf: 'center', 
        flex: 1,
        justifyContent: 'center',
        fontSize: 25, 
        color: 'white' 
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: 'red',
        width: 200,
        height: 40,
        marginTop: 8,
        marginBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    
    btntex2: { 
        alignSelf: 'center', 
        flex: 1,
        paddingTop:5,
        justifyContent: 'center',
        fontSize: 20, 
        color: 'red' 
    },
    btn2: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 200,
        height: 40,
        marginTop: 4
    }
                });
