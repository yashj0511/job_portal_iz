import React, { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Lightbulb } from "lucide-react";

const JobListing = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9091/recruiter-app/jobposts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const text = search.toLowerCase();
    return (
      post.title?.toLowerCase().includes(text) ||
      post.location?.toLowerCase().includes(text) ||
      post.mandatorySkills?.toLowerCase().includes(text)
    );
  });

  if (loading) return <p>Loading job posts...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recent Job Openings</h1>

      {/* Search */}
      <Input
        placeholder="Search by title, skill, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-lg"
      />

      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 auto-rows-fr">
        {filteredPosts.map((post) => {
          const isExpanded = expandedJobId === post.id;

          return (
            <Card
              key={post.id}
              className={`p-7 flex flex-col transition-all duration-300
                ${
                  isExpanded
                    ? "sm:col-span-2 xl:col-span-2"
                    : "col-span-1 min-h-[420px]"
                }
              `}
            >
              {/* BASIC INFO */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl font-semibold text-purple-700">
                    {post.title}
                  </CardTitle>

                  {post.isActive && (
                    <Badge className="bg-yellow-400 text-black">
                      New
                    </Badge>
                  )}
                </div>

                <CardDescription className="font-medium text-white-800">
                  Recruiter ID: {post.recruiterId}
                </CardDescription>

                <div className="flex items-center gap-2 text-white-600">
                  <MapPin size={18} />
                  {post.location}
                </div>

                <div className="flex items-center gap-2 text-white-600">
                  <Briefcase size={18} />
                  {post.experience}
                </div>

                <div className="flex items-start gap-2 flex-wrap">
                  <Lightbulb size={18} />
                  <div className="flex flex-wrap gap-2">
                    {post.mandatorySkills
                      ?.split(",")
                      .map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill.trim()}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>

              {/* EXPANDED CONTENT */}
              {isExpanded && (
                <div className="mt-6 border-t pt-4 space-y-4">
                  {/* Scrollable description */}
                  <div className="max-h-48 overflow-y-auto text-white-700 pr-2">
                    <strong>Description:</strong>
                    <p className="mt-2">
                      {post.description || "No description provided."}
                    </p>
                  </div>

                  <div>
                    <strong>Secondary Skills:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.secondarySkills
                        ?.split(",")
                        .map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setExpandedJobId(null)}
                    >
                      Collapse
                    </Button>

                    <Link to={`/apply/${post.id}`}>
                      <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                        Apply
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* TOGGLE BUTTON */}
              <Button
                variant="outline"
                className="mt-6 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                onClick={() =>
                  setExpandedJobId(isExpanded ? null : post.id)
                }
              >
                {isExpanded ? "Hide Details" : "Details"}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default JobListing;
