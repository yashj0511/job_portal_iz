import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function JobCard({ job }) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.quote}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{job.author}</p>
      </CardContent>
    </Card>
  );
}
