"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const streamApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const streamApiSecret = process.env.STREAM_SECRET_KEY!;

export const onGetStreamToken  = async () =>{
    const user = await currentUser()

    if(!user) throw new Error("No user exist")
    if(!streamApiKey) throw new Error("No API key exist")
    if(!streamApiSecret) throw new Error("No API secret")

    const newStreamClient = new StreamClient(streamApiKey, streamApiSecret)
    const exp = Math.round(new Date().getTime() /1000) * 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = newStreamClient.generateUserToken({user_id:user.id, validity_in_seconds:exp, iat:issuedAt })
    return token
}