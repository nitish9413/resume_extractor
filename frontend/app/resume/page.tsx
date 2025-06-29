import ResumeUpload from "@/components/resume_upload";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">

      {/* Card container from shadcn/ui */}
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="text-center">
          {/* Icon to add visual appeal */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="text-2xl font-bold">
            Upload Your Resume
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground pt-1">
            Simply drag and drop your file or click in the area below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* 
            The ResumeUpload component is placed here.
            The Card provides the surrounding UI and context.
          */}
          <ResumeUpload />
        </CardContent>
      </Card>

    </div>
  );
}
