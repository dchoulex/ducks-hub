import { Tabs,TabList,TabPanels,TabPanel,Tab,Button, Flex, Text, Image, Stack, Box, Wrap, HStack, Heading, Avatar, VStack } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { LinkCard } from '../components/LinkCard';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postSummary } from '../models/postSummary';
import { GetUserPosts } from '../requests/GerUserPosts';
import { GetUserLikePosts } from '../requests/GetUserLikePosts';
import { GetUserBookmarkPosts } from '../requests/GetUserBookmarkPosts';
import {ProfileCard} from "../components/ProfileCard";
import { LinkCardList } from '../components/LinkCardList';
import SessionStorage from '../utils/SessionStorage';
import { LinkCardListWithPagenation } from '../components/LinkCardListWithPagenation';
import { GetFollower } from '../requests/GetFollower';
import { SimpleProfileCard } from '../components/SimpleProfileCard';

export const MyPageView: React.FC = () => {
    const myUserId = SessionStorage.GetUserId();
    const {userid} = useParams();

    const [targetId, setTargetId] = useState<string>();
    const [isMe, setIsMe] = useState<boolean>();
    
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState<number>();

    const [followers, setFollowers] = useState<{name: string, id: string}[]>();

    const updateView = (id: string, isMe: boolean) => {
        setTargetId(id);
        setIsMe(isMe);
        setTabIndex(SessionStorage.GetProfileTabIndex(id));
        GetFollower(id).then(res => setFollowers(res));
    }

    useEffect(() => {
        setTabIndex(0);
        if (userid && userid != "undefined" && userid != myUserId){
            updateView(userid, false);
        } else if (userid && userid != "undefined"){
            navigate("/error");
        } else if (myUserId) {
            updateView(myUserId, true);
        } else {
            navigate("/sessionexpired");
        }
    }, [userid]);

    return (
        <Flex w="100%" justify="space-between" flexFlow="wrap-reverse">
            {
                tabIndex != undefined && targetId != undefined && isMe != undefined &&
                <>
                <Tabs w={{sm: "100%", md: "100%", lg: "calc(100% - 280pt)"}} isLazy index={tabIndex} onChange={i => {setTabIndex(i);SessionStorage.SetProfileTabIndex(i, targetId);}}>
                    <TabList>
                        <Tab>投稿した記事</Tab>
                        <Tab>いいねした記事</Tab>
                        <Tab>保存した記事</Tab>
                        <Tab>フォロー一覧</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel display="flex" flexDir="column" alignItems="center">
                            <LinkCardListWithPagenation requestPromise={(page) => GetUserPosts(targetId, page)}/>
                        </TabPanel>
                        <TabPanel display="flex" flexDir="column" alignItems="center">
                            <LinkCardListWithPagenation requestPromise={(page) => GetUserLikePosts(targetId, page)}/>
                        </TabPanel>
                        <TabPanel display="flex" flexDir="column" alignItems="center">
                            <LinkCardListWithPagenation requestPromise={(page) => GetUserBookmarkPosts(targetId, page)}/>
                        </TabPanel>
                        <TabPanel display="flex" flexDir="column" alignItems="center">
                            {
                                followers && followers.length == 0 && (
                                    <VStack w="60%">
                                        <Image p="20pt" src="https://placekitten.com/450/450" rounded="full" style={{filter: "blur(3px) grayscale(50%) opacity(25%)"}}/>
                                        <Text fontSize="lg">まだ誰もフォローしていません</Text>
                                    </VStack>
                                )
                            }
                            {
                                followers && followers.length != 0 && (
                                    <>
                                        <Heading fontSize="2xl" m="10pt">フォロー中のユーザー</Heading>
                                        {
                                            followers && followers.map((f, i) => (
                                                <SimpleProfileCard key={i} uname={f.name} uid={f.id}/>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Flex w="280pt" mb="20pt">
                    <ProfileCard userId={targetId} isMe={isMe}/>
                </Flex>
                </>
            }
        </Flex>
    )
}