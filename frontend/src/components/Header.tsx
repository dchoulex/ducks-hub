import { Box, BoxProps, Button, Flex, Text, HStack, Input, Heading, useColorModeValue, useColorMode, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { palette } from "../theme";
import { FaSun, FaMoon, FaSoundcloud } from "react-icons/fa";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const p = useColorModeValue(palette.light, palette.dark);
    const { colorMode, toggleColorMode } = useColorMode();

    const height = "45pt";

    return (
        <Box w='100%' bg={p.main} position="fixed" top={0} zIndex={100000}>
            <HStack spacing={0} h={height}>
                <Button h={height} variant="solid" borderWidth={0} size="lg" px="10pt" onClick={() => navigate('/home')}>
                    <Text fontSize="3xl">Ducks🐣Hub</Text>
                </Button>
                <Flex flex="auto"/>
                <Button h={height} variant="solid" borderWidth={0} size="lg" onClick={() => navigate('/search')}>
                    <Text fontSize="xl">検索</Text>
                </Button>
                <Button h={height} variant="solid" borderWidth={0} size="lg" onClick={() => navigate('/createpost')}>
                    <Text fontSize="xl">記事を作成</Text>
                </Button>
                <Button h={height} variant="solid" borderWidth={0} size="lg" onClick={() => navigate('/mypage')}>
                    <Text fontSize="xl">マイページ</Text>                    
                </Button>
                <IconButton h={height} aria-label="colorModeToggle" variant="solid" borderWidth={0} size="lg" onClick={toggleColorMode} icon={colorMode == "light" ? <FaMoon/> : <FaSun/>}/>
            </HStack>
        </Box>
    )
}