"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/call";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-bold text-sky-1 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-2-[320px] lg:text-xl ">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const meetingId = user?.id;
  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`;
  const router = useRouter();
  const client = useStreamVideoClient();

  const { call } = useGetCallById(meetingId!);
  const startRoom = async () => {
    if ( !client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white ">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex flex-col gap-8 w-full xl:max-w-[900px]">
        <Table
          title="Topic: "
          description={`${user?.fullName}'s Personal Room`}
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={`${inviteLink}`} />
        <div className="flex gap-5">
          <Button
            onClick={startRoom}
            aria-label="Copy Invite Link"
            role="button"
            className="bg-blue-1"
          >
            Start Room
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
              toast({
                title: "Invite Link Copied to Clipboard",
                variant: "default",
              });
            }}
            aria-label="Copy Invite Link"
            role="button"
            className="bg-dark-3"
          >
            Copy Invite Link
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalRoom;
