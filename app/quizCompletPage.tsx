import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';

interface IProps{
 score: any
 reset: any,
}

const QuizCompleteScreen: React.FC<IProps> = ({score, reset}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: "600",}}>Congrats Quiz Completed Successfully</Text>
      <Text style={{fontWeight: "500"}}>Your Score is: {`${score}/10`}</Text>
      <TouchableOpacity onPress={reset}>
        <Text style={{color: "green"}}>Click To play again</Text>
      </TouchableOpacity>
    </View>
  )
}

export default QuizCompleteScreen

const styles = StyleSheet.create({
    container: {width: "100%",
     height: "100%", 
     alignItems: "center", 
     justifyContent: "center", 
     backgroundColor: "#e4e4e4",
     color: "#fff"
    }
})