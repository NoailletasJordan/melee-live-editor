import { isNotEmpty } from "@mantine/form"

export const VALIDATION = {
  name: isNotEmpty("Entrer un nom"),
  company: isNotEmpty("Entrer une entreprise"),
}
