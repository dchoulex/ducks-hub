import { Flex, Button, Image, Link, Text, Input, Heading, Center, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterSubmittableInput } from '../components/EnterSubmittableInput';
import {GetLogin} from '../requests/GetLogin';
import SessionStorage from "../utils/SessionStorage";

export const LoginView: React.FC = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [isTryLogin, setIsTryLogin] = useState(false);

    const login = () => {
        if (id == "") return;
        setIsTryLogin(true);
        GetLogin(id).then(res => {
            setIsTryLogin(false);
            if (res){
                SessionStorage.SetUserId(id);
                navigate('/home');
            } else {
                setId("");
                alert("ログインに失敗しました");
            }
        });
    }

    return (
        <Flex h="100vh" alignItems="center">
            {
                isTryLogin ? 
                <Flex flexDir="column">
                    <Center w="100%"><Spinner size="xl"/></Center>
                    <Heading fontSize="2xl" mt="10pt">ログイン中です</Heading>
                </Flex> :
                <Flex flexDir="column">
                    <Flex alignItems="center" my="10pt">
                        <Heading flex={1} fontSize="xl" mr="5pt">ユーザID</Heading>
                        <EnterSubmittableInput flex={2} value={id} onEnterKeyPressed={v => login()} onChange={e => setId(e.target.value)} placeholder="User ID"/>
                    </Flex>
                    <Button disabled={id == ""} onClick={login}>ログイン</Button>
                </Flex>
            }
        </Flex>
    )
}

function SetUserId(id: string) {
    throw new Error('Function not implemented.');
}
