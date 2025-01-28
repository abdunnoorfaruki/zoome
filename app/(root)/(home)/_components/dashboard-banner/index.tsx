"use client";
import React, { useEffect, useState } from "react";

const DashboardBanner = () => {
  const now = new Date();
  const [time, setTime] = useState(
    now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
  const [date, setDate] = useState(
    new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setDate(
        new Intl.DateTimeFormat("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(now)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [time, date]);
  return (
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover bg-cover ">
        <div className="h-full flex flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at {time}
          </h2>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
  )
}

export default DashboardBanner
