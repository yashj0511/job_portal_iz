import {Outlet} from "react-router-dom";
import Header from "../components/header";
const AppLayout=()=>{
    return (
    <div>
        <div className=""> </div>
        <main className="min-h-screen container">
             <Header/>
             <Outlet/>
        </main>
       {/* <div className="p-10 text-center bg-grey-800 mt-10">
        Made with ❤️ by Yash 
       </div> */}
    </div>);
};

export default AppLayout;