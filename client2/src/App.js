import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Fakultetet from "./pages/Fakultetet2";
import Login from "./pages/Login";
import Departamentet from "./pages/Departamentet";
import Programet from "./pages/Programet";
import Planpermbajtja from "./pages/Planpermbajtja";
import Pedagoget from "./pages/Pedagoget";
import DepartmentContent from "./pages/DepartmentContent";
import ProtectedRoute from "./pages/ProtectedRoute";
import ShtoFakultet from "./pages/ShtoFakultet";
import PedagogetContent from "./pages/PedagogetContent";
import WelcomePage from "./pages/WelcomePage";
import Users from "./pages/Users";
import ModifikoUser from "./pages/ModifikoUser";
import ShtoUser from "./pages/ShtoUser";
import Planet from "./pages/Planet";
import ForgotPassword from "./pages/ForgotPassword";
import Shtorresht from "./pages/Shtorresht";
import Planipdf from "./pages/Planipdf";
import Changepassbyadmin from "./components/Changepassbyadmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="fakultetet"
            element={
              <ProtectedRoute>
                <Fakultetet />
              </ProtectedRoute>
            }
          />

          <Route
            path="departamenti/:id/content"
            element={
              <ProtectedRoute>
                <DepartmentContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="pedagoget"
            element={
              <ProtectedRoute>
                <Pedagoget />
              </ProtectedRoute>
            }
          />

          <Route
            path="fakulteti/:id/departamentet"
            element={
              <ProtectedRoute>
                <Departamentet />
              </ProtectedRoute>
            }
          />
          <Route
            path="departamentet"
            element={
              <ProtectedRoute>
                <Departamentet />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:id/"
            element={
              <ProtectedRoute>
                <PedagogetContent />
              </ProtectedRoute>
            }
          />

          <Route
            path="users/:id/edit"
            element={
              <ProtectedRoute>
                <ModifikoUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/shtouser"
            element={
              <ProtectedRoute>
                <ShtoUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="planet"
            element={
              <ProtectedRoute>
                <Planet />
              </ProtectedRoute>
            }
          />
          <Route
            path="programi/:id/planet"
            element={
              <ProtectedRoute>
                <Planet />
              </ProtectedRoute>
            }
          />
          <Route
            path="plani/:id/planpermbajtja"
            element={
              <ProtectedRoute>
                <Planpermbajtja />
              </ProtectedRoute>
            }
          />
          <Route
            path="planpermbajtja/shtorresht/viti/:vid/plani/:pid"
            element={
              <ProtectedRoute>
                <Shtorresht />
              </ProtectedRoute>
            }
          />
          <Route
            path="plani/:pid/pdf"
            element={
              <ProtectedRoute>
                <Planipdf />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/password_reset/confirm/"
          element={<Changepassbyadmin />}
        />
        <Route path="/krijofakultet" element={<ShtoFakultet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
