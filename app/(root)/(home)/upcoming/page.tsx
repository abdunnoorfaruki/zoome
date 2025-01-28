import CallList from '@/components/call-list';
import React from 'react'

const Upcomings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white ">
     <CallList type="upcoming" />
    </section>
  );
};

export default Upcomings
