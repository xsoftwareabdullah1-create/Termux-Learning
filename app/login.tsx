import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firebaseConfigured } from '../lib/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
 const [mode,setMode]=useState<'signin'|'signup'>('signin');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [busy,setBusy]=useState(false);
 const [showPassword,setShowPassword]=useState(false);
 const [request,response,promptAsync]=Google.useAuthRequest({
  androidClientId:process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  iosClientId:process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  webClientId:process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
 });
 useEffect(()=>{
  if(response?.type!=='success')return;
  const token=response.authentication?.idToken;
  if(!token){Alert.alert('Google sign-in','No ID token returned. Check OAuth client IDs.');return;}
  setBusy(true);
  signInWithCredential(auth,GoogleAuthProvider.credential(token))
   .then(()=>router.replace('/'))
   .catch(e=>Alert.alert('Google sign-in failed',e.message))
   .finally(()=>setBusy(false));
 },[response]);
 const submit=async()=>{
  if(!firebaseConfigured){Alert.alert('Setup required','Configure Firebase keys and enable Email/Password in Firebase Authentication.');return;}
  if(!email.trim()||password.length<6){Alert.alert('Check details','Enter a valid email and a password with at least 6 characters.');return;}
  setBusy(true);
  try{
   if(mode==='signup')await createUserWithEmailAndPassword(auth,email.trim(),password);
   else await signInWithEmailAndPassword(auth,email.trim(),password);
   router.replace('/');
  }catch(e:any){Alert.alert('Authentication error',e.message||'Please try again.');}
  finally{setBusy(false);}
 };
 return <KeyboardAvoidingView style={s.screen} behavior={Platform.OS==='ios'?'padding':undefined}>
  <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
   <View style={s.avatarOuter}><View style={s.avatarInner}><Text style={s.avatarGlyph}>◉</Text></View></View>
   <Text style={s.brand}>TERMUX <Text style={s.blue}>LEARN</Text></Text>
   <Text style={s.tag}>YOUR TERMINAL LEARNING HUB</Text>
   <View style={s.panel}>
    <Text style={s.heading}>{mode==='signin'?'Welcome back':'Create your account'}</Text>
    <Text style={s.sub}>Sign in to continue your command journey.</Text>
    <TextInput style={s.input} placeholder="Email ID" placeholderTextColor="#7188a4" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
    <View style={s.passwordWrap}>
     <TextInput style={s.passwordInput} placeholder="Password" placeholderTextColor="#7188a4" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none"/>
     <TouchableOpacity style={s.eye} onPress={()=>setShowPassword(v=>!v)} accessibilityLabel={showPassword?'Hide password':'Show password'}><Text style={s.eyeText}>{showPassword?'◉':'◎'}</Text></TouchableOpacity>
    </View>
    <View style={s.stats}>
     <View style={s.stat}><Text style={s.statLabel}>LEVEL NO.</Text><Text style={s.statValue}>01</Text></View>
     <View style={s.statDivider}/>
     <View style={s.stat}><Text style={s.statLabel}>MASTERY</Text><Text style={s.statValue}>0%</Text></View>
    </View>
    <TouchableOpacity style={[s.primary,busy&&s.disabled]} onPress={submit} disabled={busy}><Text style={s.primaryText}>{busy?'PLEASE WAIT…':mode==='signin'?'SIGN IN':'CREATE ACCOUNT'}</Text></TouchableOpacity>
    <Text style={s.or}>──────────  OR  ──────────</Text>
    <TouchableOpacity style={s.google} disabled={!request||busy} onPress={()=>promptAsync()}><Text style={s.googleText}>G   CONTINUE WITH GOOGLE</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=>setMode(mode==='signin'?'signup':'signin')}><Text style={s.switch}>{mode==='signin'?'New here? Create an account':'Already registered? Sign in'}</Text></TouchableOpacity>
   </View>
   {!firebaseConfigured&&<Text style={s.warning}>Firebase setup required to activate account sign-in.</Text>}
   <Text style={s.foot}>LEARN SAFELY · PRACTICE EVERY DAY</Text>
  </ScrollView>
 </KeyboardAvoidingView>;
}
const s=StyleSheet.create({
 screen:{flex:1,backgroundColor:'#07111f'},
 content:{flexGrow:1,justifyContent:'center',padding:22,paddingTop:38,paddingBottom:28},
 avatarOuter:{alignSelf:'center',width:112,height:112,borderRadius:56,borderWidth:2,borderColor:'#277ed4',alignItems:'center',justifyContent:'center',marginBottom:17,backgroundColor:'#0b1b2e',shadowColor:'#168cff',shadowOpacity:.25,shadowRadius:18,elevation:7},
 avatarInner:{width:88,height:88,borderRadius:44,borderWidth:1,borderColor:'#4ba8ff',alignItems:'center',justifyContent:'center',backgroundColor:'#102743'},
 avatarGlyph:{fontSize:48,color:'#7cc3ff'},
 brand:{color:'#f0f7ff',fontSize:25,fontWeight:'900',letterSpacing:3,textAlign:'center'},
 blue:{color:'#54adff'},
 tag:{color:'#7796b7',fontSize:9,letterSpacing:2.2,textAlign:'center',marginTop:8,marginBottom:28},
 panel:{backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#244568',borderRadius:24,padding:19},
 heading:{color:'#f0f7ff',fontSize:22,fontWeight:'800'},
 sub:{color:'#8ba5c2',fontSize:12,marginTop:6,marginBottom:18},
 input:{height:52,backgroundColor:'#081524',borderWidth:1,borderColor:'#31577d',borderRadius:28,paddingHorizontal:18,color:'#fff',marginBottom:12,fontSize:14},
 passwordWrap:{height:52,flexDirection:'row',alignItems:'center',backgroundColor:'#081524',borderWidth:1,borderColor:'#31577d',borderRadius:28,marginBottom:14},
 passwordInput:{flex:1,color:'#fff',paddingHorizontal:18,fontSize:14},
 eye:{width:48,height:48,alignItems:'center',justifyContent:'center'},
 eyeText:{color:'#73baff',fontSize:21},
 stats:{flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#244568',borderRadius:18,backgroundColor:'#0a1726',paddingVertical:11,marginBottom:15},
 stat:{flex:1,alignItems:'center'},statLabel:{color:'#7896b6',fontSize:9,fontWeight:'800',letterSpacing:1.5},statValue:{color:'#66b6ff',fontSize:18,fontWeight:'900',marginTop:4,fontFamily:'monospace'},
 statDivider:{height:32,width:1,backgroundColor:'#294866'},
 primary:{borderWidth:1,borderColor:'#53aaff',borderRadius:28,padding:15,alignItems:'center',backgroundColor:'#102b47'},
 disabled:{opacity:.55},primaryText:{color:'#8dccff',fontWeight:'900',letterSpacing:1.4},
 or:{color:'#6684a4',fontSize:10,textAlign:'center',marginVertical:15},
 google:{borderWidth:1,borderColor:'#4b6d8e',borderRadius:28,padding:14,alignItems:'center',backgroundColor:'#0a1726'},
 googleText:{color:'#e8f4ff',fontWeight:'800',fontSize:12,letterSpacing:.5},
 switch:{color:'#69baff',textAlign:'center',marginTop:19,fontSize:13,fontWeight:'700'},
 warning:{color:'#ffc978',fontSize:11,textAlign:'center',marginTop:14},
 foot:{color:'#506d8c',fontSize:9,textAlign:'center',letterSpacing:1.5,marginTop:23}
});
