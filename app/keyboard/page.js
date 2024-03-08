'use client'
import { useState } from "react";
import Key from "./Key";


export default function Keyboard() {
    const [keysDown, setKeysDown] = useState({});

    const handleKeyDown = (e) => {
        const pressedKey = e.key;

        if (keysDown[pressedKey]) {
        } else {
            const newKeyDown = {
                [pressedKey]: true
            }
            setKeysDown({ ...keysDown, ...newKeyDown });
        }
    }

    const handleKeyUp = (e) => {
        const pressedKey = e.key;

        const keyUp = {
            [pressedKey]: false
        }

        setKeysDown({ ...keysDown, ...keyUp })
    }

    return (
        <main className="flex min-h-screen flex-col items-center flex-start p-24 outline-none" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
            <h1 className="text-3xl font-bold ">Keyboard</h1>
            <div className="flex m-8 w-5/6 flex-wrap justify-center">
                {layout.map((row, i) => {
                    const characters = row.split(" ");

                    return (
                        <div key={i} className="flex">
                            {characters.map((char) => {
                                let props = {};

                                if (specialWidths[char] !== undefined) props.specialWidth = specialWidths[char];

                                if (keysDown[char]) {
                                    props.isPressed = true;
                                } else {
                                    props.isPressed = false;
                                }

                                return (
                                    <Key key={char} val={char} {...props} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

const specialWidths = {
    "Tab": "w-20",
    "ShiftL": "w-[8.7rem]",
    "ShiftR": "w-[8.7rem]",
    "Space": "w-[25.8rem]",
    "Enter": "w-28",
    "\\": "w-20",
}

const layout = [
    "Esc 1 2 3 4 5 6 7 8 9 0 - = Backspace",
    "Tab q w e r t y u i o p [ ] \\",
    "CapsLock a s d f g h j k l ; ' Enter",
    "ShiftL z x c v b n m , . up ShiftR",
    "Ctrl Option Cmd Space left down right fn"
]

const defaultKeysDownStyle = {
    "q": "",
    "w": "",
    "e": "",
    "r": "",
    "t": "",
    "y": "",
    "u": "",
    "i": "",
    "o": "",
    "p": "",
}
