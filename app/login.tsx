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
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [busy,setBusy]=useState(false);
 const [request,response,promptAsync]=Google.useAuthRequest({
  androidClientId:process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  iosClientId:process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  webClientId:process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
 });
 useEffect(()=>{ if(response?.type==='success'){
  const token=response.authentication?.idToken;
  if(!token){Alert.alert('Google sign-in','No ID token returned. Check OAuth client IDs.');return;}
  setBusy(true); signInWithCredential(auth,GoogleAuthProvider.credential(token)).then(()=>router.replace('/')).catch(e=>Alert.alert('Google sign-in failed',e.message)).finally(()=>setBusy(false));
 }},[response]);
 const submit=async()=>{
  if(!firebaseConfigured){Alert.alert('Setup required','Add Firebase values from .env.example and enable Email/Password in Firebase Authentication.');return;}
  if(!email.trim()||password.length<6){Alert.alert('Check details','Enter a valid email and password with at least 6 characters.');return;}
  setBusy(true);try{if(mode==='signup')await createUserWithEmailAndPassword(auth,email.trim(),password);else await signInWithEmailAndPassword(auth,email.trim(),password);router.replace('/');}
  catch(e:any){Alert.alert('Authentication error',e.message||'Please try again.');}finally{setBusy(false);}
 };
 return <KeyboardAvoidingView style={s.screen} behavior={Platform.OS==='ios'?'padding':undefined}><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
  <View style={s.logo}><Text style={s.logoText}>$</Text></View><Text style={s.brand}>TERMUX<Text style={s.green}> LEARN</Text></Text><Text style={s.tag}>MASTER THE TERMINAL. ONE COMMAND AT A TIME.</Text>
  <View style={s.panel}><Text style={s.heading}>{mode==='signin'?'Welcome back':'Create your account'}</Text><Text style={s.sub}>Save your learning progress across devices.</Text>
   <TextInput style={s.input} placeholder="Email address" placeholderTextColor="#718096" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
   <TextInput style={s.input} placeholder="Password (6+ characters)" placeholderTextColor="#718096" value={password} onChangeText={setPassword} secureTextEntry/>
   <TouchableOpacity style={s.primary} onPress={submit} disabled={busy}><Text style={s.primaryText}>{busy?'PLEASE WAIT…':mode==='signin'?'SIGN IN':'CREATE ACCOUNT'}</Text></TouchableOpacity>
   <Text style={s.sub}>──────────  OR  ──────────</Text>
   <TouchableOpacity style={s.google} disabled={!request||busy} onPress={()=>promptAsync()}><Text style={s.googleText}>G  Continue with Google</Text></TouchableOpacity>
   <TouchableOpacity onPress={()=>setMode(mode==='signin'?'signup':'signin')}><Text style={s.switch}>{mode==='signin'?"New here? Create an account":'Already registered? Sign in'}</Text></TouchableOpacity>
  </View>{!firebaseConfigured&&<Text style={s.warning}>Firebase is not configured. Add keys listed in .env.example.</Text>}
  <Text style={s.foot}>LEARN SAFELY · PRACTICE IN A SIMULATED TERMINAL</Text>
 </ScrollView></KeyboardAvoidingView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#070d0b'},content:{flexGrow:1,justifyContent:'center',padding:24,paddingTop:55,paddingBottom:30},logo:{alignSelf:'center',width:72,height:72,borderRadius:22,borderWidth:1,borderColor:'#27e58b',alignItems:'center',justifyContent:'center',backgroundColor:'#0c2018',marginBottom:18},logoText:{color:'#38f49b',fontSize:42,fontWeight:'800'},brand:{color:'#f0fff7',fontSize:25,fontWeight:'900',letterSpacing:3,textAlign:'center'},green:{color:'#38f49b'},tag:{color:'#779587',fontSize:9,letterSpacing:2,textAlign:'center',marginTop:8,marginBottom:32},panel:{backgroundColor:'#0d1713',borderWidth:1,borderColor:'#20372c',borderRadius:22,padding:20},heading:{color:'#f0fff7',fontSize:23,fontWeight:'800'},sub:{color:'#82978c',fontSize:12,marginTop:7,marginBottom:18},input:{backgroundColor:'#08110d',borderWidth:1,borderColor:'#294537',borderRadius:12,padding:15,color:'#fff',marginBottom:12,fontSize:14},primary:{borderWidth:1,borderColor:'#38f49b',borderRadius:12,padding:15,alignItems:'center',marginTop:4,backgroundColor:'#0d281c'},primaryText:{color:'#54f9a8',fontWeight:'900',letterSpacing:1},google:{borderWidth:1,borderColor:'#557565',borderRadius:12,padding:14,alignItems:'center'},googleText:{color:'#eafff2',fontWeight:'700'},switch:{color:'#54f9a8',textAlign:'center',marginTop:22,fontSize:13,fontWeight:'700'},warning:{color:'#ffca72',fontSize:11,textAlign:'center',marginTop:16},foot:{color:'#526b5d',fontSize:9,textAlign:'center',letterSpacing:1.5,marginTop:26}});
