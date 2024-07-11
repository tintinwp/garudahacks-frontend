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
  const APIKEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI3ZTFhYjViZi0yZDFmLTQ0MjUtYWZhYS1lMTUyYjIxNGMwNzEiLCJ1c2VybmFtZSI6ImFkbWluQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjA3Mjc3MDYsImV4cCI6MTcyMDgxNDEwNn0.uqM8Mb2Ew7jOsvowkXJ9Sm6JtUkfktKCR7ZqHnOd2Kk";
  const socket = io("https://zdfktn9g-8000.asse.devtunnels.ms/queues", {
    extraHeaders: {
      Authorization: APIKEY,
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
