import { db } from "../../database";
import {
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from "../Map/toast";


class MapDb {
  async editRoute(atts, id) {
    try {
      const userRef = collection(db, 'usuarios');
      const userId = await AsyncStorage.getItem("userID");
      const queryRef = query(userRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(queryRef);
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(userRef, userDoc.id);
      const userData = userDoc.data();
      const rotasFavoritas = userData.rotas_favoritas || [];
      
      const rotasAtualizadas = rotasFavoritas.map(rota => {
        if (rota.id === id) {
          const updatedRoute = { ...rota };
          for (const key in atts) {
            if (atts[key] !== null && atts[key] !== undefined) {
              updatedRoute[key] = atts[key];
            }
          }
          return updatedRoute;
        } else {
          return rota;
        }
      }).filter(rota => rota != null);

      await updateDoc(userDocRef, {
        rotas_favoritas: rotasAtualizadas
      });

      toast("Rota atualizada como favorita com sucesso!",'','success');
    } catch (err) {
      console.log("edit route", err);
      toast("Erro ao atualizar a rota como favorita.",'Verifique novamente os dados','error');
      throw err;
    }
  }
}

export default MapDb;
