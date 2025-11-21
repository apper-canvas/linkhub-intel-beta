import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout components
const MarketingLayout = lazy(() => import("@/components/organisms/MarketingLayout"));
const AppLayout = lazy(() => import("@/components/organisms/AppLayout"));

// Marketing pages
const MarketingHome = lazy(() => import("@/components/pages/marketing/MarketingHome"));
const MarketingPricing = lazy(() => import("@/components/pages/marketing/MarketingPricing"));
const MarketingAbout = lazy(() => import("@/components/pages/marketing/MarketingAbout"));
const MarketingContact = lazy(() => import("@/components/pages/marketing/MarketingContact"));

// App pages
const Login = lazy(() => import("@/components/pages/app/Login"));
const Signup = lazy(() => import("@/components/pages/app/Signup"));
const Dashboard = lazy(() => import("@/components/pages/app/Dashboard"));
const Profile = lazy(() => import("@/components/pages/app/Profile"));
const Links = lazy(() => import("@/components/pages/app/Links"));
const Theme = lazy(() => import("@/components/pages/app/Theme"));

// Public profile
const PublicProfile = lazy(() => import("@/components/pages/PublicProfile"));

// Error pages
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

// Marketing routes
const marketingRoutes = [
  {
    path: "",
    element: withSuspense(MarketingHome),
    index: true
  },
  {
    path: "pricing",
    element: withSuspense(MarketingPricing)
  },
  {
    path: "about", 
    element: withSuspense(MarketingAbout)
  },
  {
    path: "contact",
    element: withSuspense(MarketingContact)
  }
];

// App routes
const appRoutes = [
  {
    path: "",
    element: withSuspense(Dashboard),
    index: true
  },
  {
    path: "profile",
    element: withSuspense(Profile)
  },
  {
    path: "links",
    element: withSuspense(Links)
  },
  {
    path: "theme",
    element: withSuspense(Theme)
  }
];

const routes = [
  {
    path: "/",
    element: withSuspense(MarketingLayout),
    children: marketingRoutes
  },
  {
    path: "/login",
    element: withSuspense(Login)
  },
  {
    path: "/signup", 
    element: withSuspense(Signup)
  },
  {
    path: "/app",
    element: withSuspense(AppLayout),
    children: appRoutes
  },
  {
    path: "/u/:username",
    element: withSuspense(PublicProfile)
  },
  {
    path: "*",
    element: withSuspense(NotFound)
  }
];

export const router = createBrowserRouter(routes);