"use client"
import { RocketIcon, TargetIcon } from "lucide-react";

import { RevealText } from "@/components/gsap/reveal-text";
import { SpringButton } from "@/components/gsap/spring-button";
import { TextFallButton } from "@/components/gsap/text-fall-button";
import { useRouter } from "next/navigation";

const Hero2 = () => {
    const router = useRouter()

    const handleClick = ()=>{
        router.push("/resume")
    }
    return (
        <div className="bg-background overflow-hidden sm:pt-16 md:pt-2"
        // "lg:pt-24"
        >
            <div className="container">
                <div className="flex flex-col items-center">
                    <div className="bg-muted flex items-center gap-1.5 rounded-full py-1 ps-1 pe-3 text-sm">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                            <TargetIcon className="size-4" />
                        </div>
                        <p>Built for focused momentum</p>
                    </div>

                    <RevealText className="mt-3 text-center text-2xl leading-[1.25] font-semibold text-balance sm:text-3xl lg:text-4xl">
                        Extract Resumes. Structure Data. Accelerate Hiring.
                    </RevealText>
                    <p className="text-foreground/80 mt-3 max-w-lg text-center max-sm:text-sm lg:mt-5">
                        Parse resumes with precision and turn unstructured files into structured insights—instantly. Designed for clarity, built for performance, and ready to power your recruitment workflow.
                    </p>
                    <div className="mt-6 flex items-center gap-3 max-sm:flex-col sm:mt-8">
                        {/* <SpringButton
                            shaking={false}
                            className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-medium shadow-none">
                            <RocketIcon className="size-4.5" />
                            How It Works
                        </SpringButton> */}
                        <TextFallButton className="bg-primary text-primary-foreground cursor-pointer overflow-hidden rounded-full py-2 ps-4 pe-5 font-medium"
                        onClick={handleClick}>
                            Explore Now
                        </TextFallButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero2;
