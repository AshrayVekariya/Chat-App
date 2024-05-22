import Layout from "../layout/Index";
import RegisterPage from "../view/register/Register";
import SignInPage from "../view/sign-in/Index";

export const privateRoutes = [
    {
        label: 'Dashboard',
        to: '/dashboard',
        element: <Layout />,
    },
    {
        label: 'Profile',
        to: '/profile',
        element: <p>Profile</p>,
    }
];


export const publicRoutes = [
    {
        to: '/login',
        element: <SignInPage />
    },
    {
        to: '/register',
        element: <RegisterPage />
    },
    {
        to: '*',
        element: <>error</>
    }
]