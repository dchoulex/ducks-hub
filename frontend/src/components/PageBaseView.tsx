import { forwardRef, Flex, Image, Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../utils/SessionStorage";
import { Header } from "./Header";
import { palette } from "../theme";

export interface BaseProps {
    inner: ReactNode
}

export const PageBaseView = forwardRef<BoxProps & BaseProps, "div">((props, ref) => {
    const navigate = useNavigate();
    const p = useColorModeValue(palette.light, palette.dark);
    useEffect(() => {
        if (!SessionStorage.GetUserId()) navigate('/sessionexpired');
    })
    const bldPath = useColorModeValue("light_bld.png", "dark_bld.png");

    return (
        <Flex bg={p.bgAcc} minH="100vh" h="inherit" w="100%" flexDir="column" align="center" justify="center" ref={ref} {...props as BoxProps}>
            <Header/>
            <Flex bg={p.bg} minH="inherit" my="10pt" mx="20pt" p="80px 20px 50px 20px" w={{sm: "100%", md: "100%", lg: "90%"}} flexDir="column" align="center">
                {props.inner}
            </Flex>
            <Box position="fixed" bottom={0} w="100%" bgImg={`url(${bldPath})`} h="45pt" bgRepeat="repeat round" zIndex={10000}/>
        </Flex>
    )
})