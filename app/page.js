'use client'
import { NextUIProvider } from "@nextui-org/react";
import AwesomeCard from "./components/AwesomeCard";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center flex-start p-24">
        <h1 className="text-4xl font-bold ">Web Challenges</h1>
        <div className="flex w-full mt-10 gap-5 flex-wrap justify-center">
          <AwesomeCard title="Tic Tac Toe" img="tictac.jpg" route="tictactoe"/>
          <AwesomeCard title="Pokedex" img="poke.jpg" route="pokeapi"/>
          <AwesomeCard title="Rick and Morty" img="rick.webp" route="rick"/>
          <AwesomeCard title="Clock" img="clock.jpeg" route="clock"/>
          <AwesomeCard title="Animations" img="mario.gif" route="animations"/>
        </div>
      </main>
    </NextUIProvider>
  );
}
