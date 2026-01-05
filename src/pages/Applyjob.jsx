import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const ApplyJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    mobile: "",
    primarySkills: "",
    secondarySkills: "",
    experience: "",
    referredByEmployee: "",
    dob: "",
    resume: null,
  });

  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("resume", formData.resume);
    data.append("firstName", formData.firstName);
    data.append("lastname", formData.lastname);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("primarySkills", formData.primarySkills);
    data.append("secondarySkills", formData.secondarySkills);
    data.append("experience", formData.experience);
    data.append("referredByEmployee", formData.referredByEmployee);
    data.append("jobPostApplied", id); // Use id from URL
    data.append("dob", formData.dob);

    try {
      const response = await fetch(
        `http://localhost:9092/recruiter-app/jobpost/${id}/apply`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      // Redirect to success page
      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-purple-700">
          Apply for Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input name="firstName" required onChange={handleChange} />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input name="lastname" required onChange={handleChange} />
            </div>
          </div>

          {/* Contact */}
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" required onChange={handleChange} />
          </div>

          <div>
            <Label>Mobile</Label>
            <Input name="mobile" required onChange={handleChange} />
          </div>

          {/* Date of Birth */}
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" name="dob" required onChange={handleChange} />
          </div>

          {/* Skills */}
          <div>
            <Label>Primary Skills</Label>
            <Input
              name="primarySkills"
              placeholder="Java, Spring Boot, React"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Secondary Skills</Label>
            <Input
              name="secondarySkills"
              placeholder="Docker, AWS"
              onChange={handleChange}
            />
          </div>

          {/* Experience */}
          <div>
            <Label>Experience (Years)</Label>
            <Input
              type="number"
              step="0.1"
              name="experience"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Referred By Employee</Label>
            <Input
              name="referredByEmployee"
              placeholder="Employee ID (if any)"
              onChange={handleChange}
            />
          </div>

          {/* Resume Upload */}
          <div>
            <Label>Upload Resume</Label>
            <Input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ApplyJob;
