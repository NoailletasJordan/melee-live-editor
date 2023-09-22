import { IGroup } from "@/types"
import Chooser from "random-seed-weighted-chooser"
import { v4 as uuidv4 } from "uuid"

export const generateNewGroup = (): IGroup => ({
  hidden: true,
  id: uuidv4(),
  intervenants: [],
  title: "",
})

export const getRandomSubmitMessage = () => {
  const SUBMIT_MESSAGES = [
    { label: "C'est validé !", weight: 10 },
    { label: "Et c'est dans la boite !", weight: 10 },
    { label: "On est bon !", weight: 10 },
    { label: "Ok 👌", weight: 5 },
    { label: "Je vous ai ... compris !", weight: 3 },
    { label: "Imagine un jour j'le fais plus 😈", weight: 2 },
    { label: "Ca part en prod'", weight: 4 },
    { label: "Il y a un problème... ah non c'est bon 👍", weight: 3 },
  ]
  return (Chooser.chooseWeightedObject(SUBMIT_MESSAGES) as any)?.label
}

export const getNonHiddenIntervenants = (groups: IGroup[]) =>
  groups
    .filter(({ hidden }) => !hidden)
    .flatMap(({ intervenants }) => intervenants || [])
