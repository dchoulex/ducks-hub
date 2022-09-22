import { Box, Button, Center, Divider, Flex, Heading, HStack, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { EnterSubmittableInput } from '../components/EnterSubmittableInput';
import { Header } from '../components/Header';
import { LinkCard } from '../components/LinkCard';
import { LinkCardList } from '../components/LinkCardList';
import { LinkCardListWithPagenation } from '../components/LinkCardListWithPagenation';
import { postSummary } from '../models/postSummary';
import { GetSearchResult } from '../requests/GetSearchResult';

export const SearchView: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchWord, setSearchWord] = useState<string>("");

    const [lastKeyword, setLastLeyword] = useState<string>();

    useEffect(() => {
        search(searchParams.get("keyword") ?? "");
    }, []);

    const search = (word: string) => {
        if (word == "" || word == lastKeyword) return;
        setSearchWord("");
        setLastLeyword(word);
        setSearchParams({});
    }

    return (
        <>
            <HStack w="95%">
                <Heading fontSize="3xl" w="100%">
                    記事を探す
                </Heading>
                <EnterSubmittableInput maxW="350pt" fontWeight="bold" value={searchWord} onChange={e => setSearchWord(e.target.value)} onEnterKeyPressed={() => search(searchWord)} placeholder="キーワードを入力"/>
                <Button w="100pt" disabled={searchWord == ""} onClick={() => search(searchWord)}>検索</Button>
            </HStack>
            {
                !!lastKeyword && (
                    <Flex flexDir="column" alignItems="center">
                        <Box w="90%" mb="15pt">
                            <Divider m="20pt"/>
                            <Heading fontSize="3xl">検索結果：{lastKeyword}</Heading>
                        </Box>
                        <LinkCardListWithPagenation mx="5%" alignSelf="start" requestPromise={(page) => GetSearchResult(lastKeyword, page)} onSelected={t => search(t)}/>
                    </Flex>
                )
            }
            
        </>
    )
}