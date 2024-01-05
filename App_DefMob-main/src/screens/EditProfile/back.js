import { db } from "../../database";
import { collection, where, query, updateDoc, getDocs, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//Logica para editar
class EditProfileDb {
    async UpdateProfile(profileEdit) {
        try {
            // Pegar o ID do usuário logado
            const userId = await AsyncStorage.getItem("userID");
            console.log("Ta vindo ????", profileEdit);

            // Referência à coleção para conexão
            const profileRef = collection(db, 'usuarios');

            // Fazer uma consulta para buscar apenas o documento com o ID correspondente
            const q = query(profileRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            // Pegar apenas o documento daquele ID e referenciar a coleção com o userID
            const userDoc = querySnapshot.docs[0];
            const userDocRef = doc(profileRef, userDoc.id);

            // Atualizar o perfil
            await updateDoc(userDocRef, profileEdit, { merge: true });

            // Mostrar toast de sucesso
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Perfil atualizado com sucesso!',
                visibilityTime: 3000,
            });
            return true;

        } catch (error) {
            // Mostrar toast de erro genérico
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro durante a atualização do perfil',
                visibilityTime: 3000,
            });
            throw error;
        }
    }
}

export default EditProfileDb;
