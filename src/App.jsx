import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

//providers and other features
import { ThemeProvider } from "./context/ThemeProvider";
import GlobalStyles from "./styles/GlobalStyles";

// pages
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
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
      path: "/auth/resetpassword",
      element: <ForgotPassword />,
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
