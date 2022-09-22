import { Box, BoxProps, Button, Flex, Text,forwardRef, HStack, Input, Avatar, Tag, Badge, TagLeftIcon, TagLabel, useColorModeValue } from "@chakra-ui/react";
import { LinkBox, LinkOverlay,Heading } from '@chakra-ui/react'
import { createRef, LegacyRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSummary } from '../models/postSummary';
import { rankPostSummary } from '../models/rankPostSummary';
import { PostBookmark } from "../requests/PostBookmark";
import { parseTime } from '../utils/parseTime';
import { BsBookmarkStarFill, BsBookmarkStar, BsStarFill } from "react-icons/bs";
import { mainColorTheme, palette } from "../theme";
import { GetBookmark } from "../requests/GetBookmark";
import SessionStorage from "../utils/SessionStorage";

export const LinkCard: React.FC<{postSummary:postSummary, onSelected?: (tag: string) => void}> = ({postSummary, onSelected}) => {
    const navigate = useNavigate();
    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>();
    const p = useColorModeValue(palette.light, palette.dark);

    useEffect(() => {
        try{
            GetBookmark(postSummary.postId).then(res => setBookmarkStatus(res));
        } catch (e) {
            navigate("/sessionexpired");
        }
    }, []);

    const toggleBookmark = () => {
        PostBookmark(postSummary.postId).then(res => setBookmarkStatus(res));
    }

    const rankBagde = (rank: number) => {
        let text = "" + rank;
        switch (rank) {
            case 1: text = "🐤"; break;
            case 2: text = "🐣"; break;
            case 3: text = "🥚"; break;
        }
        
        return (
            <Box rounded="full" bg={p.mid} p="5pt" mr="-1.5rem" h="fit-content" w="5rem" alignSelf="center">
                <Text fontSize={"3xl"} textAlign="center" textColor={p.bg} w="3rem" h="3rem" lineHeight="3rem" fontWeight="extrabold">
                    {text}
                </Text>
            </Box>
        );
    }

    return (
        <Flex w="fit-content" maxW="100%" h="fit-content" justify="center">
        {
            (postSummary as rankPostSummary).rank != undefined && rankBagde((postSummary as rankPostSummary).rank)
        }
        <LinkBox bg={p.bgDim} as='article' my="5pt" maxW="min(100%, 85vw)" w="600pt" p='5' borderWidth='0px' rounded='md' display="flex" alignItems="center"
                 boxShadow="0 4px 8px 0 rgba(100, 100, 100, 0.05), 0 6px 10px 0 rgba(100, 100, 100, 0.1)" cursor="pointer"
                 _hover={{backgroundColor: p.bg, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.15)"}}>
            <Flex flexDir="column">
                <Flex align="center">
                    <Avatar size="md" name={postSummary.authorName} src={`https://picsum.photos/seed/${postSummary.authorName}/100/100`}/>
                    <Flex flexDir="column" align="start" ml="10pt">
                        <Button zIndex={100} variant="link" onClick={() => {
                                const id = SessionStorage.GetUserId();
                                if (id == "") navigate(`/sessionexpired`);
                                else if (postSummary.autherId != id) navigate(`/profile/${postSummary.autherId}`);
                                else navigate('/mypage');
                            }}>
                            {postSummary.authorName}
                        </Button>
                        <Text>{parseTime(postSummary.timestamp)}</Text>
                    </Flex>
                </Flex>
                <Heading size='lg' my='10pt'>
                    <LinkOverlay onClick={() => navigate(`/post/${postSummary.postId}`)} >
                        <Text>{postSummary.title}</Text>
                    </LinkOverlay>
                </Heading>
                <HStack>
                    {
                        postSummary.tags.map((t, i) => (
                            <Tag key={`tag-${i}`} colorScheme={mainColorTheme} size="sm" _hover={{backgroundColor: p.light}} zIndex={100} cursor="pointer"
                                 onClick={() => {
                                        if (onSelected) onSelected(t);
                                        else navigate(`/search?keyword=${t}`);
                                     }}>
                                {t}
                            </Tag>
                        ))
                    }
                </HStack>
                <Text mt="5pt">{postSummary.summary}</Text>
            </Flex>
            <Flex flexDir="column" align="end" ml="auto">
                <Button isLoading={bookmarkStatus == undefined} variant={bookmarkStatus ? "outline" : "solid"} onClick={toggleBookmark} size="lg" mb="5pt"
                        leftIcon={bookmarkStatus ? <BsBookmarkStarFill /> : <BsBookmarkStar />}>
                    {bookmarkStatus ? "保存済み" : "後で読む"}
                </Button>
                <Flex align="center">
                    <Tag colorScheme={mainColorTheme} size="md">
                        <TagLeftIcon as={BsStarFill}/>
                        <TagLabel>いいね！</TagLabel>
                    </Tag>
                    <Text fontWeight="bold">&nbsp;+{postSummary.like}</Text>
                </Flex>
            </Flex>
        </LinkBox>
        </Flex>
    )
}