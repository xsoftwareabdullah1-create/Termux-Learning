import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { lessons } from '../data/lessons';
import { getCompleted } from '../lib/progress';
export default function Home() {
 const [done,setDone]=useState<string[]>([]);
 useFocusEffect(useCallback(()=>{getCompleted().then(setDone);},[]));
 const pct=lessons.length?Math.round(done.length/lessons.length*100):0;
 return <View style={styles.container}>
  <Text style={styles.brand}>TERMUX <Text style={styles.green}>LEARN</Text></Text>
  <Text style={styles.subtitle}>Master the terminal, one command at a time.</Text>
  <Link href="/login" asChild><TouchableOpacity style={styles.login}><Text style={styles.loginText}>SIGN IN / GOOGLE ACCOUNT  ↗</Text></TouchableOpacity></Link>
  <View style={styles.progressBox}><Text style={styles.progressText}>LEARNING PROGRESS   {pct}%</Text><Text style={styles.progressSub}>{done.length} of {lessons.length} lessons completed</Text><View style={styles.track}><View style={[styles.fill,{width:pct+'%'}]}/></View></View>
  <FlatList data={lessons} keyExtractor={l=>l.id} renderItem={({item})=>{
   const completed=done.includes(item.id);
   return <Link href={`/lesson/${item.id}`} asChild><TouchableOpacity style={styles.card}>
    <View style={styles.cardTop}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.check}>{completed?'✓':'›'}</Text></View>
    <Text style={styles.badge}>{item.level}</Text><Text style={styles.desc}>{item.description}</Text>
   </TouchableOpacity></Link>;
  }}/>
 </View>;
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#070d0b',padding:16,paddingTop:20},brand:{color:'#f0fff7',fontSize:23,fontWeight:'900',letterSpacing:2},green:{color:'#38f49b'},subtitle:{color:'#82978c',marginTop:6,marginBottom:14,fontFamily:'monospace',fontSize:12},
 login:{borderWidth:1,borderColor:'#38f49b',borderRadius:11,padding:12,alignItems:'center',marginBottom:14},loginText:{color:'#54f9a8',fontSize:11,fontWeight:'900',letterSpacing:1},
 progressBox:{backgroundColor:'#0d1713',padding:14,borderRadius:13,marginBottom:14,borderWidth:1,borderColor:'#294537'},progressText:{color:'#54f9a8',fontFamily:'monospace',fontSize:12,fontWeight:'800'},progressSub:{color:'#82978c',fontSize:11,marginTop:5},track:{height:5,backgroundColor:'#21372c',borderRadius:5,marginTop:12,overflow:'hidden'},fill:{height:5,backgroundColor:'#38f49b',borderRadius:5},
 card:{backgroundColor:'#0d1713',padding:15,borderRadius:13,marginBottom:10,borderWidth:1,borderColor:'#20372c'},cardTop:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},cardTitle:{color:'#f0fff7',fontSize:15,fontFamily:'monospace',fontWeight:'700'},check:{color:'#38f49b',fontSize:22},badge:{color:'#38f49b',fontSize:10,marginTop:7,fontFamily:'monospace',fontWeight:'800'},desc:{color:'#91a79a',fontSize:12,marginTop:6,lineHeight:18}
});
