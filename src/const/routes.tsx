import Employees from "../pages/admin/emplyees/employees";
import Generate from "../pages/qr/generate/generate";
import QrPage from "../pages/qr/qr";
import FirstScan from "../pages/qr/scan/first-scan";
import SecondScan from "../pages/qr/scan/second-scan";

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
]