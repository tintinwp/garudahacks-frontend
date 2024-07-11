import { io } from "socket.io-client";
import SearchAnimation from "../../animations/searching.json";
import Navbar from "@/components/navbar";
import Lottie from "react-lottie-player";
import { useEffect } from "react";

export interface FindingPlayPageProps {
  setIsFinding: (conds: boolean) => void;
  setIsMatchFound: (conds: boolean) => void;
}

export const FindingPlayPage = (props: FindingPlayPageProps) => {
  const APIKEY = localStorage.getItem("zeus");
  const socket = io(import.meta.env.VITE_BACKEND_WS_API_URL + "/queues", {
    extraHeaders: {
      Authorization: APIKEY ?? "",
    },
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("queue-full", () => {
        props.setIsFinding(false);
        props.setIsMatchFound(true);
      });
    });
  }, [socket]);
  return (
    <>
      <div className="h-full">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Lottie animationData={SearchAnimation} play />
            <p className="text-primary">Finding Match Making...</p>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};
