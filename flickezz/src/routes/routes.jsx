import MainLayout from "../layouts/MainLayout";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Movie from "../pages/Movie";
import TvSeries from "../pages/TvSeries";
import Series from "../pages/Series";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import WaitingPage1 from "../pages/WaitingPage1";
import WaitingPage2 from "../pages/WaitingPage2";
import Blog from "../pages/Blog";
import BlogCategory from "../pages/BlogCategory";
import ViewBlog from "../pages/ViewBlog";
import CreateBlog from "../pages/admin/CreateBlog";
import AdminRoute from "./AdminRoute";

export const publicRoutes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  // {
  //   path: "/discover",
  //   element: (
  //     <MainLayout>
  //       <Discover />
  //     </MainLayout>
  //   ),
  // },
  {
    path: "/movies",
    element: (
      <MainLayout>
        <Movies />
      </MainLayout>
    ),
  },
  // {
  //   path: "/tv-series",
  //   element: (
  //     <MainLayout>
  //       <TvSeries />
  //     </MainLayout>
  //   ),
  // },
  {
    path: "/movies/:slug",
    element: (
      <MainLayout>
        <Movie />
      </MainLayout>
    ),
  },
  // {
  //   path: "/tv-series/:slug",
  //   element: (
  //     <MainLayout>
  //       <Series />
  //     </MainLayout>
  //   ),
  // },
  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
  },
  {
    path: "/privacy-policies",
    element: (
      <MainLayout>
        <PrivacyPolicy />
      </MainLayout>
    ),
  },
  {
    path: "/pending-download",
    element: (
      <MainLayout>
        <WaitingPage1 />
      </MainLayout>
    ),
  },
  {
    path: "/waiting-download",
    element: (
      <MainLayout>
        <WaitingPage2 />
      </MainLayout>
    ),
  },
  // {
  //   path: "/blog",
  //   element: (
  //     <MainLayout>
  //       <Blog />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: "/blogs/search",
  //   element: (
  //     <MainLayout>
  //       <BlogCategory />
  //     </MainLayout>
  //   ),
  // },
  // {
  //   path: "/blog/:slug",
  //   element: (
  //     <MainLayout>
  //       <ViewBlog />
  //     </MainLayout>
  //   ),
  // },
];

export const adminRoutes = [
  {
    path: "/admin/create-blog",
    element: (
      <AdminRoute>
        <MainLayout>
          <CreateBlog />
        </MainLayout>
      </AdminRoute>
    ),
  },
];
