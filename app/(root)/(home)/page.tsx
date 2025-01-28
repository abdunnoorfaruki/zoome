"use client";
import dynamic from "next/dynamic";
const MeetingModal = dynamic(() => import("@/components/modals/meeting"), {
  ssr: false,
});
import DashboardBanner from "./_components/dashboard-banner";
import MeetingTypeList from "./_components/meeting-type-list";
import { Suspense, useState } from "react";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

export type MeetingStateType =
  | "isScheduleMeeting"
  | "isInstantMeeting"
  | "isJoiningMeeting"
  | undefined;
const HomePage = () => {
  const [meetingState, setMeetingState] = useState<MeetingStateType>();
  const user = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();
  const router = useRouter();

  const createMeeting = async () => {
    if (!user && !client) return;
    if (!values.dateTime)
      return toast({
        title: "Please select a date and time",
        variant: "destructive",
      });
    try {
      const uuid = crypto.randomUUID();
      const call = client?.call("default", uuid);
      if (!call) throw new Error("Failed to create call");
      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) router.push(`/meeting/${call.id}`);
      toast({
        title: "Meeting created successfully",
        description: "You can now join the meeting",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="flex size-full flex-col gap-10 text-white ">
      {/* Dashboard banner section start */}
      <DashboardBanner />
      {/* Dashboard banner section end */}
      {/* Meeting type list section start */}
      <MeetingTypeList
        meetingState={meetingState}
        setMeetingState={setMeetingState}
      />
      {/* Meeting type list section end */}

      {/* Meeting modal start */}
      <Suspense
        fallback={
          <div className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white ">
            <Loader className="h-9 w-9 animate-spin text-blue-1 drop-shadow-[0_0_5px_rgba(59,130,246,0.7)]" />
          </div>
        }
      >
        {!callDetails ? (
          <MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Schedule Meeting"
            className="tect-center"
            buttonText={"Schedule Meeing"}
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="description"
                className="text-sm font-normal leading-[22px] text-sky-2"
              >
                Add a description
              </label>
              <Textarea
                id="description"
                placeholder="Add a description"
                className="resize-none border-none bg-dark-3 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="description"
                className="text-sm font-normal leading-[22px] text-sky-2"
              >
                Select a date and time
              </label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                className="border-none bg-dark-3 text-white focus-visible:ring-0 focus-visible:ring-offset-0 w-full p-2  rounded-lg"
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                timeInputLabel="Time:"
                timeIntervals={15}
              />
            </div>
          </MeetingModal>
        ) : (
          <MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            className="tect-center"
            buttonText="Copy Meeting Link"
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink)
              toast({
                title: "Meeting link copied to clipboard",
                variant: "default",
              })
            }}
            image="/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
          >
          </MeetingModal>
        )}

        <MeetingModal
          isOpen={meetingState === "isInstantMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Start an instant meeting"
          className="tect-center"
          buttonText={"Start Meeting"}
          handleClick={createMeeting}
        />
        <MeetingModal
          isOpen={meetingState === "isJoiningMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Start an instant meeting"
          className="tect-center"
          buttonText={"Start Meeting"}
          handleClick={() => router.push(values.link)}
        >
          <Input placeholder="Meeting Link" className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-dark-3 " onChange={(e) => setValues({...values, link:e.target.value})} />
        </MeetingModal>
      </Suspense>
      {/* Meeting modal end */}
    </section>
  );
};

export default HomePage;
