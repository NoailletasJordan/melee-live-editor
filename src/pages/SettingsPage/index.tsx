import { useParams } from "react-router-dom"

const SettingsPage = () => {
  const { roomId } = useParams()
  /** Temp */
  console.log({ roomId })

  return (
    <div>
      <div>SettingsPage</div>
    </div>
  )
}

export default SettingsPage
