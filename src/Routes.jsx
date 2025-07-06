import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import ProfileDetailView from "pages/profile-detail-view";
import ProfileSetup from "pages/profile-setup";
import NeighborhoodDiscovery from "pages/neighborhood-discovery";
import ActivitySuggestions from "pages/activity-suggestions";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/profile-detail-view" element={<ProfileDetailView />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/neighborhood-discovery" element={<NeighborhoodDiscovery />} />
        <Route path="/activity-suggestions" element={<ActivitySuggestions />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;