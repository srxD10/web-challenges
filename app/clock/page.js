'use client'
import { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Clock() {
    const [currTime, setCurrTime] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrTime(new Date());
        }, 1000)

        return () => {
            clearInterval(intervalId);
        }
    }, [])

    if (currTime === null) return null;

    return (
        <main className="flex min-h-screen flex-col items-center flex-start p-24">
            <h1 className="text-3xl font-bold ">Time ⌛</h1>
            <Tabs aria-label="Options" size="lg" className="mt-8">
                <Tab key="time" title="Current Time">
                    <Card className="mt-8">
                        <CardBody>
                            <h1 className="font-semibold text-xl">{currTime.toLocaleTimeString()}</h1>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="timer" title="Timer">
                    <Card className="mt-8">
                        <CardBody>
                            <h1 className="font-semibold text-xl">00:00</h1>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="stop" title="Stopwatch">
                    <Card className="mt-8">
                        <CardBody>
                            Stopwatch
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </main>
    )
}