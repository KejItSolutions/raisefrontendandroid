import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';


export default function RegistrationScreen() {

  const [otpStudent, setOtpStudent] = useState(['','','','']);
  const [otpParent, setOtpParent] = useState(['','','','']);
  const [timer,setTimer] = useState(2);

  useEffect(()=>{
    if(timer>0){
      const interval = setInterval(()=>{
        setTimer(t=>t-1)
      },1000)
      return ()=>clearInterval(interval)
    }
  },[timer])

  const updateOtp = (value,index,type)=>{
    if(type==='student'){
      let arr=[...otpStudent]
      arr[index]=value
      setOtpStudent(arr)
    }else{
      let arr=[...otpParent]
      arr[index]=value
      setOtpParent(arr)
    }
  }

  const renderOtp = (type)=>{
    const data = type==='student'?otpStudent:otpParent

    return(
      <View style={styles.otpContainer}>
        {data.map((item,index)=>(
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={item}
            onChangeText={(val)=>updateOtp(val,index,type)}
          />
        ))}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <Image
        source={require("../assets/images/Logo.png")}
         style={styles.logo}
        />

        <Text style={styles.classroom}>Classroom</Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.title}>Registration</Text>
        <Text style={styles.subtitle}>Secure your details</Text>

        <Text style={styles.label}>Student ID</Text>
        <TextInput placeholder="Eg: R2012567" style={styles.input}/>

        <Text style={styles.label}>Student Name</Text>
        <TextInput placeholder="Cadabra" style={styles.input}/>

        <Text style={styles.label}>Email ID</Text>
        <TextInput placeholder="youremail@gmail.com" style={styles.input}/>

        <Text style={styles.label}>Birthday Date</Text>
        <View style={styles.inputIcon}>
          <TextInput placeholder="May 19, 1996" style={{flex:1}}/>
          <Icon name="calendar" size={20}/>
        </View>

        <Text style={styles.label}>Student Phone Number</Text>

        <View style={styles.phoneRow}>
          <TouchableOpacity style={styles.country}>
            <Text>+91</Text>
            <Icon name="chevron-down"/>
          </TouchableOpacity>

          <TextInput
            placeholder="34556 72356"
            style={styles.phoneInput}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.otpHeader}>
          <Text style={styles.label}>Code from SMS</Text>
          <Text style={styles.resend}>
            00:0{timer} Resend OTP
          </Text>
        </View>

        {renderOtp('student')}

        <Text style={styles.sectionTitle}>Parent/Guardian Details</Text>

        <Text style={styles.label}>Parent Guardian Name</Text>
        <TextInput placeholder="ABC" style={styles.input}/>

        <Text style={styles.label}>Relationship</Text>
        <View style={styles.dropdown}>
          <Picker>
            <Picker.Item label="Father" value="father"/>
            <Picker.Item label="Mother" value="mother"/>
            <Picker.Item label="Guardian" value="guardian"/>
          </Picker>
        </View>

        <Text style={styles.label}>Parent Phone Number</Text>

        <View style={styles.phoneRow}>
          <TouchableOpacity style={styles.country}>
            <Text>+91</Text>
            <Icon name="chevron-down"/>
          </TouchableOpacity>

          <TextInput
            placeholder="34556 72356"
            style={styles.phoneInput}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.otpHeader}>
          <Text style={styles.label}>Code from SMS</Text>
          <Text style={styles.resend}>
            00:0{timer} Resend OTP
          </Text>
        </View>

        {renderOtp('parent')}

        <TouchableOpacity>
          <LinearGradient
            colors={['#4c63ff','#3a4bd8']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
            <Icon name="arrow-right" color="#fff" size={20}/>
          </LinearGradient>
        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

container:{
  backgroundColor:'#c9ccd8',
  flex:1
},

header:{
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
  marginTop:40
},

classroom:{
  color:'#4c63ff',
  fontSize:18,
  fontWeight:'600'
},

card:{
  backgroundColor:'#fff',
  margin:20,
  borderRadius:20,
  padding:20
},

title:{
  fontSize:22,
  fontWeight:'700',
  textAlign:'center'
},

subtitle:{
  textAlign:'center',
  color:'#777',
  marginBottom:20
},

label:{
  marginTop:15,
  fontSize:14,
  color:'#555'
},

input:{
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  padding:12,
  marginTop:5
},

inputIcon:{
  flexDirection:'row',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  paddingHorizontal:12,
  marginTop:5
},

phoneRow:{
  flexDirection:'row',
  marginTop:5
},

country:{
  flexDirection:'row',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#4c63ff',
  borderRadius:12,
  padding:12,
  marginRight:10
},

phoneInput:{
  flex:1,
  borderWidth:1,
  borderColor:'#4c63ff',
  borderRadius:12,
  padding:12
},

otpHeader:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginTop:10
},

resend:{
  color:'green',
  fontSize:13
},

otpContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:10
},

otpBox:{
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  width:55,
  height:50,
  textAlign:'center',
  fontSize:18
},
logoContainer:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  marginBottom:25
},

logo:{
  width:45,
  height:45,
  resizeMode:"contain",
  marginRight:10
},

logoText:{
  fontSize:22,
  color:"#4c63ff",
  fontWeight:"600"
},

sectionTitle:{
  marginTop:25,
  fontWeight:'700',
  fontSize:18
},

dropdown:{
  borderWidth:1,
  borderColor:'#d6d9e0',
  borderRadius:12,
  marginTop:5
},

button:{
  marginTop:30,
  padding:15,
  borderRadius:12,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center'
},

buttonText:{
  color:'#fff',
  fontSize:16,
  fontWeight:'600',
  marginRight:10
}

})