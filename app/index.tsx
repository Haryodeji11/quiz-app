import { Image, StyleSheet, Platform, Text, View, StatusBar, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Option from '@/modules/option';
import { useEffect, useState } from 'react';
import { quizData } from '@/modules/question';
import QuizCompleteScreen from './quizCompletPage';

export default function HomeScreen() {
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState();
  const [question, setQuestion] = useState<any>([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [showResult, setShowResult] = useState(false)
  const [ifSelected, setIfSelected] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  })

  useEffect(()=>{
    setQuestion(quizData)
  },[])

  useEffect(()=>{
    const percentageComplete = (currentIndex + 1 )* 10
    setPercentageComplete(percentageComplete)
  },[currentIndex])
  
  const currentQuestion = question[currentIndex]
  const handleNext = () =>{
    const correctAnswer = question[currentIndex]?.answer;
    if(selectedOption === correctAnswer){
      setScore((prevScore) => prevScore + 1)
    }
    
    if(currentIndex < question.length - 1){
      setCurrentIndex((prevQuestion)=> prevQuestion + 1)
    } else setShowResult(true)

    setIfSelected({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    })
  }

  const option1 = () =>{
    setIfSelected({
      option1: true,
      option2: false,
      option3: false,
      option4: false,
    })
  }
  const option2 = () =>{
    setIfSelected({
      option1: false,
      option2: true,
      option3: false,
      option4: false,
    })
  }
  const option3 = () =>{
    setIfSelected({
      option1: false,
      option2: false,
      option3: true,
      option4: false,
    })
  }
  const option4 = () =>{
    setIfSelected({
      option1: false,
      option2: false,
      option3: false,
      option4: true,
    })
  }

  const Reset=() =>{
    setCurrentIndex(0),
    setShowResult(false);
  }

  if(showResult) return <QuizCompleteScreen reset={Reset} score={score} />
  return (
    <View style={styles.Container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.scoreContainer}>
        <Text style={{fontWeight: "600"}}>{`${currentIndex + 1} / ${question.length}`}</Text>
      </View>

      <View style={styles.questionWrapper}>
      <View style={styles.progressWrapper}>
        <View style={[styles.progressBar, {width: `${percentageComplete}%`}]}></View>
        <View style={styles.progressCount}>
        <Text style={styles.percentage}>{percentageComplete}</Text>
        </View>
      </View>
       <Text style={{fontWeight: "500", alignItems: "center"}}>{currentQuestion?.question}</Text>
      </View>

      <View style={{marginTop: 20}}>
        <Option setSelectedOption={setSelectedOption} checkIfSelected={option1} isSelected={ifSelected.option1} option={currentQuestion?.option[0]}/>
        <Option setSelectedOption={setSelectedOption} checkIfSelected={option2} isSelected={ifSelected.option2} option={currentQuestion?.option[1]}/>
        <Option setSelectedOption={setSelectedOption} checkIfSelected={option3} isSelected={ifSelected.option3} option={currentQuestion?.option[2]}/>
        <Option setSelectedOption={setSelectedOption} checkIfSelected={option4} isSelected={ifSelected.option4} option={currentQuestion?.option[3]}/>
      </View>

      <TouchableOpacity onPress={handleNext} style={styles.btn}>
         <Text style={{color: "white", fontWeight: "500"}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 Container: {
   flex: 1,
   backgroundColor: "#e4e4e4",
   padding: 20,
  },
  scoreContainer: {
   width: "100%",
   alignItems: "center",
   justifyContent: "center",
   paddingVertical: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "san-serif"
  },
  questionWrapper: {
    marginTop: 60,
    width: "100%",
    height: 180,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignItems: "center"
  },
  progressWrapper: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#ABD1C6",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    top: -50,
    bottom: 10
  },
  progressBar: {
    height: "100%",
    alignSelf: "flex-end",
    backgroundColor: "#004643"
  },
  progressCount: {
    width: 58,
    height: 58,
    borderRadius: 50,
    backgroundColor: "#fff",
    zIndex: 10,
    position: "absolute",
    top: 6,
    justifyContent: "center",
    alignItems: 'center'

  },
  percentage: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004643"
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#004643"
  }
});
