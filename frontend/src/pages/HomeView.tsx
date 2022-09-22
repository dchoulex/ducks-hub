import { Box, Button, Center, Flex, HStack, Input, Spacer, Text, VStack } from '@chakra-ui/react';
import { LinkBox, LinkOverlay,Heading } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterSubmittableInput } from '../components/EnterSubmittableInput';
import { Header } from '../components/Header';
import { LinkCard } from '../components/LinkCard';
import { LinkCardList } from '../components/LinkCardList';
import { LinkCardListWithPagenation } from '../components/LinkCardListWithPagenation';
import { postSummary } from '../models/postSummary';
import { rankPostSummary } from '../models/rankPostSummary';
import {GetRanking} from "../requests/GetRanking";
import {GetRecommend} from "../requests/GetRecommend";
import SessionStorage from '../utils/SessionStorage';

export const HomeView: React.FC = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const [tabIndex, setTabIndex] = useState(SessionStorage.GetHomeTabIndex());

    return (
        <>
            <HStack w="95%">
                <Heading fontSize="3xl" w="100%">
                    記事を探す
                </Heading>
                <Spacer />
                <EnterSubmittableInput maxW="350pt" fontWeight="bold" value={keyword} onChange={e => setKeyword(e.target.value)} onEnterKeyPressed={() => navigate(`/search?keyword=${keyword}`)} placeholder="キーワードを入力"/>
                <Button w="100pt" disabled={keyword == ""} onClick={() => navigate(`/search?keyword=${keyword}`)}>検索</Button>
            </HStack>
            <Tabs w="100%" mt="20pt" isLazy index={tabIndex} onChange={i => {setTabIndex(i);SessionStorage.SetHomeTabIndex(i);}}>
                <TabList>
                    <Tab>ランキング</Tab>
                    <Tab>おすすめ</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel display="flex" flexDir="column" alignItems="center">
                        <LinkCardListWithPagenation requestPromise={GetRanking} />
                    </TabPanel>
                    <TabPanel display="flex" flexDir="column" alignItems="center">
                        <LinkCardListWithPagenation requestPromise={GetRecommend} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}