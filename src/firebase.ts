import { initializeApp } from "firebase/app"
import {
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database"
import { IDatabase, IIntervenantColors } from "./types"

const config = {
  apiKey: "AIzaSyAKnmClusQg4EMcdGz12I7QJww8MUwIzOs",
  authDomain: "editeur-d-habillage-live.firebaseapp.com",
  databaseURL: "https://editeur-d-habillage-live.firebaseio.com",
  projectId: "editeur-d-habillage-live",
  storageBucket: "editeur-d-habillage-live.appspot.com",
  messagingSenderId: "999195209442",
  appId: "1:999195209442:web:b3e0ea30058ecd1c6df8bb",
}

const app = initializeApp(config)
const db = getDatabase(app)

const getAllDatabase = async (): Promise<IDatabase> => {
  const starCountRef = ref(db, "/")
  const snapshot = await get(starCountRef)
  return snapshot.val()
}

const subscribeToIntervenantColors = async (
  onValueUpdate: (snapshot: DataSnapshot) => void
) => {
  const starCountRef = ref(db, "/configIntervenant/colorSettings")
  return await onValue(starCountRef, onValueUpdate)
}

const updateIntervenantColors = (data: IIntervenantColors) =>
  set(ref(db, "/configIntervenant/colorSettings/"), data)

export { getAllDatabase, subscribeToIntervenantColors, updateIntervenantColors }
