import { Button } from "@/components/ui/button";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: () => void}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  const call = useCall();
  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

   const handleJoinMeeting = () => {
    call?.join()
    setIsSetupComplete()
   }
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Meeting Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label
          htmlFor="mic-cam-toggle"
          className="flex items-center justify-center gap-2 font-medium"
        >
          <input
            type="checkbox"
            id="mic-cam-toggle"
            aria-label="Mic/Cam"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        {/* <Button onClick={() => setIsMicCamToggleOn(!isMicCamToggleOn)}>
          {isMicCamToggleOn ? "Disable Mic/Cam" : "Enable Mic/Cam"}
        </Button> */}
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5 " onClick={handleJoinMeeting}>Join Meeting</Button>
    </div>
  );
};

export default MeetingSetup;
