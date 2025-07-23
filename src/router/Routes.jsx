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
import BlogListPage from "../pages/Blogs/BlogListPage";
import BlogDetailPage from "../pages/Blogs/BlogDetailPage";
import FundingPage from "../pages/FundingPage/FundingPage";

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
                element: <SearchDonors />
            },
            {
                path: "/blood-donation-request",
                element: <BloodDonationRequests />
            },
            {
                path: "/donation-request/:id",
                element: <ProtectedRoute><DonationRequestDetails /></ProtectedRoute>
            },
            {
                path: "/blogs",
                element: <BlogListPage />
            },
            {
                path: "/blogs/:id",
                element: <ProtectedRoute><BlogDetailPage /></ProtectedRoute>
            },
            {
                path: "/funding",
                element: <ProtectedRoute><FundingPage /></ProtectedRoute>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashBoardLayout />,
        children: [
            {
                index: true,
                element: <ProtectedRoute><OverView /></ProtectedRoute>
            },
            {
                path: "/dashboard/profile",
                element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
            },
            {
                path: "/dashboard/create-donation",
                element: <ProtectedRoute><CreateRequest /></ProtectedRoute>
            },
            {
                path: "/dashboard/my-donation-requests",
                element: <ProtectedRoute><MyRequest /></ProtectedRoute>
            },
            {
                path: "/dashboard/edit-donation/:id",
                element: <ProtectedRoute><UpdateDetails /></ProtectedRoute>
            },



            {
                path: "/dashboard/admin",
                // index: true,
                element: <ProtectedRoute><DashboardHomeAdmin /></ProtectedRoute>
            },
            {
                path: "/dashboard/all-users",
                element: <ProtectedRoute><AllUsers /></ProtectedRoute>
            },
            {
                path: "/dashboard/all-blood-donation-request",
                element: <ProtectedRoute><AllRequest /></ProtectedRoute>
            },
            {
                path: "/dashboard/content-management",
                element: <ProtectedRoute><ContentManagement /></ProtectedRoute>
            },
            {
                path: "/dashboard/content-management/add-blog",
                element: <ProtectedRoute><AddBlogPage /></ProtectedRoute>
            },



            {
                path: "/dashboard/volunteer",
                // index: true,
                element: <ProtectedRoute><DashboardHomeAdmin /></ProtectedRoute>
            },
            {
                path: "/dashboard/all-blood-donation-request/volunteer",
                element: <ProtectedRoute><AllRequest /></ProtectedRoute>
            },
            {
                path: "/dashboard/content-management/volunteer",
                element: <ProtectedRoute><ContentManagement /></ProtectedRoute>
            },

        ]
    }
]);