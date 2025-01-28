"use client";

import { Button } from "@/components/ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { PhoneOff } from "lucide-react";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const router = useRouter();

  const isMeetingHost =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  const handleEndCall = async () => {
    await call?.endCall();
    router.push("/");
  };

  if (!isMeetingHost) return null;

  return (
    <Button
      onClick={handleEndCall}
      className="cursor-pointer rounded-2xl bg-red-500 px-4 py-2 hover:bg-red-600"
    >
      <PhoneOff size={20} className="text-white" /> &nbsp; End Call For Everyone
    </Button>
  );
};

export default EndCallButton;
