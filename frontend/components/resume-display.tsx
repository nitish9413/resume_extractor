import {
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  User,
  BookOpen,
  Lightbulb,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ResumeSchema } from "@/lib/types"; // Adjust path if needed

// Helper to get initials from a name
const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

interface ResumeDisplayProps {
  data: ResumeSchema;
}

export function ResumeDisplay({ data }: ResumeDisplayProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto font-sans">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 text-xl">
            {/* You can add an image if you have one */}
            {/* <AvatarImage src="/path-to-image.jpg" alt={data.name} /> */}
            <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-3xl">{data.name}</CardTitle>
            <div className="text-muted-foreground space-y-1 pt-1">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${data.email}`} className="hover:underline">
                    {data.email}
                  </a>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{data.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <Separator />

        {/* --- Skills Section --- */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* --- Experience Section --- */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <Briefcase className="h-6 w-6 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    <p className="text-md text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.start_date} - {exp.end_date || "Present"}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-sm">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Education Section --- */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <GraduationCap className="h-6 w-6 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{edu.institution}</h3>
                    <p className="text-md text-muted-foreground">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.start_year} - {edu.end_year || "Present"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Accordion for other sections --- */}
        <Accordion type="multiple" className="w-full">
          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <AccordionItem value="projects">
              <AccordionTrigger className="text-xl font-bold">
                <div className="flex items-center gap-2">
                  <Lightbulb /> Projects
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 space-y-4">
                {data.projects.map((proj, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{proj.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{proj.description}</p>
                    {proj.technologies && (
                       <div className="flex flex-wrap gap-2 mt-2">
                          {proj.technologies.map(tech => <Badge key={tech} variant="outline">{tech}</Badge>)}
                       </div>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Courses */}
          {data.courses && data.courses.length > 0 && (
             <AccordionItem value="courses">
              <AccordionTrigger className="text-xl font-bold">
                <div className="flex items-center gap-2">
                  <BookOpen /> Courses & Certifications
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 space-y-2">
                {data.courses.map((course, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.provider} ({course.year})</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Publications */}
          {data.publications && data.publications.length > 0 && (
             <AccordionItem value="publications">
              <AccordionTrigger className="text-xl font-bold">
                <div className="flex items-center gap-2">
                  <FileText /> Publications
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 space-y-4">
                {data.publications.map((pub, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{pub.title}</h4>
                    <p className="text-sm text-muted-foreground">{pub.journal_or_conference} ({pub.year})</p>
                    {pub.link && <a href={pub.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">View Publication</a>}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}