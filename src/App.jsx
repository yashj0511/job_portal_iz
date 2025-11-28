import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import { Button } from "@/components/ui/button"
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import PostJob from './pages/post-job';
import SavedJobs from './pages/saved-jobs';
import MyJobs from './pages/my-jobs';
import JobListing from './pages/job-listing';
import JobPage from './pages/job';
const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
       {
        path:'/onboarding',
        element:<Onboarding/>
      },
       {
        path:'/jobs',
        element:<JobListing/>
      },
      {
        path:'/post-job',
        element:<PostJob/>
      },
       {
        path:'/saved-jobs',
        element:<SavedJobs/>
      },
       {
        path:'/my-jobs',
        element:<MyJobs/>
      },
      {
        path:'/job/:id',
        element:<JobPage/>
      },
    
    
      
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
   )
     
  
}

export default App
