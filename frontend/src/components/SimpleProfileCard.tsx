import { Flex, Avatar, LinkBox, FlexProps, forwardRef, useColorModeValue, LinkOverlay, Text, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../utils/SessionStorage";
import { mainColorTheme, palette } from "../theme";

export const SimpleProfileCard = forwardRef<FlexProps & {uname: string, uid: string}, 'div'>((props, ref) => {
    const navigate = useNavigate();
    const p = useColorModeValue(palette.light, palette.dark);

    return (
        <LinkBox bg={p.bgDim} my="5pt" as='article' maxW="min(70%, 65vw)" w="300pt" p='3' borderWidth='0px' rounded='md' display="flex" alignItems="center"
              boxShadow="0 4px 8px 0 rgba(100, 100, 100, 0.05), 0 6px 10px 0 rgba(100, 100, 100, 0.1)" cursor="pointer"
              _hover={{backgroundColor: p.bg, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.15)"}}
              ref={ref} {...props as FlexProps}>
            <Avatar size="md" name={props.uname} src={`https://picsum.photos/seed/${props.uname}/100/100`}/>
            <LinkOverlay ml="10pt" onClick={() => {
                    const uid = SessionStorage.GetUserId();
                    if (uid != props.uid) navigate(`/profile/${props.uid}`)
                    else navigate("/mypage");
                }}>
                <Heading fontSize="lg">{props.uname}</Heading>
            </LinkOverlay>
        </LinkBox>
    )
});