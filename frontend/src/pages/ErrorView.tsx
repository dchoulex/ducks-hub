import { Button, Center, Heading, HStack, Image, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const ErrorView: React.FC = () => {
    const navigate = useNavigate();
    return (
        <VStack w="60%">
            <Image p="20pt" src="https://placekitten.com/500/500" rounded="full" style={{filter: "blur(3px) grayscale(50%) opacity(25%)"}}/>
            <Heading fontSize="2xl">ページを表示する際にエラーが発生しました。</Heading>
            <Button variant="link" onClick={() => navigate("/home")}>ホームへ戻る</Button>
        </VStack>
    )
}