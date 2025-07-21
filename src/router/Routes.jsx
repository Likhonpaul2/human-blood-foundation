import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashBoardLayout from "../layout/DashBoardLayout";
import ProfilePage from "../dashboard/profile/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import OverView from "../dashboard/donor/OverView";
import DashboardHome from "../dashboard/donor/DashboardHome";
import CreateRequest from "../dashboard/donor/CreateRequest";
import MyRequest from "../dashboard/donor/MyRequest";
import UpdateDetails from "../shared/UpdateDetails/UpdateDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashBoardLayout />,
        children: [
            {
                index: true,
                element: <OverView />
            },
            {
                path:"/dashboard/profile",
                element: <ProfilePage/>
            },
            {
                path:"/dashboard/create-donation",
                element: <CreateRequest/>
            },
            {
                path:"/dashboard/my-donation-requests",
                element: <MyRequest/>
            },
            {
                path:"/dashboard/edit-donation/:id",
                element: <UpdateDetails/>
            },

        ]
    }
]);