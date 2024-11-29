import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeProvider";
import GlobalStyles from "./styles/GlobalStyles";

import ProtectedRoute from "./features/authentication/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Timeline from "./pages/Timeline";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 60 * 5 * 1000,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/timeline",
      element: <Timeline />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/signup",
      element: <SignUp />,
    },
    {
      path: "/auth/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/auth/reset-password/:resetToken",
      element: <ResetPassword />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          containerStyle={{
            minWidth: "200px",
            padding: "1rem",
            marginRight: "2rem",
            zIndex: 99999,
          }}
          toastOptions={{
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "white",
              },
            },
          }}
        />
        <GlobalStyles />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
