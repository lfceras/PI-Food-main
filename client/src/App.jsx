import { RouterProvider} from 'react-router-dom'
import './App.css'
import router from '../routes/Routes.jsx'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
