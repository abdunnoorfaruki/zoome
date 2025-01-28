"use client";
import React, { SetStateAction }   from "react";
import MeetingTypeCard from "./meeting-type-card";
import { useRouter } from "next/navigation";
import { MeetingStateType } from "../../page";

type MeetingTypeListProps = {
  meetingState: MeetingStateType;
  setMeetingState: React.Dispatch<SetStateAction<MeetingStateType>>;
}
const MeetingTypeList = ({setMeetingState}:MeetingTypeListProps) => {
    const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <MeetingTypeCard
        title="New Meeting"
        description="Start an instant meeting"
        icon="/icons/add-meeting.svg"
        bgColor="bg-orange-1"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <MeetingTypeCard
        title="Scheduled Meeting"
        description="Plan your meetings"
        icon="/icons/schedule.svg"
        bgColor="bg-pink-1"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <MeetingTypeCard
        title="Recordings"
        description="View your recordings"
        icon="/icons/recordings.svg"
        bgColor="bg-yellow-1"
        onClick={() => router.push("/recordings")}
        />
      <MeetingTypeCard
        title="Join Meeting"
        description="Via invite link"
        icon="/icons/join-meeting.svg"
        bgColor="bg-purple-1"
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
    </div>
  );
};

export default MeetingTypeList;
