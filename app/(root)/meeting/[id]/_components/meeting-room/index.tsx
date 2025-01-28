import React, { useState } from "react";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { SpeakerLayout } from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { LayoutList, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./_components/end-call-button";
import Loader from "@/components/ui/loader";

type CallLayoutType =
  | "grid"
  | "speaker-left"
  | "speaker-right"
  | "speaker-top"
  | "speaker-bottom";
const MeetingRoom = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("grid");
  const [showParticipantsList, setShowParticipantsList] = useState(false);

  const { useCallCallingState } = useCallStateHooks()

  const callingState = useCallCallingState()
  console.log(callingState)

  if(callingState !==  CallingState.JOINED) return <Loader />
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative size-full flex items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center  ">
          <CallLayout />
        </div>
        <div
          className={cn("hidden h-[calc(100vh-86px)] ml-2", {
            "show-block": showParticipantsList,
          })}
        >
          <CallParticipantsList
            onClose={() => setShowParticipantsList(false)}
          />
        </div>
        <div className="fixed bottom-0 flex w-full justify-center items-center gap-5 flex-wrap">
          <CallControls onLeave = {() =>router.push("/")} />
          <DropdownMenu>
            <div className="flex items-center"> 
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]" >
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>

            </div>
              <DropdownMenuContent>
                <DropdownMenuLabel>Choose Layout</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                ["grid", "speaker-left", "speaker-right"].map((layout) => (
                  <DropdownMenuItem className="cursor-pointer" key={layout} onClick={() => setLayout(layout.toLowerCase() as CallLayoutType)}>
                    {layout.charAt(0).toUpperCase() + layout.slice(1)}
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <Button onClick={() => setShowParticipantsList((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]">
              <Users size={20} className="text-white" />
            </div>
          </Button>

          {
            !isPersonalRoom && (
              <EndCallButton />
            )
          }
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
