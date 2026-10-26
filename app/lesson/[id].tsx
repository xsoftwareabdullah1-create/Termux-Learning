import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { lessons } from '../../data/lessons';
import Terminal from '../../components/terminal';
import { markCompleted } from '../../lib/progress';
export default function LessonScreen() {
 const { id } = useLocalSearchParams<{ id: string }>();
 const lesson = lessons.find(l => l.id === id);
 if (!lesson) return <View style={styles.container}><Text style={styles.missing}>Lesson not found.</Text></View>;
 return <View style={styles.container}>
  <View style={styles.top}><View style={{flex:1}}><Text style={styles.kicker}>TERMUX LEARN  /  TRAINING</Text><Text style={styles.title}>{lesson.title}</Text><Text style={styles.level}>{lesson.level}  ·  {lesson.commands.length} COMMANDS</Text></View><Text onPress={()=>router.back()} style={styles.close}>×</Text></View>
  <ScrollView style={styles.header} contentContainerStyle={{paddingBottom:12}}>
   <Text style={styles.desc}>{lesson.description}</Text>
   {lesson.commands.map((c,i)=><View key={i} style={styles.command}><Text style={styles.bullet}>{String(i+1).padStart(2,'0')}</Text><View style={{flex:1}}><Text style={styles.expl}>{c.explanation}</Text><Text style={styles.commandName}>{c.command}</Text></View></View>)}
  </ScrollView>
  <View style={styles.terminalWrap}><Terminal commands={lesson.commands} onAllComplete={()=>markCompleted(lesson.id)}/></View>
 </View>;
}
const styles=StyleSheet.create({
 container:{flex:1,backgroundColor:'#07111f'},
 top:{flexDirection:'row',alignItems:'center',paddingHorizontal:16,paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#1e3a56'},
 kicker:{color:'#7898b8',fontFamily:'monospace',fontSize:8,letterSpacing:1.5},title:{color:'#eaf5ff',fontSize:18,fontWeight:'900',marginTop:4},level:{color:'#68baff',fontSize:9,fontFamily:'monospace',fontWeight:'900',marginTop:5,letterSpacing:1},
 close:{color:'#80c4ff',fontSize:27,paddingHorizontal:8},
 header:{paddingHorizontal:15,paddingTop:12,maxHeight:195},desc:{color:'#a2b9d1',fontFamily:'monospace',fontSize:12,marginBottom:10,lineHeight:18},
 command:{flexDirection:'row',alignItems:'flex-start',paddingVertical:7,borderBottomWidth:1,borderBottomColor:'#152b40'},bullet:{color:'#559dd8',fontFamily:'monospace',fontSize:10,marginRight:10,marginTop:2},expl:{color:'#9ab2cc',fontFamily:'monospace',fontSize:11},commandName:{color:'#6dbaff',fontFamily:'monospace',fontSize:10,marginTop:3},
 terminalWrap:{flex:1,marginTop:6,borderTopWidth:1,borderTopColor:'#24425f'},missing:{color:'#fff',padding:40,fontFamily:'monospace'}
});
