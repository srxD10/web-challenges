"use client";
import { useEffect, useState, useRef } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { motion, useAnimationControls, useAnimate } from "framer-motion";
import { getTimerValues } from "./utils";

export default function Clock() {
  const [currTime, setCurrTime] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const timerControls = useAnimationControls();
  const [scope, animate] = useAnimate();
  const timerRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleTimer = () => {
    if (isTimerRunning) {
      clearInterval(timerRef.current);
      setIsTimerRunning(false);
    } else {
      let currTime = totalTime;
      setIsTimerRunning(true);
      timerRef.current = window.setInterval(() => {
        setTotalTime((totalTime) => totalTime - 1);
        currTime--;
        if (currTime === 0) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
          setMinutes(0);
          setSeconds(0);
        }
      }, 1000);
    }
  };

  const setTimer = (type, value) => {
    if (type === "seconds") {
      setSeconds(value);
      setTotalTime(minutes * 60 + value);
    } else {
      setMinutes(value);
      setTotalTime(seconds + value * 60);
    }
  };

  const draw = {
    hidden: { pathLength: 1, opacity: 0, rotate: "-90deg" },
    visible: (t) => {
      console.log("time from custom prop", t);
      return {
        pathLength: 0,
        opacity: 1,
        transition: {
          pathLength: { duration: 5 },
          opacity: { duration: 0.5 },
        },
      };
    },
  };

  const handleAnimate = () => {
    // timerControls.start('visible')
    animate("circle", {
      pathLength: 0,
      opacity: 1,
      transition: { duration: 10 },
    });
  };

  const formatTime = (totalTime) => {
    const seconds = Math.floor(totalTime % 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(totalTime / 60)
      .toString()
      .padStart(2, "0");
    return { seconds, minutes };
  };

  const { timerSec, timerMin } = formatTime(totalTime);

  if (currTime === null) return null;

  return (
    <main className="flex min-h-screen flex-col items-center flex-start p-24">
      <h1 className="text-3xl font-bold ">Time ⌛</h1>
      <Tabs aria-label="Options" size="lg" className="mt-8">
        <Tab
          key="time"
          title="Stopwatch"
          className="flex flex-col items-center"
        >
          <div className="flex gap-2 mt-8 justify-center">
            {isTimerRunning ? (
              <div className="relative">
                <h1 className="absolute top-[110px] right-[100px] text-2xl">
                  {Math.floor(totalTime / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {Math.floor(totalTime % 60)
                    .toString()
                    .padStart(2, "0")}
                </h1>
                <motion.svg
                  className="stroke-[15px]"
                  width="250"
                  height="250"
                  viewBox="0 0 400 400"
                >
                  <motion.circle
                    fill="transparent"
                    cx="200"
                    cy="200"
                    r="150"
                    rotate="180deg"
                    stroke="#ff0055"
                    initial={{ pathLength: 1, opacity: 0, rotate: "-90deg" }}
                    animate={{
                      pathLength: 0,
                      opacity: 1,
                      transition: {
                        pathLength: { duration: totalTime },
                        opacity: { duration: 0.5 },
                      },
                    }}
                  />
                </motion.svg>
              </div>
            ) : (
              <>
                <Input
                  type="number"
                  size="sm"
                  placeholder="Minutes"
                  variant="faded"
                  label="Minutes"
                  min={0}
                  value={minutes}
                  classNames={{
                    input: "text-black",
                    base: "w-1/4",
                    label: "mb-2",
                  }}
                  onChange={(e) =>
                    setTimer("minutes", parseInt(e.target.value))
                  }
                />
                <Input
                  type="number"
                  size="sm"
                  variant="flat"
                  label="Seconds"
                  min={0}
                  placeholder="Type to search..."
                  value={seconds}
                  classNames={{
                    input: "text-black",
                    base: "w-1/4",
                    label: "mb-2 self-center",
                  }}
                  onChange={(e) =>
                    setTimer("seconds", parseInt(e.target.value))
                  }
                />
              </>
            )}
          </div>
          <div className="mt-8">
            <Button
              radius="full"
              isDisabled={totalTime === 0 ? true : false}
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onPress={handleTimer}
            >
              {isTimerRunning ? "Stop" : "Start"}
            </Button>
          </div>
        </Tab>
        <Tab key="timer" title="Current Time">
          {currTime != null ? (
            <Card className="mt-8">
              <CardBody>
                <h1 className="font-semibold text-xl">
                  {currTime.toLocaleTimeString()}
                </h1>
              </CardBody>
            </Card>
          ) : (
            <Skeleton className="flex rounded-full w-12 h-12" />
          )}
        </Tab>
        <Tab key="stop" title="Timer">
          <Card className="mt-8">
            <CardBody>Stopwatch</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </main>
  );
}
