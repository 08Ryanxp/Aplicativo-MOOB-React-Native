import { db } from "../../database";
import { collection, addDoc, getDocs, updateDoc, query, where, doc, arrayUnion, getDoc, deleteDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//Linkar com o banco
class MapDb {

    async addMarker(marker) {
        try {
            const userRef = collection(db, 'marcadores');
            const docRef = await addDoc(userRef, marker);
            console.log("Marker adicionado com sucesso=> ", marker);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Marcador adicionado!',
                visibilityTime: 3000,
              });
            return docRef.id;
            return true;
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro ao adicionar o marcador!',
                visibilityTime: 3000,
              });
            console.log("Erro ao adicionar o marcador ", error);
            throw error;
        }
    }
    async getMarker() {
        try {

            const markerRef = collection(db, 'marcadores');
            const querySnapshot = await getDocs(markerRef);
            const markers = [];

            querySnapshot.forEach((doc) => {
                markers.push(doc.data());
            });

           
            return markers;
        } catch (error) {
            console.log("Erro marcadores voltando=>", error);
            throw error;
        }
    }
    async UpdateMarker(marker) {
        console.log("Chegou aqui", marker)
        try {
            // Pegar o ID do usuário logado
            const idMarker = await marker.idMarker;
            console.log("Ta vindo ????", marker.idMarker);

            // Referência à coleção para conexão
            const profileRef = collection(db, 'marcadores');

            // Fazer uma consulta para buscar apenas o documento com o ID correspondente
            const q = query(profileRef, where('idMarker', '==', idMarker));
            const querySnapshot = await getDocs(q);


            // Pegar apenas o documento daquele ID e referenciar a coleção com o userID
            const userDoc = querySnapshot.docs[0];
            const userDocRef = userDoc.ref; // Obtenha a referência diretamente do documento



            // Atualizar o perfil
            await updateDoc(userDocRef, marker, { merge: true });

            // Mostrar toast de sucesso
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Marcador atualizado com sucesso!',
                visibilityTime: 3000,
            });
            return true;

        } catch (error) {
            // Mostrar toast de erro genérico
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro durante a atualização do marcador',
                visibilityTime: 3000,
            });
            throw error;
        }
    }
    async RemoveMarker(marker) {
        console.log("Chegou aqui", marker)
        try {
            // Pegar o ID do usuário logado
            const idMarker = await marker.idMarker;
            console.log("Ta vindo ????", marker.idMarker);

            // Referência à coleção para conexão
            const profileRef = collection(db, 'marcadores');

            // Fazer uma consulta para buscar apenas o documento com o ID correspondente
            const q = query(profileRef, where('idMarker', '==', idMarker));
            const querySnapshot = await getDocs(q);


            // Pegar apenas o documento daquele ID e referenciar a coleção com o userID
            const userDoc = querySnapshot.docs[0];
            const userDocRef = userDoc.ref; // Obtenha a referência diretamente do documento



            // Atualizar o perfil
            await deleteDoc(userDocRef, marker, { merge: true });

            // Mostrar toast de sucesso
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Marcador excluido com sucesso!',
                visibilityTime: 3000,
            });
            return true;

        } catch (error) {
            // Mostrar toast de erro genérico
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro ao tentar excluir o marcador',
                visibilityTime: 3000,
            });
            throw error;
        }
    }
    async addRoute(newRoute) {
        try {
            const newFavRef = collection(db, 'usuarios');
            const userId = await AsyncStorage.getItem("userID");
            const q = query(newFavRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            // Pegar apenas o documento daquele ID e referenciar a coleção com o userID
            const userDoc = querySnapshot.docs[0];
            const userDocRef = doc(newFavRef, userDoc.id);

            // Atualizar adicionando a nova rota ao array existente
            await updateDoc(userDocRef, {
                rotas_favoritas: arrayUnion(newRoute)
            });

            console.log('Nova rota favorita', newRoute);
            return "AMÉM";
        } catch (err) {
            console.log("LÁGRIMAS EM ADD ROUTE => ", err);
            throw err;
        }
    }

    async getRoute() {
        try {
            const userId = await AsyncStorage.getItem("userID");
            const favsRef = collection(db, 'usuarios');
            const q = query(favsRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            // Pegar apenas o documento daquele ID e referenciar a coleção com o userID
            const userDoc = querySnapshot.docs[0];
            const userDocRef = doc(favsRef, userDoc.id);
            let routeList = []
            if (!querySnapshot.empty) {
                const data = await getDoc(userDocRef);
                // quero pegar mais de um rota favorita,
                // mas eu só precisa do array que está dentro desses dados
                // para isso uso .data().rotas_favoritas
                routeList = data.data().rotas_favoritas;
            } else {
                routeList = [];
            }
            // console.log("Rotas Favoritas", routeList);
            return routeList;
        } catch (err) {
            console.log("ERRO getRoute", err);
            throw err;
        }
    }
    async removeRouteDB(routeIdToRemove) {
        try {
            const userRef = collection(db, 'usuarios');
            const userId = await AsyncStorage.getItem("userID");
            const queryRef = query(userRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(queryRef);
            // Encontra o documento do usuário com base na consulta
            const userDoc = querySnapshot.docs[0];
            // Referência ao documento específico do usuário encontrado
            const userDocRef = doc(userRef, userDoc.id);
            // Obtém os dados do documento do usuário
            const userData = userDoc.data();
            // Obtém o array 'rotas_favoritas' do documento do usuário ou um array vazio caso não exista
            const favoriteRoutes = userData.rotas_favoritas || [];
            // Itera sobre cada rota no array 'rotas_favoritas'
            const updatedRoutes = favoriteRoutes.map(route => {
                // Verifica se o ID da rota corresponde ao ID a ser removido
                if (route.id === routeIdToRemove) {
                    return null; // Marca o objeto como nulo para indicar que será removido
                }
                return route; // Mantém as rotas que não correspondem ao ID a ser removido
            }).filter(route => route !== null); // Filtra os valores nulos, ou seja, remove o objeto marcado como nulo

            // Atualiza o documento no Firestore com o array de rotas atualizado
            await updateDoc(userDocRef, {
                rotas_favoritas: updatedRoutes
            });

            console.log('Rota removida com sucesso', routeIdToRemove);
            return "Aleluia! Rota removida";
        } catch (err) {
            console.log("Erro ao remover rota => ", err);
            throw err;
        }
    }






}

export default MapDb;
