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
import ApplyJob from './pages/Applyjob';
import ApplicationSuccess from './pages/ApplicationSuccess';
import MyReferrals from './pages/MyRefferals';
import { ThemeProvider } from './components/theme-provider';
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
       {
        path:'/apply/:id',
        element:<ApplyJob/>
      },
        {
        path:'/success',
        element:<ApplicationSuccess/>
      },
       {
        path:'/myrefferals',
        element:<MyReferrals/>
      },
    
      
    ],
  },
]);

function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
   )
}

export default App
