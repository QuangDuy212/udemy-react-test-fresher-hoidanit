import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './components/Home';
import RegisterPage from './pages/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import { ProtectedRoute, RoleBaseRoute } from './components/ProtectedRoute';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import DashboardAdmin from './pages/admin';
import BookPage from './pages/book';
import User from './components/Admin/User';
import Book from './components/Admin/Book';
import './styles/global.scss';
import OrderPage from './pages/order/OrderPage';
import HistoryOrder from './pages/historyOrder/HistoryOrder';
import ManageOrder from './components/Admin/Order/ManageOrder';

const Layout = () => {

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className='layout-app'>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  )
}



export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    ) return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  }
  useEffect(() => {
    getAccount();
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element:
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>,
        },
        {
          path: "history",
          element:
            <ProtectedRoute>
              <HistoryOrder />
            </ProtectedRoute>
        }
      ],
    },
    {
      path: "/admin",
      element:
        <>
          <RoleBaseRoute>
            <LayoutAdmin />
          </RoleBaseRoute>
        </>,
      errorElement: <NotFound />,

      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
        },
        {
          path: "user",
          element: <User />,
        },
        {
          path: "book",
          element: <Book />,
        },
        {
          path: "order",
          element:
            <ManageOrder />
          ,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

  ]);
  return (
    <>
      {isLoading === false
        || window.location.pathname === '/login'
        || window.location.pathname === '/register'
        || window.location.pathname === '/'
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  );
}
