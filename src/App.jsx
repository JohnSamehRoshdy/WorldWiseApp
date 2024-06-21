import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./Pages/Product";
// import HomePage from "./Pages/HomePage";
// import Pricing from "./Pages/Pricing";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";
// import PageNotFound from "./Pages/PageNotFound";

const HomePage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fullback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="product" element={<Product />}></Route>
              <Route path="pricing" element={<Pricing />}></Route>
              <Route path="login" element={<Login />}></Route>
              {/* <Route path="*" element={<NotFound />}></Route> */}
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
