import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Lightbulb } from "lucide-react";

const JobPage = () => {
  const { jobId } = useParams(); // Job_28609
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9091/recruiter-app/jobpost/${jobId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Job not found");
        }
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [jobId]);

  if (loading) return <p className="p-10">Loading job...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;
  if (!job) return null;

  return (
    <div className="px-6 md:px-10 lg:px-20 py-10">
      <Card className="p-6 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700">
            {job.title}
          </CardTitle>
          {job.isActive && (
            <Badge className="w-fit mt-2 bg-yellow-400 text-black">
              Active
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-700">{job.description}</p>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase size={18} />
            <span>{job.experience}</span>
          </div>

          <div className="flex items-start gap-2 flex-wrap">
            <Lightbulb size={18} className="mt-1 text-gray-600" />
            <div className="flex flex-wrap gap-2">
              {job.mandatorySkills.split(",").map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill.trim()}
                </Badge>
              ))}
              {job.secondarySkills.split(",").map((skill, i) => (
                <Badge key={i} variant="outline">
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Apply before: <strong>{job.applyTill}</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPage;
