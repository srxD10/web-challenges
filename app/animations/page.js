'use client'
import { motion, AnimatePresence, MotionConfig, useAnimationControls } from "framer-motion"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";

export default function Animations() {
    const [isVisible, setIsVisible] = useState(true);
    const controls = useAnimationControls();

    function handleFlip() {
        controls.start("flip")
    }

    return (
        <main className="flex min-h-screen flex-col items-center flex-start p-24">
            <h1 className="text-3xl font-bold ">Animations</h1>
            <Card className="mt-8">
                <CardHeader>
                    <p>Basics</p>
                </CardHeader>
                <CardBody>
                    <AnimatePresence mode="">
                        {isVisible &&
                            <motion.div
                                className="w-40 h-40 bg-black"
                                initial={{ rotate: '0deg', scale: 0 }}
                                animate={{ rotate: '180deg', scale: 1 }}
                                exit={{ rotate: '0deg', scale: 0 }}
                                transition={{ duration: 1, ease: 'backInOut' }}
                            ></motion.div>
                        }
                    </AnimatePresence>
                    <Button color="primary" className={isVisible ? "mt-4" : ''} onPress={() => setIsVisible(!isVisible)}>
                        {isVisible ? 'Hide' : 'Show'}
                    </Button>
                </CardBody>
            </Card>
            <Card className="mt-8">
                <CardHeader>
                    <p>Gestures</p>
                </CardHeader>
                <CardBody>
                    <MotionConfig
                        transition={{
                            duration: 0.1,
                            ease: "easeOut"
                        }}
                    >
                        <motion.button
                            className="w-40 mt-4 bg-secondary rounded-medium text-white h-unit-10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{
                                scale: 0.95,
                                rotate: "12.5deg"
                            }}
                        >
                            Click me!
                        </motion.button>
                        <motion.button
                            className="w-40 mt-4 bg-primary rounded-medium text-white h-unit-10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{
                                scale: 0.95,
                                rotate: "12.5deg"
                            }}
                        >
                            Click me!
                        </motion.button>
                    </MotionConfig>
                </CardBody>
            </Card>
            <Card className="mt-8">
                <CardHeader>
                    <p>Animation controls</p>
                </CardHeader>
                <CardBody>
                    <motion.div
                        className="w-40 h-40 bg-black"
                        variants={{
                            initial: {
                                rotate: "0deg"
                            },
                            flip: {
                                rotate: "360deg"
                            },
                        }}
                        initial="initial"
                        animate={controls}
                    >
                    </motion.div>
                    <Button color="primary" className="mt-4" onPress={handleFlip}>
                        Flip it!
                    </Button>
                </CardBody>
            </Card>
        </main>
    )
}