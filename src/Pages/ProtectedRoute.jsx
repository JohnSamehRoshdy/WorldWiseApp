import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthunticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthunticated) navigate("/");
    },
    [isAuthunticated, navigate]
  );
  return isAuthunticated ? children : null;
}

export default ProtectedRoute;
