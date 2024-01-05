import { Share } from "react-native"

const onShare = async () => {
    const url = "https://chat.openai.com"

    try {
        const result = await Share.share({
            message: ("Venha conhecer a Moob" +"\n" +url),
        })
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log("shared with activity type of: ", result.activityType)
            } else {
                console.log("compartilhou")
            }
        } else if (result.action === Share.dismissedAction) {
            console.log("cancelou")
        }

    } catch (err) {
        console.log("ERRO AO COMPARTILHAR",err)
    }

}

export default onShare