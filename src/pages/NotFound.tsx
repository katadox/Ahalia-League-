
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <div className="text-xl text-muted-foreground mb-6">
          Oops! Page not found
        </div>
        <Button onClick={() => navigate("/")} size="lg">
          Return to Dashboard
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
