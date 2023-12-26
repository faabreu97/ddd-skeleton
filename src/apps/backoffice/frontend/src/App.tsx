import {
  MutationCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import { PrivateRoute, PublicRoute } from './components/Routes';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';

const contextClass = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  warning: 'bg-orange-500',
  default: 'bg-white dark:bg-black',
  dark: 'bg-white-600 font-gray-300'
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: error => {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response?.data.message);
        }
      }
    }
  })
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName={options =>
          contextClass[options?.type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer mb-2'
        }
        bodyClassName={() => 'text-sm font-white flex p-3'}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<PublicRoute Component={Login} />} />
          <Route path="/" element={<PrivateRoute Component={Layout} />}>
            <Route
              path="/dashboard"
              element={<PrivateRoute Component={Dashboard} />}
            />
            <Route path="/users" element={<PrivateRoute Component={Users} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
