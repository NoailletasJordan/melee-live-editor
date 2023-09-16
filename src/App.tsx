import HomePage from "@/pages/HomePage"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/index"
import "./firebase.ts"
import { getAllDatabase } from "./firebase.ts"
import BannerPage from "./pages/BannerPage/index.tsx"
import SettingsPage from "./pages/SettingsPage/index.tsx"
import { IDatabase } from "./types.ts"

const App = () => {
  const [allData, setAllData] = useState<IDatabase>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const res = await getAllDatabase()
      setIsLoading(false)
      setAllData(res)
    })()
  }, [])

  const roomsDataWithId = Object.entries(allData?.salles || {}).map(
    ([roomId, roomData]) => ({
      id: roomId,
      ...roomData,
    })
  )

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <BrowserRouter>
        <Layout navbarConfig={roomsDataWithId} isLoading={isLoading}>
          <Routes>
            <Route
              index
              element={
                <HomePage isLoading={isLoading} roomsWithId={roomsDataWithId} />
              }
            />
            <Route path="/:roomId/settings" element={<SettingsPage />} />
            <Route path="/:roomId/banner" element={<BannerPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
