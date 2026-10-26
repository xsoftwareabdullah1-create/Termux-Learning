import React, { useState, useRef } from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import type { Command } from '../data/lessons';

type Props = { commands: Command[]; onAllComplete: () => void };
const keys = ['ESC','CTRL','HOME','←','↓','→','END','PGDN'];

export default function Terminal({ commands, onAllComplete }: Props) {
 const [history,setHistory]=useState<string[]>(['TERMUX LEARN · PRACTICE TERMINAL','Type the exact lesson command and press Enter.','']);
 const [input,setInput]=useState('');
 const [step,setStep]=useState(0);
 const scrollRef=useRef<ScrollView>(null);
 const inputRef=useRef<TextInput>(null);
 const current=commands[step];
 const pressKey=(key:string)=>{
  if(key==='ESC')setInput('');
  else if(key==='CTRL'){setHistory(h=>[...h,'^C']);setInput('');}
  else if(key==='HOME')inputRef.current?.setNativeProps({selection:{start:0,end:0}});
  else if(key==='END')inputRef.current?.setNativeProps({selection:{start:input.length,end:input.length}});
  else if(key==='←'||key==='↑')inputRef.current?.focus();
  else if(key==='↓'||key==='→')inputRef.current?.focus();
  else if(key==='PGDN')scrollRef.current?.scrollToEnd({animated:true});
 };
 const handleSubmit=()=>{
  const cmd=input.trim(); if(!cmd)return;
  const lines=[`$ ${cmd}`];
  if(current&&cmd===current.command){
   if(current.warning)lines.push('⚠ '+current.warning);
   if(current.output)lines.push(current.output);
   lines.push('✓ Correct!');
   const next=step+1;setStep(next);
   if(next>=commands.length){lines.push('Lesson complete!');onAllComplete();}
   else lines.push(`Next: ${commands[next].explanation}`);
  }else lines.push(`✕ ${current?.hint??'Try again.'}`);
  setHistory(h=>[...h,...lines]);setInput('');
  setTimeout(()=>scrollRef.current?.scrollToEnd({animated:true}),50);
 };
 return <View style={styles.wrap}>
  <View style={styles.terminalHead}><View style={styles.dot}/><Text style={styles.headText}>TERMINAL SESSION</Text><Text style={styles.counter}>{Math.min(step,commands.length)}/{commands.length}</Text></View>
  <ScrollView ref={scrollRef} style={styles.output} contentContainerStyle={{paddingBottom:18}}>
   {history.map((line,i)=><Text key={i} style={styles.line}>{line}</Text>)}
   {current&&<Text style={styles.hint}>NEXT COMMAND  ›  {current.command}</Text>}
  </ScrollView>
  <View style={styles.keyRow}>{keys.map(key=><Pressable key={key} onPress={()=>pressKey(key)} style={({pressed})=>[styles.key,{transform:[{scale:pressed?.94:1}],borderColor:pressed?'#54adff':'#31577d'}]}><Text style={styles.keyText}>{key}</Text></Pressable>)}</View>
  <View style={styles.inputRow}>
   <Text style={styles.prompt}>$</Text>
   <TextInput ref={inputRef} style={styles.input} value={input} onChangeText={setInput} onSubmitEditing={handleSubmit} autoCapitalize="none" autoCorrect={false} placeholder="type a command..." placeholderTextColor="#607b98" returnKeyType="send" blurOnSubmit={false}/>
   <Pressable onPress={handleSubmit} style={({pressed})=>[styles.send,{transform:[{scale:pressed?.94:1}]}]}><Text style={styles.sendText}>RUN</Text></Pressable>
  </View>
 </View>;
}
const styles=StyleSheet.create({
 wrap:{flex:1,backgroundColor:'#07111f',borderTopWidth:1,borderTopColor:'#1e3a56'},
 terminalHead:{height:38,flexDirection:'row',alignItems:'center',paddingHorizontal:12,borderBottomWidth:1,borderBottomColor:'#1c3328'},
 dot:{width:7,height:7,borderRadius:4,backgroundColor:'#38f49b',marginRight:8},headText:{color:'#91a9c2',fontFamily:'monospace',fontSize:10,letterSpacing:1,flex:1},counter:{color:'#38f49b',fontFamily:'monospace',fontSize:11},
 output:{flex:1,padding:12},line:{color:'#c5e4ff',fontFamily:'monospace',fontSize:12,marginBottom:5},hint:{color:'#38f49b',fontFamily:'monospace',fontSize:11,marginTop:12},
 keyRow:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',paddingHorizontal:7,paddingVertical:7,borderTopWidth:1,borderTopColor:'#1c3328',gap:5},
 key:{minWidth:35,flexGrow:1,alignItems:'center',justifyContent:'center',paddingVertical:9,paddingHorizontal:5,borderWidth:1,borderRadius:7,backgroundColor:'#0c1b2c'},keyText:{color:'#b8f5ce',fontFamily:'monospace',fontSize:10,fontWeight:'800'},
 inputRow:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:10,borderTopWidth:1,borderTopColor:'#1c3328'},
 prompt:{color:'#38f49b',fontFamily:'monospace',marginRight:8,fontSize:16},input:{flex:1,color:'#eff7ff',fontFamily:'monospace',fontSize:13,padding:8},send:{borderWidth:1,borderColor:'#38f49b',borderRadius:8,paddingHorizontal:14,paddingVertical:9,marginLeft:6},sendText:{color:'#80c4ff',fontFamily:'monospace',fontWeight:'900',fontSize:11}
});
