import About from "./pages/about";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/registerPage";

export const routes=[
    { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
    {path:"*", element:<p>there are some error 3404</p>}
]