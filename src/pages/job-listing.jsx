// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import {
//   MapPin,
//   Briefcase,
//   Lightbulb,
// } from "lucide-react";

// const JobListing = () => {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:9091/recruiter-app/jobposts")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch job posts");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setPosts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const filteredPosts = posts.filter(
//     (post) =>
//       post.title.toLowerCase().includes(search.toLowerCase()) ||
//       post.location.toLowerCase().includes(search.toLowerCase()) ||
//       post.mandatorySkills.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return <p className="px-10 py-10">Loading job posts...</p>;
//   }

//   return (
//     <div className="px-6 md:px-10 lg:px-20 py-10 space-y-6 w-full">
//       <h1 className="text-3xl font-bold">Recent Job Openings</h1>

//       {/* Search */}
//       <Input
//         type="text"
//         placeholder="Search by title, skill, or location..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="max-w-lg"
//       />

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 w-full">
//         {filteredPosts.length === 0 ? (
//           <p>No job posts found.</p>
//         ) : (
//           filteredPosts.map((post) => (
//             <Card
//               key={post.id}
//               className="p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
//             >
//               <div className="space-y-4">
//                 {/* Title + Badge */}
//                 <div className="flex items-start justify-between">
//                   <CardTitle className="text-xl font-semibold text-purple-700">
//                     {post.title}
//                   </CardTitle>

//                   {post.isActive && (
//                     <Badge className="bg-yellow-400 text-black">New</Badge>
//                   )}
//                 </div>

//                 {/* Company / Recruiter */}
//                 <CardDescription className="text-base font-medium text-gray-800">
//                   Recruiter ID: {post.recruiterId}
//                 </CardDescription>

//                 {/* Location */}
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MapPin size={18} />
//                   <span>{post.location}</span>
//                 </div>

//                 {/* Experience */}
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Briefcase size={18} />
//                   <span>{post.experience}</span>
//                 </div>

//                 {/* Skills */}
//                 <div className="flex items-start gap-2 flex-wrap">
//                   <Lightbulb size={18} className="mt-1 text-gray-600" />
//                   <div className="flex flex-wrap gap-2">
//                     {post.mandatorySkills
//                       .split(",")
//                       .map((skill, index) => (
//                         <Badge key={index} variant="secondary">
//                           {skill.trim()}
//                         </Badge>
//                       ))}

//                     {post.secondarySkills
//                       .split(",")
//                       .map((skill, index) => (
//                         <Badge key={index} variant="outline">
//                           {skill.trim()}
//                         </Badge>
//                       ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Button */}
//               {/* <Button
//                 variant="outline"
//                 className="mt-6 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
//               >
//                 Apply
//               </Button> */}
//               <Link to={`/apply/${post.id}`}>
//   <Button
//     variant="outline"
//     className="mt-6 w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
//   >
//     Apply
//   </Button>
// </Link>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobListing;


import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
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

  useEffect(() => {
    fetch("http://localhost:9091/recruiter-app/jobposts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.location.toLowerCase().includes(search.toLowerCase()) ||
      post.mandatorySkills.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="p-10">Loading job posts...</p>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-10 lg:px-20 py-10 space-y-6 overflow-y-auto">
        <h1 className="text-3xl font-bold">Recent Job Openings</h1>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search by title, skill, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-lg"
        />

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
          {filteredPosts.length === 0 ? (
            <p>No job posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div className="space-y-4">
                  {/* Title */}
                  <div className="flex justify-between">
                    <CardTitle className="text-xl font-semibold text-purple-700">
                      {post.title}
                    </CardTitle>

                    {post.isActive && (
                      <Badge className="bg-yellow-400 text-black">
                        New
                      </Badge>
                    )}
                  </div>

                  <CardDescription className="font-medium text-gray-800">
                    Recruiter ID: {post.recruiterId}
                  </CardDescription>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    {post.location}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={18} />
                    {post.experience}
                  </div>

                  <div className="flex items-start gap-2 flex-wrap">
                    <Lightbulb size={18} className="mt-1 text-gray-600" />
                    <div className="flex flex-wrap gap-2">
                      {post.mandatorySkills
                        .split(",")
                        .map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill.trim()}
                          </Badge>
                        ))}

                      {post.secondarySkills
                        .split(",")
                        .map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <Link to={`/apply/${post.id}`}>
                  <Button
                    variant="outline"
                    className="mt-6 w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
                  >
                    Apply
                  </Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default JobListing;
