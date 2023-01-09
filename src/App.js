import { Loader } from "./components/Loader/Loader"
import AuthRoutes from "./pages/AuthRoutes"
import LayoutRoutes from "./pages/LayoutRoutes"
import { useAuth } from "./provider/useAuth"



export const App = () => {

  const { admin, isLoading } = useAuth()

  if (isLoading) return <Loader height={'80vh'} />


  return !admin ? <AuthRoutes /> : <LayoutRoutes />
}