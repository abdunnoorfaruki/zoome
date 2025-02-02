import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,

} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
  children?: ReactNode;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonIcon,
  buttonText,
  image,
  handleClick,
  children,
}: MeetingModalProps) => {
  console.log(buttonIcon);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Meeting Modal</DialogTitle>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white ">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center" >
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl text-center font-bold leading-[42px]", className)} >{title}</h1>
          {children}
          <Button className="bg-pink-1 focus-visible: ring-0 focus-visible:ring-offset-0"onClick={handleClick} > {buttonIcon && (
            <Image src={buttonIcon} alt="button icon" width={13} height={13} />
          )} &nbsp; {buttonText || "Schedule Meeing"} </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
