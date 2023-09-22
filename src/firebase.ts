// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app"
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore"
import { IDatabase, IIntervenantColors, IRoomData } from "./types"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "view-editor-live.firebaseapp.com",
  projectId: "view-editor-live",
  storageBucket: "view-editor-live.appspot.com",
  messagingSenderId: "126278027442",
  appId: "1:126278027442:web:2474fdef70e6106077a1ab",
  measurementId: "G-3GZGE4RCBE",
}

const app2 = initializeApp(firebaseConfig)
const db = getFirestore(app2)

export const subscribeToIntervenantColors = async (
  onValueUpdate: (colorsConfig: IIntervenantColors) => void
) => {
  const unsubscriber = onSnapshot(doc(db, "config", "intervenants"), (doc) =>
    onValueUpdate(doc.data() as IIntervenantColors)
  )

  return unsubscriber
}

export const getRooms = async (): Promise<IDatabase["rooms"]> => {
  const querySnapshot = await getDocs(collection(db, "rooms"))
  const rooms: { [x: string]: any } = {}
  querySnapshot.forEach((doc) => {
    rooms[doc.id] = doc.data()
  })
  return rooms as IDatabase["rooms"]
}

export const updateIntervenantColor = async ({
  data,
  colorField,
}: {
  data: string
  colorField: keyof IIntervenantColors
}) => {
  const ref = doc(db, "config", "intervenants")
  await setDoc(ref, { [colorField]: data }, { merge: true })
}

interface IsubscribeToRoom {
  onValueUpdate: (groups: IRoomData) => void
  roomId: string
}
export const subscribeToRoom = async ({
  onValueUpdate,
  roomId,
}: IsubscribeToRoom) => {
  const unsubscriber = onSnapshot(doc(db, "rooms", roomId), (doc) =>
    onValueUpdate(doc.data() as IRoomData)
  )

  return unsubscriber
}

export const updateRoom = async ({
  roomId,
  newFields,
}: {
  roomId: string
  newFields: Partial<IRoomData>
}) => {
  const ref = doc(db, "rooms", roomId)
  await setDoc(ref, newFields, { merge: true })
}
