import React, { useState, useEffect } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Mail, Phone } from "lucide-react"; // You can use these icons or others

const MyReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded employee ID "EMP2045"
    fetch("http://localhost:9092/recruiter-app/profiles/EMP2045")
      .then((res) => res.json())
      .then((data) => {
        setReferrals(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading referrals...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Referral Profiles</h1>

      {/* Displaying Referral Cards */}
      <div className="space-y-4">
        {referrals.length === 0 ? (
          <p>No referrals found.</p>
        ) : (
          referrals.map((profile) => (
            <Card
              key={profile.id}
              className="p-7 flex flex-col justify-between min-h-[420px] border border-gray-300 shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl font-semibold text-purple-700 break-words">
                    {profile.firstName} {profile.lastname}
                  </CardTitle>
                  <Badge className={`${
                    profile.status === "Submitted" ? "bg-yellow-400 text-black" :
                    profile.status === "Interview" ? "bg-blue-400 text-white" : 
                    "bg-green-400 text-white"
                  } px-3 py-1`}>
                    {profile.status}
                  </Badge>
                </div>

                <CardDescription className="text-white-800">
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} />
                    <span>{profile.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span>{profile.mobile}</span>
                  </div>
                </CardDescription>

                {/* Skills */}
                <div className="space-y-2">
                  <div className="font-medium text-white-700">Primary Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.primarySkills?.split(",").map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>

                  <div className="font-medium text-white-700">Secondary Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.secondarySkills?.split(",").map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                {/* Resume Button */}
                <Button
                  variant="outline"
                  className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                  onClick={() => window.open(`/resumes/${profile.profileDoc}`, "_blank")}
                >
                  View Resume
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReferrals;
