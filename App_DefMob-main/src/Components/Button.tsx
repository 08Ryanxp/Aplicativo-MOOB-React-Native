import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import styles from "./style";

interface ButtonProps {
    title: string;
  }
  
  export function Button({ title }: ButtonProps) {
    const handleButtonPress = () => {
      Alert.alert('Solicitação enviada com sucesso! ');
    };
  
    return (
      <TouchableOpacity onPress={handleButtonPress} style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }