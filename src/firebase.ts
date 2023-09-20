import { initializeApp } from "firebase/app"
import { get, getDatabase, onValue, ref, set } from "firebase/database"
import { IDatabase, IIntervenantColors, IRoomData } from "./types"

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
  onValueUpdate: (colorsConfig: IIntervenantColors) => void
) => {
  const starCountRef = ref(db, "/configIntervenant/colorSettings")
  return await onValue(starCountRef, (snapshot) =>
    onValueUpdate(snapshot.val())
  )
}

interface IsubscribeToRoomGroups {
  onValueUpdate: (groups: IRoomData["groups"]) => void
  roomId: string
}
const subscribeToRoomGroups = async ({
  onValueUpdate,
  roomId,
}: IsubscribeToRoomGroups) => {
  const starCountRef = ref(db, `/salles/${roomId}/groups`)
  return await onValue(starCountRef, (snapshot) =>
    onValueUpdate(snapshot.val())
  )
}

const updateIntervenantColor = ({
  data,
  colorField,
}: {
  data: string
  colorField: keyof IIntervenantColors
}) => set(ref(db, `/configIntervenant/colorSettings/${colorField}`), data)

export {
  getAllDatabase,
  subscribeToIntervenantColors,
  subscribeToRoomGroups,
  updateIntervenantColor,
}

// temp
// const tempsUpdateGroups = () => set(ref(db, `/salles/hall/groups`), data)
// tempsUpdateGroups()
