import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset"
import Verify from "./pages/auth/Verify";
import Resend from "./pages/auth/Resend";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getLoginStatus } from "./services/authService";
import { selectRole, SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import Product from "./pages/product/Product";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import EditProfile from "./pages/profile/EditProfile";
import Profile from "./pages/profile/Profile";
import Store from "./pages/store/Store";
import StoreItem from "./pages/store/StoreItem";
import ProcessOrder from "./pages/order/ProcessOrder";
import StudentOrders from "./pages/order/StudentOrders";
import StudentTransactions from "./pages/order/StudentTransactions";
import OrderReceipt from "./pages/order/OrderReceipt";
import StudentSidebar from "./components/sidebar/StudentSidebar";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import LecturerOrders from "./pages/order/LecturerOrders";
import ViewStudentProfile from "./pages/profile/ViewStudentProfile";
import LecturerTransactions from "./pages/order/LecturerTransactions";
import LecturerWithdraw from "./pages/withdraw/LecturerWithdraw";
import ResetPin from "./pages/auth/ResetPin";
import AdminSidebar from "./components/sidebar/AdminSidebar";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminLecturers from "./pages/admin/lecturer/AdminLecturers";
import AdminStudents from "./pages/admin/student/AdminStudents";
import AdminOrders from "./pages/admin/order/AdminOrders";
import AdminTransactions from "./pages/admin/transaction/AdminTransactions";
import AdminWithdraws from "./pages/admin/withdraw/AdminWithdraws";
import AdminBanks from "./pages/admin/bank/AdminBanks";
import AdminProducts from "./pages/admin/product/AdminProducts";
import AdminViewProduct from "./pages/admin/product/AdminViewProduct";
import AdminLecturerProfile from "./pages/admin/lecturer/AdminLecturerProfile";
import AdminStudentProfile from "./pages/admin/student/AdminStudentProfile";
import AdminEditBank from "./pages/admin/bank/AdminEditBank";
import AdminCreateBank from "./pages/admin/bank/AdminCreateBank";
import AuthorStore from "./pages/store/AuthorStore";
import UploadProductSoftcopy from "./pages/product/UploadProductSoftcopy";
import PageNotFound from "./pages/pageNotFound/PageNotFound";



axios.defaults.withCredentials = true;

function App() {
  const role = useSelector(selectRole);
  let userDashboard = '/login';
  if(role === 'Admin'){
    userDashboard = '/admin/dashboard';
  }else if(role === 'Lecturer'){
    userDashboard = '/dashboard';
  }else if(role === 'Student'){
    userDashboard = '/account/dashboard';
  }
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus(){
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus()
  }, [dispatch]);
  
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* <Route path="/login" element={role === '' ? (<Login /> ) : (<Navigate to={userDashboard} />)} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={role === '' ? (<Register />) : (<Navigate to={userDashboard} />)} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/resetpassword/:resetToken" element={<Reset />} />
      <Route path="/reset-pin/:token" element={<ResetPin />} />
      <Route path="/confirm-email/:token" element={<Verify />} />
      <Route path="/resend-link" element={<Resend />} />
      <Route path="/receipt/:transactionCode" element={<OrderReceipt />} />

  
{/* Admin route starts here */}
    <Route path="/admin/dashboard" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/admin/lecturers" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminLecturers />
            </Layout>
          </AdminSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/students" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminStudents />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard}/>)
      }/>
      <Route path="/admin/products" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminProducts />
            </Layout>
          </AdminSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/admin/orders" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminOrders />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/transactions" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminTransactions />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/admin/withdraw" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminWithdraws />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/banks" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminBanks />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/profile" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <Profile />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/admin/product/:url" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminViewProduct />
            </Layout>
          </AdminSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/lecturer/:lecturerId" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminLecturerProfile />
            </Layout>
          </AdminSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/admin/student-profile/:studentId" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminStudentProfile />
            </Layout>
          </AdminSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/bank/:bankId" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminEditBank />
            </Layout>
          </AdminSidebar>
            ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/admin/banks/create" element={role === 'Admin' ? (
          <AdminSidebar >
            <Layout>
              <AdminCreateBank />
            </Layout>
          </AdminSidebar>
            ) : (<Navigate to={userDashboard} />)
      }/>
      
     
      {/* Admin's route ends here */}

      
{/* lecturer route starts here */}
      <Route path="/dashboard" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/add-product" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <AddProduct />
            </Layout>
          </Sidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/products" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <Product />
            </Layout>
          </Sidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
    <Route path="/product-detail/:id" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <ProductDetail />
            </Layout>
          </Sidebar>
            ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/edit-product/:id" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <EditProduct />
            </Layout>
          </Sidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/profile" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <Profile />
            </Layout>
          </Sidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
        <Route path="/orders" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <LecturerOrders />
            </Layout>
          </Sidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
        <Route path="/student-profile/:userId" element={role === 'Lecturer' ? (
          <Sidebar >
            <Layout>
              <ViewStudentProfile />
            </Layout>
          </Sidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/transactions" element={role === 'Lecturer' ? (  
          <Sidebar >
            <Layout>
              <LecturerTransactions />
            </Layout>
          </Sidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/withdraw" element={role === 'Lecturer' ? (  
          <Sidebar >
            <Layout>
              <LecturerWithdraw />
            </Layout>
          </Sidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/product/upload-softcopy/:productId" element={role === 'Lecturer' ? (  
          <Sidebar >
            <Layout>
              <UploadProductSoftcopy />
            </Layout>
          </Sidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      
      {/* Lecturer's route ends here */}
      {/* Student's route starts here */}
      <Route path="/account/dashboard" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <StudentDashboard />
            </Layout>
          </StudentSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/account/store" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <Store />
            </Layout>
          </StudentSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/account/product/:url" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <StoreItem />
            </Layout>
          </StudentSidebar>
            ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/account/order/:id" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <ProcessOrder />
            </Layout>
          </StudentSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/account/my-orders" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <StudentOrders />
            </Layout>
          </StudentSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      
     <Route path="/account/transactions" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <StudentTransactions />
            </Layout>
          </StudentSidebar>
          ) : (<Navigate to={userDashboard} />)
      }/>
       <Route path="/account/profile" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <Profile />
            </Layout>
          </StudentSidebar>
            ) : (<Navigate to={userDashboard} />)
      }/>
      <Route path="/account/products/author/:userId" element={role === 'Student' ? ( 
          <StudentSidebar >
            <Layout>
              <AuthorStore />
            </Layout>
          </StudentSidebar>
           ) : (<Navigate to={userDashboard} />)
      }/>
      {/* Student's Sidebar ends here */}
     
        {/* page not found */}
        <Route path="*" element={<PageNotFound />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
