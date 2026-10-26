import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Link, useFocusEffect, router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { lessons } from '../data/lessons';
import { getCompleted } from '../lib/progress';
import { auth, firebaseConfigured } from '../lib/firebase';

type Tab='levels'|'settings'|'terminal'|'help';
const nav: {id:Tab;label:string;glyph:string}[]=[
 {id:'levels',label:'LEVEL',glyph:'▤'},
 {id:'settings',label:'SETTINGS',glyph:'⚙'},
 {id:'terminal',label:'TERMINAL',glyph:'>_'},
 {id:'help',label:'HELP',glyph:'?'}
];
export default function Home() {
 const [done,setDone]=useState<string[]>([]);
 const [tab,setTab]=useState<Tab>('levels');
 useFocusEffect(useCallback(()=>{getCompleted().then(setDone);},[]));
 const pct=lessons.length?Math.round(done.length/lessons.length*100):0;
 const completedCommands=lessons.filter(l=>done.includes(l.id)).reduce((n,l)=>n+l.commands.length,0);
 const renderLevels=()=> <FlatList data={lessons} keyExtractor={l=>l.id} contentContainerStyle={styles.list} renderItem={({item,index})=>{
  const completed=done.includes(item.id);
  return <Link href={`/lesson/${item.id}`} asChild><TouchableOpacity style={styles.card}>
   <View style={styles.cardTop}><View style={styles.number}><Text style={styles.numberText}>{String(index+1).padStart(2,'0')}</Text></View><View style={styles.cardCopy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.badge}>{item.level}  ·  {item.commands.length} COMMANDS</Text></View><Text style={styles.check}>{completed?'✓':'›'}</Text></View>
   <Text style={styles.desc}>{item.description}</Text>
  </TouchableOpacity></Link>;
 }}/>;
 const renderSettings=()=> <ScrollView contentContainerStyle={styles.page}>
  <Text style={styles.sectionTitle}>SETTINGS</Text>
  <View style={styles.profile}><View style={styles.profileAvatar}><Text style={styles.profileGlyph}>◉</Text></View><View style={{flex:1}}><Text style={styles.profileTitle}>LEARNER PROFILE</Text><Text style={styles.profileSub}>{firebaseConfigured?'Firebase account enabled':'Guest learning mode'}</Text></View></View>
  <View style={styles.statGrid}><View style={styles.statCard}><Text style={styles.statLabel}>LEVEL NO.</Text><Text style={styles.statValue}>{Math.max(1,Math.floor(done.length/3)+1)}</Text></View><View style={styles.statCard}><Text style={styles.statLabel}>MASTERY</Text><Text style={styles.statValue}>{pct}%</Text></View><View style={styles.statCard}><Text style={styles.statLabel}>COMMANDS</Text><Text style={styles.statValue}>{completedCommands}</Text></View></View>
  <Pressable style={styles.outlineButton} onPress={()=>router.push('/login')}><Text style={styles.outlineText}>SIGN IN / GOOGLE ACCOUNT</Text></Pressable>
  {firebaseConfigured&&<Pressable style={styles.outlineButton} onPress={async()=>{await signOut(auth);router.replace('/login');}}><Text style={styles.outlineText}>SIGN OUT</Text></Pressable>}
  <Text style={styles.note}>Your lesson progress is saved on this device. Account sync requires Firebase configuration.</Text>
 </ScrollView>;
 const renderTerminal=()=> <ScrollView contentContainerStyle={styles.page}>
  <Text style={styles.sectionTitle}>TERMINAL</Text>
  <View style={styles.terminalCard}><Text style={styles.terminalMark}>$ _</Text><Text style={styles.terminalTitle}>PRACTICE CONSOLE</Text><Text style={styles.terminalSub}>Train with guided commands in a safe simulated terminal.</Text><Pressable style={styles.outlineButton} onPress={()=>router.push('/lesson/start-here')}><Text style={styles.outlineText}>OPEN TERMINAL  ↗</Text></Pressable></View>
  <Text style={styles.sectionTitle}>QUICK COMMANDS</Text>
  {['pwd','ls -la','pkg update','pkg install python','python --version','git status'].map(cmd=><View key={cmd} style={styles.commandRow}><Text style={styles.commandText}>{cmd}</Text><Text style={styles.commandType}>LEARN</Text></View>)}
 </ScrollView>;
 const renderHelp=()=> <ScrollView contentContainerStyle={styles.page}>
  <Text style={styles.sectionTitle}>HELP & SAFETY</Text>
  {[
   ['How does practice work?','Type the exact command shown in a lesson. The simulator checks your answer and gives a hint.'],
   ['Does this run commands on Android?','No. The in-app terminal is a safe simulator and does not access or modify your real Termux files.'],
   ['How do I install Termux?','Install Termux from a trusted source, then use pkg update to refresh packages.'],
   ['What should I learn first?','Start with First steps, then files, packages, permissions and networking.'],
   ['Can I use destructive commands?','Learn what they do first. Never copy commands you do not understand, especially rm, chmod, curl pipes and scripts.']
  ].map(([q,a])=><View key={q} style={styles.helpCard}><Text style={styles.helpQuestion}>{q}</Text><Text style={styles.helpAnswer}>{a}</Text></View>)}
 </ScrollView>;
 return <View style={styles.container}>
  <View style={styles.header}>
   <View><Text style={styles.brand}>TERMUX <Text style={styles.blue}>LEARN</Text></Text><Text style={styles.subtitle}>COMMAND TRAINING SYSTEM</Text></View>
   <Pressable onPress={()=>setTab('settings')} style={styles.avatarButton}><Text style={styles.avatarText}>◉</Text></Pressable>
  </View>
  {tab==='levels'&&<View style={styles.progressBox}><View style={styles.progressTop}><Text style={styles.progressText}>LEARNING PROGRESS</Text><Text style={styles.progressPercent}>{pct}%</Text></View><Text style={styles.progressSub}>{done.length} / {lessons.length} LEVELS COMPLETED</Text><View style={styles.track}><View style={[styles.fill,{width:pct+'%'}]}/></View></View>}
  {tab==='levels'?renderLevels():tab==='settings'?renderSettings():tab==='terminal'?renderTerminal():renderHelp()}
  <View style={styles.nav}>{nav.map(n=><Pressable key={n.id} onPress={()=>setTab(n.id)} style={({pressed})=>[styles.navItem,tab===n.id&&styles.navActive,{opacity:pressed?.7:1}]}><Text style={[styles.navGlyph,tab===n.id&&styles.navSelected]}>{n.glyph}</Text><Text style={[styles.navLabel,tab===n.id&&styles.navSelected]}>{n.label}</Text></Pressable>)}</View>
 </View>;
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#07111f'},
 header:{height:66,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:17,borderBottomWidth:1,borderBottomColor:'#1e3a56'},
 brand:{color:'#f0f7ff',fontSize:21,fontWeight:'900',letterSpacing:2},blue:{color:'#54adff'},
 subtitle:{color:'#7796b7',fontSize:9,letterSpacing:2,marginTop:4,fontFamily:'monospace'},
 avatarButton:{width:40,height:40,borderRadius:20,borderWidth:1,borderColor:'#4b9ce5',alignItems:'center',justifyContent:'center',backgroundColor:'#102743'},avatarText:{color:'#80c4ff',fontSize:22},
 progressBox:{margin:14,padding:14,borderRadius:16,backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#294b6c'},
 progressTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},progressText:{color:'#9ab9d8',fontFamily:'monospace',fontSize:10,letterSpacing:1.2,fontWeight:'800'},progressPercent:{color:'#64b7ff',fontSize:19,fontWeight:'900'},progressSub:{color:'#7896b6',fontSize:9,marginTop:5,letterSpacing:1,fontFamily:'monospace'},
 track:{height:5,backgroundColor:'#203c58',borderRadius:8,marginTop:12,overflow:'hidden'},fill:{height:5,backgroundColor:'#54adff',borderRadius:8},
 list:{paddingHorizontal:14,paddingBottom:18},card:{backgroundColor:'#0c1b2c',padding:14,borderRadius:15,marginBottom:10,borderWidth:1,borderColor:'#203d5a'},
 cardTop:{flexDirection:'row',alignItems:'center'},number:{width:38,height:38,borderRadius:12,borderWidth:1,borderColor:'#3b85c5',alignItems:'center',justifyContent:'center',backgroundColor:'#102743'},numberText:{color:'#71bcff',fontFamily:'monospace',fontWeight:'900'},
 cardCopy:{flex:1,marginLeft:11},cardTitle:{color:'#eff7ff',fontSize:14,fontFamily:'monospace',fontWeight:'800'},badge:{color:'#67b8ff',fontSize:9,marginTop:5,letterSpacing:1,fontWeight:'900'},check:{color:'#70c0ff',fontSize:25,paddingHorizontal:6},desc:{color:'#91a9c2',fontSize:11,marginTop:10,lineHeight:17},
 page:{padding:16,paddingBottom:25},sectionTitle:{color:'#7ebfff',fontFamily:'monospace',fontWeight:'900',fontSize:12,letterSpacing:2,marginBottom:14,marginTop:6},
 profile:{flexDirection:'row',alignItems:'center',backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#294b6c',borderRadius:16,padding:16,marginBottom:14},profileAvatar:{width:48,height:48,borderRadius:24,borderWidth:1,borderColor:'#4b9ce5',alignItems:'center',justifyContent:'center',marginRight:12},profileGlyph:{color:'#80c4ff',fontSize:25},profileTitle:{color:'#eaf5ff',fontWeight:'900',fontSize:13},profileSub:{color:'#88a4c1',fontSize:11,marginTop:5},
 statGrid:{flexDirection:'row',gap:8,marginBottom:16},statCard:{flex:1,padding:12,borderRadius:13,borderWidth:1,borderColor:'#294b6c',backgroundColor:'#0c1b2c',alignItems:'center'},statLabel:{color:'#7896b6',fontSize:8,fontWeight:'800',letterSpacing:1},statValue:{color:'#70bdff',fontSize:19,fontWeight:'900',marginTop:6},
 outlineButton:{borderWidth:1,borderColor:'#54adff',borderRadius:24,padding:14,alignItems:'center',marginBottom:10,backgroundColor:'#102743'},outlineText:{color:'#80c4ff',fontSize:11,fontWeight:'900',letterSpacing:1},
 note:{color:'#7896b6',fontSize:11,lineHeight:17,marginTop:10},
 terminalCard:{borderWidth:1,borderColor:'#2c6597',borderRadius:18,backgroundColor:'#0c1b2c',padding:17,marginBottom:20},terminalMark:{color:'#65baff',fontFamily:'monospace',fontSize:24,fontWeight:'900'},terminalTitle:{color:'#eff7ff',fontWeight:'900',fontSize:16,letterSpacing:1,marginTop:8},terminalSub:{color:'#8da9c5',fontSize:12,lineHeight:18,marginTop:7,marginBottom:16},
 commandRow:{height:44,borderWidth:1,borderColor:'#1e3d5b',borderRadius:10,marginBottom:8,paddingHorizontal:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#0a1928'},commandText:{color:'#b6d9fa',fontFamily:'monospace',fontSize:12},commandType:{color:'#60b5ff',fontSize:9,fontWeight:'900',letterSpacing:1},
 helpCard:{backgroundColor:'#0c1b2c',borderWidth:1,borderColor:'#244563',borderRadius:13,padding:14,marginBottom:10},helpQuestion:{color:'#e8f4ff',fontWeight:'800',fontSize:13},helpAnswer:{color:'#91a9c2',fontSize:11,lineHeight:17,marginTop:7},
 nav:{height:70,flexDirection:'row',borderTopWidth:1,borderTopColor:'#24425f',backgroundColor:'#091725',paddingHorizontal:6,paddingBottom:6},navItem:{flex:1,alignItems:'center',justifyContent:'center',marginHorizontal:3,marginTop:5,borderRadius:12},navActive:{backgroundColor:'#102a43',borderWidth:1,borderColor:'#3277b4'},navGlyph:{color:'#6d89a6',fontSize:19,fontWeight:'900'},navLabel:{color:'#6d89a6',fontSize:8,fontWeight:'900',letterSpacing:.7,marginTop:3},navSelected:{color:'#7bc3ff'}
});
