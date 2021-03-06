import React, {useContext, useState, useEffect} from 'react';
import { Alert, KeyboardAvoidingView, View, Text, TouchableOpacity, Platform, StyleSheet, Dimensions, Image} from 'react-native';
import FormInput from '../components/FormInput2';
import FormInputWithDuplCheck from  '../components/FormInputWithDuplCheck';
import FormInputPhoneSelect from  '../components/FormInputPhoneSelect';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import DeviceInfo from 'react-native-device-info'; 


import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";
import { ScrollView } from 'react-native-gesture-handler';
import { windowWidth, windowHeight } from '../utils/Dimentions';

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;


const SignupScreen = ({navigation}) => {
  const [id, setId] = useState("");
  const [idError, setIdError] =  useState("check-need");
  const [textNickname, setTextNickname] = useState("");
  const [textNicknameError, setTextNicknameError] =  useState("check-need");
  const [textName, setTextName] = useState("");
  const [textNameError, setTextNameError] =  useState("check-need");
  const [textPhone1, setTextPhone1] = useState("010");
  const [textPhone1Error, setTextPhone1Error] =  useState("check-need");
  const [textPhone2, setTextPhone2] = useState("");
  const [textPhone2Error, setTextPhone2Error] =  useState("");
  const [textPassword, setTextPassword] = useState("");
  const [textPasswordError, setTextPasswordError] = useState("check-need");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("check-need");
  const [boolPossibleSubmit, setBoolPossibleSubmit] = useState(false);

  const {register} = useContext(AuthContext);

  useEffect(() => {
    if (textPassword >=4 && textPassword < 9) {
      setTextPasswordError("??????????????? 4????????? 8??????????????????.")
    } else {
      setTextPasswordError("")
    }
    if (textPassword != confirmPassword) {
      setConfirmPasswordError("??????????????? ?????? ????????????.")
    } 

    if (confirmPassword >=4 && confirmPassword < 9) {
      setConfirmPasswordError("??????????????? 4????????? 8??????????????????.")
    } else {
      setConfirmPasswordError("")
    }

    
  }, [
    textPassword,
    confirmPassword,
  ]);

  useEffect(() => {

    if (
      id == "" || 
      textNickname == "" || 
      textName == "" || 
      textPhone1 == "" || 
      textPhone2 == "" || 
      textPassword == "" || 
      confirmPassword == "" || 
      textPassword != confirmPassword
    ) {
      setBoolPossibleSubmit(false);
      return;
    }

    if (
      idError == "check-need" &&
      textNicknameError == "check-need" &&
      textPhone1Error == "check-need" &&
      textPasswordError == "check-need" &&
      confirmPasswordError == "check-need" 
      ) {

      setBoolPossibleSubmit(false);
      return;
      }
    
    if (
      idError == "" &&
      textNicknameError == "" &&
      textPhone1Error == "" &&
      textPasswordError == "" &&
      confirmPasswordError == ""
    ) {
      setBoolPossibleSubmit(true);
    } else {
      setBoolPossibleSubmit(false);

    }

  }, [
    id,
    idError,
    textNickname,
    textNicknameError,
    textName,
    textNameError,
    textPhone1,
    textPhone1Error,
    textPhone2,
    textPhone2Error,
    textPassword,
    textPasswordError,
    confirmPassword,
    confirmPasswordError,
  ]);


  function __apiCheckOverlapId() {
    //checkOverlapId
    const req = {
      query : `?id=${id}` 
    }
    FutureInvestApi.checkOverlapId(req)
    .then(res => {
      console.log("FutureInvestApi.checkOverlapId(req)");
      // console.log(res.status);
      // console.log(res.data);

      if (res.status < 300) {
        if (res.data == false) {
          console.log("=== false")
          setIdError("");
          Alert.alert(
            "??????",
            "?????????????????????.",
            [
              // {
              //   text: "Ask me later",
              //   onPress: () => console.log("Ask me later pressed")
              // },
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel"
              // },
              { text: "OK", onPress: () => {console.log("OK Pressed")} }
            ],
            {
              cancelable: true,
              onDismiss: () => {
                console.log("OK onDismiss")
              }
            }
          );

        } else {
          console.log("!== false")
          setIdError("????????? ??? ????????????");
          console.log(idError)
        }
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        console.log(e && e.response);
        console.log("!== false")
        setIdError("????????? ??? ????????????");
        console.log(idError)

    })
  }
  function __apiCheckOverlapNickname() {
    //checkOverlapNickname
    const req = {
      query : `?nickname=${textNickname}` 
    }
    FutureInvestApi.checkOverlapNickname(req)
    .then(res => {
      console.log("FutureInvestApi.__apiCheckOverlapNickname(req)");
      if (res.status < 300) {
        if (res.data == false) {
          setTextNicknameError("");
          Alert.alert(
            "??????",
            "?????????????????????.",
            [
              // {
              //   text: "Ask me later",
              //   onPress: () => console.log("Ask me later pressed")
              // },
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel"
              // },
              { text: "OK", onPress: () => {console.log("OK Pressed")} }
            ],
            {
              cancelable: true,
              onDismiss: () => {
                console.log("OK onDismiss")
              }
            }
          );

        } else {
          setTextNicknameError("????????? ??? ????????????");
        }
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        console.log(e && e.response);
        console.log("!== false")
        setTextNicknameError("????????? ??? ????????????");
        console.log(idError)

    })
  }



  function __apiCheckOverlapPhone() {
    const req = {
      query : `?phone=${textPhone1 + "" + textPhone2}` 
    }
    
    FutureInvestApi.checkOverlapPhone(req)
    .then(res => {
      console.log("FutureInvestApi.checkOverlapPhone(req)");
      console.log(res.status);
      console.log(res.data);

      if (res.status < 300) {
        if (res.data == false) {
          setTextPhone1Error("");
          Alert.alert(
            "??????",
            "?????????????????????.",
            [
              // {
              //   text: "Ask me later",
              //   onPress: () => console.log("Ask me later pressed")
              // },
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel"
              // },
              { text: "OK", onPress: () => {console.log("OK Pressed")} }
            ],
            {
              cancelable: true,
              onDismiss: () => {
                console.log("OK onDismiss")
              }
            }
          );

          
        } else {
          setTextPhone1Error("????????? ??? ????????????");
        }
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        console.log(e && e.response);
        console.log("!== false")
        setTextPhone1Error("????????? ??? ????????????");
        console.log(idError)

    })
    

  }

  function __apiPostRegister(param1) {
    // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
    //     return;
    // }

    DeviceInfo.getMacAddress().then((mac) => {
      // "E5:12:D8:E5:69:97"
      console.log(mac);


    var sendObject = {
          
          // var id: String,
          // var pwd: String,
          // var type: MemberType?,
          // var name: String,
          // var nickname: String,
          // var phone: String,
          // var macAddress: String
      id : id,
      pwd:  textPassword,
      type : "GENERAL",
      name : textName,
      nickname : textNickname,
      phone : textPhone1 + textPhone2,
      macAddress : mac,
    }
    var formData1 = new FormData()
    formData1.append("id", sendObject.id);
    formData1.append("pwd", sendObject.pwd);
    formData1.append("type", sendObject.type);
    formData1.append("name", sendObject.name);
    formData1.append("nickname", sendObject.nickname);
    formData1.append("phone", sendObject.phone);
    formData1.append("macAddress", sendObject.macAddress);
    const req = {
      data : sendObject, 
      header: { 'Authorization': "Basic YWxiYW5vdGVfaWRfYmxhYzphbGJhbm90ZV9wd2RfMjAxMw==", }
    }

    FutureInvestApi.signup(req)
    .then(res => {
      console.log("FutureInvestApi.signup")
      console.log(res)
      if (res.status < 300) {
        alert("?????????????????????.");
        
        navigation.navigate('Login');
      }
      return 
    })
    .catch(e=>{
      // console.log('[CATCH]');
      console.log(e && e.response);
      alert("????????? ??????????????????.")

    })

    })
    ;
    

}



  return (

<KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}
>

    <ScrollView style={styles.scrollview}>

<View style={styles.container}>
      <FormInputWithDuplCheck
        labelText={'?????????'}
        labelValue={id}
        onChangeText={(id) => {
          
          if (id.length > 9) {

          } else {

            setId(id)
          }
        }}
        placeholderText="4??? ?????? 9??? ??????"
        iconType="user"
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={idError}
        function1={__apiCheckOverlapId}
      />

      <FormInputWithDuplCheck
        labelText={'?????????'}
        labelValue={textNickname}
        onChangeText={(textNickname) => 
          {

          if (textNickname.length > 9) {

          } else {
            setTextNickname(textNickname)
          }
          
          }}
        placeholderText="9??? ??????"
        secureTextEntry={false}
        autoCapitalize="none"
        autoCorrect={false}
        error={textNicknameError}
        function1={__apiCheckOverlapNickname}
      />
      <FormInput
        labelText={'??????'}
        placeholderText={'?????? ??????'}
        labelValue={textName}
        onChangeText={(textName) => setTextName(textName)}
        iconType="lock"
        secureTextEntry={false}
      />

      <FormInputPhoneSelect
        labelText={'?????????'}
        placeholderText={''}
        labelValue1={textPhone1}
        labelValue2={textPhone2}
        onChangeText1={(text) => setTextPhone1(text)}
        onChangeText2={(text) => {setTextPhone2(text)}}
        secureTextEntry={false}
        error={textPhone1Error}
        function1={__apiCheckOverlapPhone}
      />

      <FormInput
        labelText={'????????????'}
        placeholderText={'4??? ?????? 8??? ??????'}
        labelValue={textPassword}
        onChangeText={(textPassword) => setTextPassword(textPassword)}
        iconType="lock"
        secureTextEntry={true}
        error={textPasswordError}
      />

      <FormInput
        labelText={'???????????? ??????'}
        placeholderText={'???????????? ??????'}
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        iconType="lock"
        secureTextEntry={true}
        error={confirmPasswordError}
      />

      {/* <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password)}
      /> */}

      {/* <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View> */}

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />
    
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
        </View>
      ) : null}

      <View style={{ width: windowWidth, height: 100 }}></View>

      <TouchableOpacity
        style={boolPossibleSubmit == true ? styles.navButtonActive : styles.navButton}
        onPress={() => {
          // navigation.navigate('Login')
          
          if (textPassword >=4 && textPassword < 9) {
            setTextPasswordError("??????????????? 4????????? 8??????????????????.")
            return;
          } else {
            setTextPasswordError("")
          }
          if (textPassword != confirmPassword) {
            setConfirmPasswordError("??????????????? ?????? ????????????.")
            return;
          } 

          if (confirmPassword >=4 && confirmPassword < 9) {
            setConfirmPasswordError("??????????????? 4????????? 8??????????????????.")
            return;
          } else {
            setConfirmPasswordError("")
          }

          
          __apiPostRegister();
        }}
        >
        <Text style={boolPossibleSubmit == true ? styles.navButtonActiveText : styles.navButtonText}>
          ??????????????????
          </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#303030',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#303030',
  },
  navButtonActive: {
    position: 'static',
    bottom: 0,
    width: device_width,
    height: 70,
    backgroundColor: '#fceb39',
    color : '#303030',
    display: 'flex',
    justifyContent:  'flex-start',
    alignItems: 'center',
    paddingTop: 20,

  },
  navButtonActiveText: {
    fontSize: 18,
    fontWeight: '500',
    color : '#303030',
    // fontFamily: 'Lato-Regular',
  },
  navButton: {
    position: 'static',
    bottom: 0,
    width: device_width,
    height: 70,
    backgroundColor: '#eeeeee',
    color : '#fff',
    display: 'flex',
    justifyContent:  'center',
    alignItems: 'center',

  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color : '#cccccc',
    // fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
