import React,{useState,Component} from 'react';
import{View,Text,StyleSheet,Button,TextInput,Alert,Image,ImageBackground,TouchableOpacity} from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
const LoginScreen = props => {

    const [userN , setName] = useState('');
    const [userP , setPassword] = useState('');

    _toSignUpScreen=() => {props.navigation.navigate('SignUp')}

    onLoginPress = (e) => {
            
        e.preventDefault();
        
        if(!userN || !userP) {Alert.alert("Please enter complete loginID and password");}
        
        else{
            axios.post('https://rdviitd.org/api/login',{
                login_id : userN.trim(),
                password : userP.trim()
            })
            .then((res)= async() => {
                await AsyncStorage.setItem('isLoggedIn','1');  
                await AsyncStorage.setItem('userId',userN.trim());
                await AsyncStorage.setItem('password',userP.trim());
                props.navigation.navigate('DrewerNav');
                console.log(userN.trim()+userP.trim())
                console.log(res);
            })
            .catch((err) => {
                Alert.alert("Error");
                console.log("error");
                console.log(err);
            })
        }
                        
                     
    }
    return(     
        <View style = {{flex: 1, justifyContent: 'center',backgroundColor: 'white'}}>
            <Image 
                source = {require('./assets/logo2.png')}
                style={{ width: '100%', height: undefined, aspectRatio: 639/192, justifyContent: 'center', alignItems: 'center', marginBottom: 25}} />
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/user.png')}
                    style={{ width: 30, height: 30, marginLeft:10}} />
                <TextInput
                    placeholder="RDV No/Email"
                    placeholderTextColor="#FF8F77"   
                    style={[styles.input2, {width: '80%'}]}
                    value={userN}
                    onChangeText={newUsername => setName(newUsername)} />
            </View>
            <View style={styles.searchSection}>
                <Image 
                    source = {require('./assets/lock.png')}
                    style={{ width: 30, height: 30, marginLeft:10}} />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#FF8F77"   
                    style={[styles.input2, {width: '80%'}]}
                    secureTextEntry
                    value={userP}
                    onChangeText={newPassword => setPassword(newPassword)} />
            </View>   
            <TouchableOpacity
                onPress={this.onLoginPress}
                style={styles.btn}>
                <Text style={styles.btntex}>LOG IN</Text>
            </TouchableOpacity>  
            <Text style = {{fontSize: 15, color: '#FF8F77', alignSelf: 'center'}}>Don't have an account?</Text>
            <TouchableOpacity
                onPress={this._toSignUpScreen}
                style={styles.btn2}>
                <Text style={styles.btntex2}>Register</Text>
            </TouchableOpacity>  
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    input : {
        height: 40,
        backgroundColor:'white',
        margin:20,
        color:'black',
        paddingLeft:4,
        borderColor:'black',
        borderWidth:1
    },
    buttn:{
        height:20
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
    searchIcon: {
        padding: 10,
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
