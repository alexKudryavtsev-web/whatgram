import LoginPage from "../pages/LoginPage.jsx";
import CreateAccountPage from "../pages/CreateAccountPage.jsx";
import Error404Page from "../pages/Error404Page.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import UserPage from "../pages/UserPage.jsx";
import ContactsPage from "../pages/ContactsPage.jsx";
import DialogPage from "../pages/DialogPage.jsx";
import EditProfilePage from "../pages/EditProfilePage.jsx";

const COMMON_ROUTES = [
  { path: "about", element: <AboutPage /> },
  { path: "*", element: <Error404Page /> },
];

const PUBLIC_ROUTES = [
  { path: "/", element: <LoginPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "create-account", element: <CreateAccountPage /> },
  ...COMMON_ROUTES,
];

const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <UserPage />,
    children: [
      { path: "contacts", element: <ContactsPage /> },
      { path: "dialog/:dialogId", element: <DialogPage /> },
      { path: "/", element: <ProfilePage /> },
      { path: "/edit", element: <EditProfilePage /> },
    ],
  },
  ...COMMON_ROUTES,
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
