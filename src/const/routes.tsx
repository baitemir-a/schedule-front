import Generate from "../pages/qr/generate/generate";
import QrPage from "../pages/qr/qr";
import Scan from "../pages/qr/scan/scan";

export const routes = [
    {
        link:'/',
        component: <QrPage/>,
    },
    {
        link:'/scan',
        component: <Scan/>,
    },
    {
        link:'/generate',
        component: <Generate/>,
        adminOnly:true,
    }
]