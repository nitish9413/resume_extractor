// app/resume/[task_id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ResumeDisplay } from '@/components/resume-display'; // Adjust path
import type { ResumeSchema } from '@/lib/types'; // Adjust path

export default function ResumeResultPage() {
    const params = useParams();
    const taskId = params.task_id as string;

    // Use the ResumeSchema type for your state
    const [resultData, setResultData] = useState<ResumeSchema | null>(null);
    const [status, setStatus] = useState<string>("PENDING");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!taskId || status === "COMPLETED" || status === "FAILED") return;

        const pollStatus = async () => {
            try {
                const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/resume/resume-status/${taskId}`);
                if (!statusResponse.ok) throw new Error(`Status check failed`);

                const statusResult = await statusResponse.json();

                if (statusResult === "done") {
                    setStatus("COMPLETED");
                    const resultResponse = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/resume/resume_result/${taskId}`);
                    if (!resultResponse.ok) throw new Error(`Fetching result failed`);
                    const finalData: ResumeSchema = await resultResponse.json();
                    setResultData(finalData);
                    return;
                }

                setStatus(typeof statusResult === 'object' ? JSON.stringify(statusResult) : statusResult);
            } catch (err: any) {
                setError(err.message);
                setStatus("FAILED");
            }
        };

        const intervalId = setInterval(pollStatus, 3000);
        pollStatus(); // Initial call

        return () => clearInterval(intervalId);
    }, [taskId, status]);

    // --- Rendering Logic ---

    if (error) {
        return <div className="p-8 text-red-500">Error: {error}</div>;
    }

    // **** RENDER THE NEW COMPONENT ****
    if (resultData) {
        return (
            <div className="container mx-auto p-4 sm:p-8">
                <ResumeDisplay data={resultData} />
            </div>
        );
    }

    // Loading/Polling state
    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Analyzing Your Resume...</h1>
            <p className="text-lg text-gray-600">Please wait, this may take a moment.</p>
            <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">
                    Task ID: <span className="font-mono bg-gray-100 p-1 rounded">{taskId}</span>
                </p>
                <p className="text-md font-semibold">
                    Current Status: <span className="text-blue-600">{status}</span>
                </p>
            </div>
        </div>
    );
}