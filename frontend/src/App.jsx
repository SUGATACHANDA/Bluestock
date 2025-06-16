import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IPOListing from "./pages/IPOListing";
import IPODetail from "./pages/IPODetail";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import ForgotPassword from "./pages/ForgotPasswordForm";
import Dashboard from "./pages/Dashboard";
import ManageIPO from "./pages/ManageIPO";
import RegisterNewIPO from "./pages/RegisterNewIPO";
import NotFoundPage from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPasswordForm";
import UpdateIPO from "./pages/UpdateIPO";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IPOListing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/manage-ipo" element={
          <ProtectedRoute>
            <ManageIPO />
          </ProtectedRoute>
        } />
        <Route path="/manage-ipo/register-ipo" element={
          <ProtectedRoute>
            <RegisterNewIPO />
          </ProtectedRoute>
        } />
        <Route path="/manage-ipo/update/:id" element={
          <ProtectedRoute>
            <UpdateIPO />
          </ProtectedRoute>
        } />
        <Route path="/ipo/:id" element={<IPODetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
