import { IGroup } from "@/types"
import { v4 as uuidv4 } from "uuid"
// @ts-expect-error: Not typed library
import pick from "pick-random-weighted"

export const generateNewGroup = (): IGroup => ({
  hidden: true,
  id: uuidv4(),
  intervenants: [],
  title: "",
})

export const getRandomSubmitMessage = () => {
  const SUBMIT_MESSAGES: [string, number][] = [
    ["C'est validé !", 10],
    ["Et c'est dans la boite !", 10],
    ["On est bon !", 10],
    ["Ok 👌", 10],
    ["Je vous ai ... compris !", 2],
    ["Imagine un jour j'le fais plus 😈", 2],
    ["Ca part en prod'", 5],
    ["Il y a un problème... ah non c'est bon 👍", 3],
  ]
  return pick(SUBMIT_MESSAGES)
}
