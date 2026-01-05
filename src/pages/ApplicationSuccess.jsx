import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold text-green-600">
        Application Submitted 🎉
      </h1>
      <p className="mt-4 text-gray-600">
        Thank you for applying. Our team will get back to you.
      </p>

      <Button
        className="mt-6 bg-purple-700 hover:bg-purple-800"
        onClick={() => navigate("/")}
      >
        Back to Jobs
      </Button>
    </div>
  );
};

export default ApplicationSuccess;
