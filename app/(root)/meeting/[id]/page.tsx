"use client";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { use, useState } from "react";
import MeetingSetup from "./_components/meeting-setup";
import MeetingRoom from "./_components/meeting-room";
import { useGetCallById } from "@/hooks/call";
import Loader from "@/components/ui/loader";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

const MeetingPage = ({ params }: MeetingPageProps) => {
  const { id } = use(params);
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  if (!isLoaded || isCallLoading) return <Loader />;

  const handleSetupComplete = () => {
    setIsSetupComplete(true);
  };

  return (
    <main className="h-screen w-full text-white">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={handleSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
