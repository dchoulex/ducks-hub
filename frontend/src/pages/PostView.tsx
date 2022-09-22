import { Flex, Heading, Text, Box, Button, Avatar, Divider, HStack, Tag, Input, Center, Spinner, TagLabel, TagLeftIcon, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { post } from '../models/post';
import { GetLike } from '../requests/GetLike';
import { GetPost } from "../requests/GetPost";
import { GetBookmark } from "../requests/GetBookmark";
import { parseTime } from '../utils/parseTime';
import { PostLike } from '../requests/PostLike';
import { PostBookmark } from '../requests/PostBookmark';
import { PostFollow } from '../requests/PostFollow';
import { BsBookmarkStarFill, BsBookmarkStar, BsStarFill, BsStar } from "react-icons/bs";
import { PostComment } from '../requests/PostComment';
import MDEditor from '@uiw/react-md-editor';
import SessionStorage from '../utils/SessionStorage';
import { mainColorTheme, palette } from '../theme';
import { EnterSubmittableInput } from '../components/EnterSubmittableInput';

export const PostView: React.FC = () => {
    const userId = SessionStorage.GetUserId();
    const navigate = useNavigate();
    const {postid} = useParams();
    const [post, setPost] = useState<post | undefined | null>();

    const [bookmarkStatus, setBookmarkStatus] = useState<boolean>();
    const [likeStatus, setLikeStatus] = useState<boolean>();
    const [followStatus, setFollowStatus] = useState<boolean>();

    const [comment, setComment] = useState("");
    
    const p = useColorModeValue(palette.light, palette.dark);

    useEffect(() => {
        if (!postid) {
            navigate("/error");
            return;
        }
        try{
            GetLike(postid).then(res => setLikeStatus(res)).catch(e => {
                console.error(e);
                navigate("/sessionexpired");
            });
            GetBookmark(postid).then(res => setBookmarkStatus(res)).catch(e => {
                console.error(e);
                navigate("/sessionexpired");
            });
            GetPost(postid).then(post => setPost(post)).catch(e => {
                console.error(e);
                navigate("/error");
            });
        } catch(e) {
            console.error(e);
            navigate("/error");
        }
    }, []);

    const toggleLike = () => {
        if (!postid) return;
        PostLike(postid).then(res => {
            setLikeStatus(res);
            if (!post) return;

            const last = {...post};
            last.like = res ? last.like + 1 : last.like - 1;
            setPost(last);
        }).catch(e => {
            console.error(e);
            navigate("/error");
        });
    }
    const toggleBookmark = () => {
        if (!postid) return;
        PostBookmark(postid).then(res => setBookmarkStatus(res)).catch(e => {
            console.error(e);
            navigate("/sessionexpired");
        });
    }
    const toggleFollow = () => {
        if (!postid || !post) return;
        PostFollow(post.autherId).then(res => setFollowStatus(res)).catch(e => {
            console.error(e);
            navigate("/sessionexpired");
        });
    }

    const postComment = () => {
        if (comment == "" || !postid) return;
        PostComment(postid, comment).then(res => {
            setComment("");
            GetPost(postid).then(post => setPost(post));
        }).catch(e => {
            console.error(e);
            navigate("/error");
        });
    }

    return (
        <>
            {
                post == undefined ?
                    <Center><Spinner size="xl"/></Center>
                : post == null ?
                <Box>
                    <Heading fontSize="3xl">記事が見つかりませんでした</Heading>
                </Box> :
                <Box w="100%">
                    <Flex my="10pt" align="center">
                        <Avatar size="md" mr="5pt" name={post.authorName} src={`https://picsum.photos/seed/${post.authorName}/100/100`}/>
                        <Button mr="25pt" variant="link" onClick={() => {
                                const id = SessionStorage.GetUserId();
                                if (id == "") navigate(`/sessionexpired`);
                                else if (post.autherId != id) navigate(`/profile/${post.autherId}`);
                                else navigate('/mypage');
                            }}>
                            <Heading fontSize="xl" mr="auto">{post.authorName}</Heading>
                        </Button>
                        {
                            userId && userId == post.autherId ? "" :
                            <Button colorScheme={mainColorTheme} variant={followStatus ? "outline" : "solid"} size="sm" onClick={toggleFollow}>
                            {
                                followStatus ? "フォロー中" : "フォローする"
                            }
                        </Button>
                        }
                    </Flex>
                    <Text>{parseTime(post.timestamp)}</Text>
                    <Flex align="center" my="10pt">
                        <Heading fontSize="4xl" mr="10pt">{post.title}</Heading>
                        <Flex align="center" mr="auto">
                            <Tag colorScheme={mainColorTheme} variant="outline" size="md">
                                <BsStar />
                                <Text fontWeight="bold">&nbsp;+{post.like}</Text>
                            </Tag>
                        </Flex>
                        <Button mr="5pt" variant={likeStatus ? "outline" : "solid"} onClick={toggleLike}
                                leftIcon={likeStatus ? <BsStarFill /> : <BsStar />}>
                            {likeStatus ? "いいね済み" : "いいね！"}
                        </Button>
                        <Button variant={bookmarkStatus ? "outline" : "solid"} onClick={toggleBookmark}
                                leftIcon={bookmarkStatus ? <BsBookmarkStarFill /> : <BsBookmarkStar />}>
                            {bookmarkStatus ? "保存済み" : "後で読む"}
                        </Button>
                    </Flex>
                    <HStack my="5pt">
                        {
                            post.tags.map((t, i) => (
                                <Tag key={`tag-${i}`} colorScheme={mainColorTheme} size="sm" _hover={{backgroundColor: palette.light}} zIndex={100} cursor="pointer"
                                     onClick={() => navigate(`/search?keyword=${t}`)}>
                                    {t}
                                </Tag>
                            ))
                        }
                    </HStack>
                    {
                        userId != post.autherId ? "" :
                        <Flex mt="5pt">
                            <Button ml="auto" onClick={() => navigate(`/editpost/${postid}`)}>投稿を編集</Button>
                        </Flex>
                    }
                    <Box m="2pt" p="13pt" bg={palette.light.bg} rounded="lg">
                        <MDEditor.Markdown source={post.text}/>
                    </Box>
                    <Divider />
                    <Flex m="20pt" flexDir="column">
                        <Heading fontSize="xl">コメント</Heading>
                        {
                            post.comments.map((c, i) => (
                                <Box key={i} m="15pt">
                                    <Flex align="center">
                                        <Avatar size="sm" mr="5pt" name={c.name} src={`https://picsum.photos/seed/${c.name}/100/100`}/>
                                        <Button variant="link" onClick={() => navigate(`/profile/${c.userId}`)}>
                                            <Heading fontSize="lg">{c.name}</Heading>
                                        </Button>
                                        <Text ml="auto">{parseTime(c.timestamp)}</Text>
                                    </Flex>
                                    <Text m="5pt">{c.text}</Text>
                                </Box>
                            ))
                        }
                        <Flex flexDir="column" mx="20pt" my="10pt" maxW="600pt">
                            <Heading fontSize="lg" w="100%">コメントを残す</Heading>
                            <HStack w="100%" my="5pt">
                                <EnterSubmittableInput value={comment} onChange={e => setComment(e.target.value)} onEnterKeyPressed={() => postComment()} placeholder="コメントを入力"/>
                                <Button disabled={comment == ""} variant="solid" onClick={postComment}>送信</Button>
                            </HStack>
                        </Flex>
                    </Flex>
                </Box>
            }
        </>
    )
}