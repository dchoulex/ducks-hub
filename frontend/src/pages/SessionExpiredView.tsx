import { Box, Button, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SessionExpiredView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Flex h="100vh" alignItems="center">
            <Flex flexDir="column">
                <Heading fontSize="3xl">ページの読み込みでエラーが発生しました</Heading>
                <Button onClick={() => navigate('/')}>トップに戻る</Button>
            </Flex>
        </Flex>
    )
}