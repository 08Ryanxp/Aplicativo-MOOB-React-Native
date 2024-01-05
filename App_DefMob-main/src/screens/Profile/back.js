import { db } from "../../database";
import { collection, getDocs, where, query } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
class ProfileDb {
    async getProfile() {
        try {
            const userId = await AsyncStorage.getItem("userID");
            console.log("ID do usuario", userId);
            const profileRef = collection(db, 'usuarios');
            const q = query(profileRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const profile = [];
            querySnapshot.forEach((doc) => {
                profile.push(doc.data());
            });
            console.log("Profile voltando", profile);
            return profile;
        } catch (error) {
            console.log("Deu merda=> ", error);
            throw error;
        }
    }
}

export default ProfileDb;
