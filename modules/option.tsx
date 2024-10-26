import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
interface IProps {
  isSelected?: boolean,
  option?: string,
  checkIfSelected?: () => void,
  setSelectedOption?: any;
}

const Option: React.FC<IProps> = ({isSelected, option, checkIfSelected, setSelectedOption}) => {

const handleSelected = () =>{
  if(checkIfSelected){
    setSelectedOption(option)
    checkIfSelected() 
  }
}

  return (
    <TouchableOpacity onPress={handleSelected} activeOpacity={0.8} style={[styles.optionWrapper, {backgroundColor: isSelected ? "#ABD16C": "#fff"}]}>
      <Text style={{fontWeight: "500"} }>{option}</Text>
    </TouchableOpacity>
  )
}

export default Option

const styles = StyleSheet.create({
    optionWrapper: {
        width: "100%",
        height: 45,
        borderRadius: 16,
        paddingHorizontal: 12,
        justifyContent: "center",
        marginBottom: 20,
    }
})