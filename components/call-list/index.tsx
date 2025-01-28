"use client";
import { Call, CallRecording } from "@stream-io/video-react-sdk";

import { useGetCalls } from "@/hooks/call";
import MeetingCard from "../meeting-card";
import { useRouter } from "next/navigation";
import Loader from "../ui/loader";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { upcomingCalls, endedCalls, callRecordings, isCallsLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };
  const getCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        
        const callData = await Promise.all(callRecordings.map(async (meeting) => meeting.queryRecordings()));
  
        const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);
  
        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error fetching recordings",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    };
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  const callsMessage = getCallsMessage();
  if (isCallsLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as unknown as CallRecording).filename?.substring(
                0,
                20
              ) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as unknown as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as unknown as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () =>
                    router.push(`${(meeting as unknown as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{callsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
