import { CreateUser } from "../pages/admin/create-user/create-user";
import Employees from "../pages/admin/emplyees/employees";
import Generate from "../pages/qr/generate/generate";
import QrPage from "../pages/qr/qr";
import FirstScan from "../pages/qr/scan/first-scan";
import SecondScan from "../pages/qr/scan/second-scan";
import { Profile } from "../pages/user/profile/profile";

export const routes = [
    {
        link:'/',
        component: <QrPage/>,
    },
    {
        link:'/scan/first',
        component: <FirstScan/>,
    },
    {
        link:'/scan/second',
        component: <SecondScan/>,
    },
    {
        link:'/generate',
        component: <Generate/>,
        adminOnly:true,
    },
    {
        link:'/employees',
        component: <Employees/>,
        adminOnly:true,
    },
    {
        link:'/profile/:uuid',
        component: <Profile/>,
        adminOnly:true,
    },
    {
        link:'/profile',
        component: <Profile/>,
        adminOnly:false,
    },
    {
        link:'/user/:action',
        component: <CreateUser/>,
        adminOnly:true,
    },
    {
        link:'/user/:action/:uuid',
        component: <CreateUser/>,
        adminOnly:false,
    },
    
]