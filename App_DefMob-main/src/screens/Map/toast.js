import Toast from "react-native-toast-message"

export const toast = (txt1,txt2,type) => {
    Toast.show({
        type: type,
        position: "bottom",
        text1: txt1,
        text2: txt2,
        visibilityTime: 3000,
    })
}