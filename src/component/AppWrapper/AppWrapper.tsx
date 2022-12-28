import { Leaderboard, Poll } from "@mui/icons-material";
import { Route, Routes} from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { ResponsiveAppBar } from "../ResponsiveAppBar/ResponsiveAppBar";


export const AppWrapper = () => {
  return (
    <div>
      <ResponsiveAppBar />
      {/* <Routes>
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/answered"
            element={<Poll />}
          />
          <Route
            path="/polls/:question"
            element={<Poll />}
          />
        </Routes> */}
    </div>
  )
}
