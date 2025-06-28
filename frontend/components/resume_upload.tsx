"use client"

import {
    AlertCircleIcon,
    FileArchiveIcon,
    FileIcon,
    FileSpreadsheetIcon,
    FileTextIcon,
    FileUpIcon,
    HeadphonesIcon,
    ImageIcon,
    VideoIcon,
    XIcon,
} from "lucide-react"

import {
    FileWithPreview,
    formatBytes,
    useFileUpload,
} from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"


const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type
    const fileName = file.file instanceof File ? file.file.name : file.file.name

    if (
        fileType.includes("pdf") ||
        fileName.endsWith(".pdf") ||
        fileType.includes("word") ||
        fileName.endsWith(".doc") ||
        fileName.endsWith(".docx")
    ) {
        return <FileTextIcon className="size-4 opacity-60" />
    } else if (
        fileType.includes("zip") ||
        fileType.includes("archive") ||
        fileName.endsWith(".zip") ||
        fileName.endsWith(".rar")
    ) {
        return <FileArchiveIcon className="size-4 opacity-60" />
    } else if (
        fileType.includes("excel") ||
        fileName.endsWith(".xls") ||
        fileName.endsWith(".xlsx")
    ) {
        return <FileSpreadsheetIcon className="size-4 opacity-60" />
    } else if (fileType.includes("video/")) {
        return <VideoIcon className="size-4 opacity-60" />
    } else if (fileType.includes("audio/")) {
        return <HeadphonesIcon className="size-4 opacity-60" />
    } else if (fileType.startsWith("image/")) {
        return <ImageIcon className="size-4 opacity-60" />
    }
    return <FileIcon className="size-4 opacity-60" />
}

export default function ResumeUpload() {
    const router = useRouter()
    const maxSize = 10 * 1024 * 1024 // 10MB default
    const maxFiles = 1
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'uploading' | 'success' | 'error'>>({});

    const handleUpload = async (filesToUpload: FileWithPreview[]) => {
        if (filesToUpload.length === 0) return;

        const file = filesToUpload[0].file;
        if (!(file instanceof File)) return; // Ensure it's a File object

        const fileId = filesToUpload[0].id;

        // Set status to 'uploading'
        setUploadStatus(prev => ({ ...prev, [fileId]: 'uploading' }));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/resume_uploader`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("File uploaded successfully:", data);

            // Set status to 'success'
            setUploadStatus(prev => ({ ...prev, [fileId]: 'success' }));
            const taskId = data.task_id;

            if (taskId) {
                router.push(`/resume/${taskId}`);
            } else {
                console.error("Upload successful, but no task_id was found in the response.");
                setUploadStatus(prev => ({ ...prev, [fileId]: 'success' }));
            }

        } catch (error) {
            console.error("Error uploading file:", error);
            // Set status to 'error'
            setUploadStatus(prev => ({ ...prev, [fileId]: 'error' }));
        }
    };
    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            clearFiles,
            getInputProps,
        },
    ] = useFileUpload({
        multiple: false,
        maxFiles,
        maxSize,
        // initialFiles,
        onFilesAdded: handleUpload,
    })

    return (
        <div className="flex flex-col gap-2">
            {/* Drop area */}
            <div
                role="button"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
            >
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload files"
                />

                <div className="flex flex-col items-center justify-center text-center">
                    <div
                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <FileUpIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">Upload files</p>
                    <p className="text-muted-foreground mb-2 text-xs">
                        Drag & drop or click to browse
                    </p>
                    <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
                        <span>All files</span>
                        <span>∙</span>
                        <span>Max {maxFiles} files</span>
                        <span>∙</span>
                        <span>Up to {formatBytes(maxSize)}</span>
                    </div>
                </div>
            </div>

            {errors.length > 0 && (
                <div
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}

            {/* File list with Upload Status */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                                    {getFileIcon(file)}
                                </div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="truncate text-[13px] font-medium">
                                        {file.file.name}
                                    </p>
                                    <div className="text-muted-foreground text-xs flex items-center gap-2">
                                        <span>{formatBytes(file.file.size)}</span>
                                        {/* Display Upload Status */}
                                        {uploadStatus[file.id] === 'uploading' && <span className="text-blue-500">Uploading...</span>}
                                        {uploadStatus[file.id] === 'success' && <span className="text-green-500">Success!</span>}
                                        {uploadStatus[file.id] === 'error' && <span className="text-destructive">Failed</span>}
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                                onClick={() => removeFile(file.id)}
                                aria-label="Remove file"
                            >
                                <XIcon className="size-4" aria-hidden="true" />
                            </Button>
                        </div>
                    ))}

                    {/* Remove all files button */}
                    {files.length > 1 && (
                        <div>
                            <Button size="sm" variant="outline" onClick={clearFiles}>
                                Remove all files
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
