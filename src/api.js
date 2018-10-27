import axios from "axios";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";


const api = axios.create({
  baseURL: "https://randomuser.me/api"
});

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");

export const fetchUser = async () => {
  try {
    const {
      data: { results }
    } = await api.get("/?nat=us&results=50");

    return results.map(user => ({
      id: user.id.value,
      name: `${user.name.first} ${user.name.last}`,
      picture: user.picture.thumbnail,
      email: user.email
    }));
  } catch (error) {
    console.log(error);
  }
};

export default api;
