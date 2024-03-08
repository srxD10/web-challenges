export default function Key({ val, specialWidth, isPressed }) {
    return (
        <div className={`h-12 ${specialWidth != undefined ? specialWidth : "min-w-12 w-auto"} flex ${isPressed ? "bg-gray-500 text-white font-bold" : "bg-white"} text-black text-xl rounded drop-shadow-xl m-1.5 p-1.5`}>
            <p className="m-auto">{val}</p>
        </div>
    )
}