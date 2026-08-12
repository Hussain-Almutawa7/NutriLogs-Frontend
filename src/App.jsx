import Nav from "./components/common/Nav"
import SignUpForm from "./pages/auth/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState } from "react"
import SignInForm from "./pages/auth/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import FoodLog from "./pages/foodLog/FoodLog"
import Browse from "./pages/food/Browse"
import Library from "./pages/food/Library"
import FoodDetails from "./pages/food/FoodDetails"
import ApiFoodDetails from "./pages/food/ApiFoodDetails"
import LogFoodPage from "./pages/foodLog/LogFoodPage"
import FoodLogEntryDetails from "./pages/foodLog/FoodLogEntryDetails"
import EditFoodLogEntryPage from "./pages/foodLog/EditFoodLogEntryPage"
import CreateFood from "./pages/food/CreateFood"
import EditFood from "./pages/food/EditFood"
import UserGoals from "./pages/UserGoals"
import NotFound from "./pages/NotFound"

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
      <div className="app-main">
        <Routes>
          <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          <Route path="/" element={user ? <Dashboard user={user} /> : <Landing />} />

          {/* FOOD ROUTES */}
          <Route path="/foods/new" element={user ? <CreateFood /> : <Landing />} />
          <Route path="/foods/:foodId" element={user ? <FoodDetails /> : <Landing />} />
          <Route path="/foods/:foodId/edit" element={user ? <EditFood /> : <Landing />} />
          <Route path="/nutrition/:externalId" element={user ? <ApiFoodDetails /> : <Landing />} />

          {/* FOOD LOGS ROUTES */}
          <Route path="/food-log" element={user ? <FoodLog /> : <Landing />} />
          <Route path="/foods/:foodId/log" element={user ? <LogFoodPage type="saved" /> : <Landing />} />
          <Route path="/nutrition/:externalId/log" element={user ? <LogFoodPage type="api" /> : <Landing />} />
          <Route path="/food-log/:entryId" element={user ? <FoodLogEntryDetails /> : <Landing />} />
          <Route path="/food-log/:entryId/edit" element={user ? <EditFoodLogEntryPage /> : <Landing />} />

          {/* OTHER ROUTES */}
          <Route path="/browse" element={user ? <Browse /> : <Landing />} />
          <Route path="/library" element={user ? <Library /> : <Landing />} />
          <Route path="/goals" element={user ? <UserGoals /> : <Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App