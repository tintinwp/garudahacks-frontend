import { BrowserRouter as RouterProvider } from "react-router-dom"
import Routing from "./routes/routes"
import MainLayout from "./layouts/main-layout"
import AllLayout from "./layouts/all-layout"

function App() {
  return (
    <>
      <RouterProvider>
        <AllLayout>
          <Routing/>
        </AllLayout>
      </RouterProvider>
    </>
  )
}

export default App
