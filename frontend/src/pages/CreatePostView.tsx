import { Heading, AlertDialog, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogHeader, Button, Center, Flex, 
    Text, Textarea, AlertDialogBody, AlertDialogFooter, useDisclosure, Input, Badge, HStack, IconButton, Tag, TagLabel, TagCloseButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, AlertDialogContent, useToast } from '@chakra-ui/react';
import React, { createRef, LegacyRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetPost } from '../requests/GetPost';
import { PostPost } from '../requests/PostPost';
import { PutPost } from '../requests/PutPost';
import { SmallAddIcon } from "@chakra-ui/icons";
import MDEditor from '@uiw/react-md-editor';
import SessionStorage from '../utils/SessionStorage';
import { mainColorTheme } from '../theme';
import { EnterSubmittableInput } from '../components/EnterSubmittableInput';

const TagView: React.FC<{tags: string[], setTags: (tags: string[]) => void}> = ({tags, setTags}) => {
    const [tagCandidate, setTagCandidate] = useState("");

    const deleteTag = (tag: string) => {
        setTags(tags.filter(t => t != tag));
    }
    const addTag = (tag: string) => {
        const newTags = tags.includes(tag) ? tags : [...tags, tag];
        setTags(newTags);
    }

    return (
        <HStack m="5pt" align="center">
            {
                tags.map((t, i) => (
                    <Tag key={`tag-${i}`} colorScheme={mainColorTheme} size="md">
                        <TagLabel>{t}</TagLabel>
                        <TagCloseButton onClick={() => deleteTag(t)}/>
                    </Tag>
                ))
            }
            <Popover>
                <PopoverTrigger>
                    <Button size="sm" variant="link" aria-label="add">
                        <SmallAddIcon/>
                        タグを追加
                    </Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" p="5pt">
                        <PopoverArrow />
                        <PopoverBody>
                            <HStack>
                                <EnterSubmittableInput value={tagCandidate} onChange={e => setTagCandidate(e.target.value)} onEnterKeyPressed={() => {
                                    if (tagCandidate == "") return;
                                    addTag(tagCandidate);
                                    setTagCandidate("");
                                }} placeholder="タグの名前を入力"/>
                                <Button disabled={tagCandidate == ""} size="md" onClick={() => {
                                    if (tagCandidate == "") return;
                                    addTag(tagCandidate);
                                    setTagCandidate("");
                                }}>追加</Button>
                            </HStack>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </HStack>
    )
};

export const CreatePostView: React.FC = () => {
    const userId = SessionStorage.GetUserId();
    const {postid} = useParams();

    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef: LegacyRef<HTMLButtonElement> = createRef();
    const toast = useToast();

    useEffect(() => {
        if (!postid || postid == "" ) return;
        GetPost(postid).then(p => {
            if (p.autherId == userId) {
                setTitle(p.title);
                setText(p.text);
                setTags(p.tags);
            } else
                navigate('/createpost');
        });
    }, []);

    const postPost = async () => {
        if (!text || text == "") return;
        try{
            const postId = await PostPost(title, text, tags);
            if (!postId) {
                toast({
                    title: "投稿エラー",
                    description: "投稿に失敗しました",
                    status: "error",
                    isClosable: true
                });
            } else {
                navigate(`/post/${postId}`);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const putPost = async () => {
        if (!text || text == "" || !postid) return;
        try{
            await PutPost(postid, title, text, tags);
            navigate(`/post/${postid}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Heading fontSize="3xl" w="100%">
                {postid && postid != "" ? "記事を編集" : "新しい記事を作成"}
            </Heading>
            <Flex flexDir="column" m="10pt" w="95%">
                <Flex>
                    <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="記事のタイトル" mr="10pt"/>
                    <Button isDisabled={text == "" || title == ""} onClick={() => onOpen()} w="200pt">投稿</Button>
                </Flex>
                <TagView tags={tags} setTags={t => setTags(t)}/>
                <MDEditor value={text} onChange={e => setText(e!)} placeholder="本文を入力" height={400}/>
            </Flex>
            <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        記事を投稿
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        記事を送信し、公開してもよろしいですか？
                    </AlertDialogBody>
                    <AlertDialogFooter justifyContent="center">
                        <Button ref={cancelRef} onClick={onClose}>
                            キャンセル
                        </Button>
                        <Button variant="solid" onClick={() => {
                            if (postid && postid != "" ) 
                                putPost();
                            else
                                postPost();
                            onClose();
                        }} ml={3}>
                            投稿
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}