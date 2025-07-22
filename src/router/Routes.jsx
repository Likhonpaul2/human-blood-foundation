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
import DashboardHomeAdmin from "../dashboard/admin/DashboardHomeAdmin";
import AllUsers from "../dashboard/admin/AllUsers";
import AllRequest from "../dashboard/admin/AllRequest";
import ContentManagement from "../dashboard/admin/ContentManagement";
import AddBlogPage from "../dashboard/admin/AddBlogPage";
import SearchDonors from "../pages/SearchPage/SearchDonors";
import BloodDonationRequests from "../pages/BloodDonationRequest/BloodDonationRequests";
import DonationRequestDetails from "../pages/BloodDonationRequest/DonationRequestDetails";

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
            },
            {
                path: "/search-donors",
                element: <SearchDonors/>
            },
            {
                path: "/blood-donation-request",
                element: <BloodDonationRequests/>
            },
            {
                path: "/donation-request/:id",
                element: <DonationRequestDetails/>
            },
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
                path: "/dashboard/profile",
                element: <ProfilePage />
            },
            {
                path: "/dashboard/create-donation",
                element: <CreateRequest />
            },
            {
                path: "/dashboard/my-donation-requests",
                element: <MyRequest />
            },
            {
                path: "/dashboard/edit-donation/:id",
                element: <UpdateDetails />
            },



            {
                path: "/dashboard/admin",
                // index: true,
                element: <DashboardHomeAdmin />
            },
            {
                path: "/dashboard/all-users",
                element: <AllUsers />
            },
            {
                path: "/dashboard/all-blood-donation-request",
                element: <AllRequest />
            },
            {
                path: "/dashboard/content-management",
                element: <ContentManagement />
            },
            {
                path: "/dashboard/content-management/add-blog",
                element: <AddBlogPage />
            },



            {
                path: "/dashboard/volunteer",
                // index: true,
                element: <DashboardHomeAdmin />
            },
            {
                path: "/dashboard/all-blood-donation-request/volunteer",
                element: <AllRequest />
            },
            {
                path: "/dashboard/content-management/volunteer",
                element: <ContentManagement />
            },

        ]
    }
]);