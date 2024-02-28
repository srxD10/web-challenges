import { Card, CardBody, Avatar, CardHeader } from "@nextui-org/react";
import { useRouter } from 'next/navigation'


export default function AwesomeCard({ title, img, route }) {
    const router = useRouter();
    
    return (
        <Card className="py-2 w-1/5" isPressable onPress={()=> router.push(`${route}`)}>
            <CardHeader className="justify-center">
                <Avatar radius="full" className="w-24 h-24" src={`/avatars/${img}`} />
            </CardHeader>
            <CardBody className="items-center" >
                <h1 className="text-xl font-bold">{title}</h1>
            </CardBody>
        </Card>
    )
}