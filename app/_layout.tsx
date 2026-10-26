import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';
import { auth, firebaseConfigured } from '../lib/firebase';

export default function RootLayout() {
 const [ready,setReady]=useState(false);
 const [signedIn,setSignedIn]=useState(false);
 const router=useRouter();
 const segments=useSegments();
 useEffect(()=>{
  if(!firebaseConfigured){setReady(true);return;}
  return onAuthStateChanged(auth,user=>{setSignedIn(!!user);setReady(true);});
 },[]);
 useEffect(()=>{
  if(!ready)return;
  const onLogin=segments[0]==='login';
  if(firebaseConfigured&&!signedIn&&!onLogin)router.replace('/login');
  else if(firebaseConfigured&&signedIn&&onLogin)router.replace('/');
 },[ready,signedIn,segments]);
 if(!ready)return <View style={{flex:1,backgroundColor:'#070d0b',alignItems:'center',justifyContent:'center'}}><ActivityIndicator color="#38f49b"/></View>;
 return <><StatusBar style="light"/><Stack screenOptions={{headerStyle:{backgroundColor:'#070d0b'},headerTintColor:'#38f49b',headerTitleStyle:{fontFamily:'monospace'},contentStyle:{backgroundColor:'#070d0b'}}}>
  <Stack.Screen name="login" options={{headerShown:false}}/>
  <Stack.Screen name="index" options={{title:'Termux Learn'}}/>
  <Stack.Screen name="lesson/[id]" options={{title:'Lesson'}}/>
 </Stack></>;
}