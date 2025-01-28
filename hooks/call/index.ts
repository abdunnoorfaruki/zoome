import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const videoClient = useStreamVideoClient();

  useEffect(() => {
    if (!videoClient) return;
    const loadCall = async () => {
      try {
        const { calls } = await videoClient.queryCalls({
          filter_conditions: {
            id,
          },
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        }
        setIsCallLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsCallLoading(false);
      }
    };
    loadCall();
  }, [videoClient, id]);

  return { call, isCallLoading, error };
};

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isCallsLoading, setIsCallsLoading] = useState(true);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      setIsCallsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        setCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCallsLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]);

  const now = new Date();
  const upcomingCalls = calls.filter(
    (call: Call) => call.state.startsAt && new Date(call.state.startsAt) > now
  );
  const endedCalls = calls.filter(
    (call: Call) =>
      (call.state.endedAt && new Date(call.state.endedAt) < now) ||
      !!call.state.endedAt
  );

  return { upcomingCalls, endedCalls, callRecordings: calls, isCallsLoading };
};
