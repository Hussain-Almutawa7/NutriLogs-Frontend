import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import FoodLog from "./pages/FoodLog"
import Browse from "./pages/Browse"
import Library from "./pages/Library"
import FoodDetails from "./pages/FoodDetails"
import ApiFoodDetails from "./pages/ApiFoodDetails"
import LogFoodPage from "./pages/LogFoodPage"
import FoodLogEntryDetails from "./pages/FoodLogEntryDetails"
import EditFoodLogEntryPage from "./pages/EditFoodLogEntryPage"
import CreateFood from "./pages/CreateFood"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          <Route path="/" element={user ? <Dashboard user={user} /> : <Landing />} />

          {/* FOOD LOGS ROUTES */}
          <Route path="/food-log" element={user ? <FoodLog /> : <Landing />} />
          <Route path="/foods/:foodId/log" element={user ? <LogFoodPage type="saved" /> : <Landing />} />
          <Route path="/nutrition/:externalId/log" element={user ? <LogFoodPage type="api" /> : <Landing />} />
          <Route path="/food-log/:entryId" element={user ? <FoodLogEntryDetails /> : <Landing />} />
          <Route path="/food-log/:entryId/edit" element={user ? <EditFoodLogEntryPage /> : <Landing />} />

          {/* FOOD ROUTES */}
          <Route path="/foods/new" element={user ? <CreateFood /> : <Landing />} />
          <Route path="/foods/:foodId" element={user ? <FoodDetails /> : <Landing />} />
          <Route path="/nutrition/:externalId" element={user ? <ApiFoodDetails /> : <Landing />} />

          {/* OTHER ROUTES */}
          <Route path="/browse" element={user ? <Browse /> : <Landing />} />
          <Route path="/library" element={user ? <Library /> : <Landing />} />
        </Routes>
      </main>
    </>
  )
}

export default App