import { useParams } from "react-router-dom"

interface Props {}

const BannerPage = ({}: Props) => {
  const { roomId } = useParams()
  /** Temp */
  console.log({ roomId })

  return (
    <div>
      <div>BannerPage</div>
    </div>
  )
}

export default BannerPage
