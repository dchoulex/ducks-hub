import { forwardRef, Flex, Input,Text, Button, Heading, HStack, Spacer, Stack, FlexProps, Avatar, VStack, Spinner, Box, Center, Tag, Wrap, TagProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger,Portal,PopoverFooter, Table, Tbody, Tr, Th, Divider,
    FormControl, FormLabel, Select,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,
    TagCloseButton,
    TagLabel,
    useColorModeValue,
    IconButton,
    useBoolean,
    Editable,
    EditablePreview,
    EditableInput,
    InputGroup,
    InputLeftAddon} from '@chakra-ui/react';
import React, { createRef, LegacyRef,useEffect, useState, useRef } from 'react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { organization } from '../models/organization';
import { profile } from '../models/profile';
import { GetFollow } from '../requests/GetFollow';
import { GetOrganization } from '../requests/GetOrganization';
import { GetProfile } from '../requests/GetProfile';
import { PostFollow } from '../requests/PostFollow';
import { mainColorTheme, palette } from '../theme';
import { EditProfileOverlay } from '../components/EditProfileOverlay';
import { PutOrganization } from '../requests/PutOrganization';


const OrganizationTag = forwardRef<TagProps & {organization: organization, onUpdate: () => void}, 'div'>((props, ref) => {
    const popoverRef = useRef();
    const [isEditing, setIsEditing] = useBoolean(false);
    const org = (props as {organization: organization}).organization;

    const [name, setName] = useState(org.name);
    const [greeting, setGreeting] = useState(org.greeting);
    const [mail, setMail] = useState(org.mail);

    const [completable, setCompletable] = useBoolean(false);

    const cancel = () => {
        setName(org.name);
        setGreeting(org.greeting);
        setMail(org.mail);
        setCompletable.off();
        setIsEditing.off();
    }

    const valid = (name: string, greeting: string, mail: string) => {
        if (name == "" || (name == org.name && greeting == org.greeting && mail == org.mail)) {
            setCompletable.off();
        } else {
            setCompletable.on();
        }
    }

    const submit = async () => {
        if (name == "" || (name == org.name && greeting == org.greeting && mail == org.mail)) {
            cancel();
            return;
        }

        try {
            await PutOrganization(name, mail, greeting);

            props.onUpdate();
            setCompletable.off();
            setIsEditing.off();
        } catch(e) {
            console.error(e);
            cancel();
        }
    }

    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Tag colorScheme={mainColorTheme} _hover={{backgroundColor: palette.light}} zIndex={100} size="sm" ref={ref} {...props as TagProps} cursor="pointer">
                    {org.name}
                </Tag>
            </PopoverTrigger>
            <PopoverContent boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" p="5pt" w="inherit">
                <PopoverArrow />
                <PopoverHeader display="flex" justifyContent="space-between" alignItems="center">
                    {
                            isEditing ? 
                            <InputGroup>
                                <InputLeftAddon>名前</InputLeftAddon>
                                <Input fontSize="lg" fontWeight="bold" value={name} onChange={e => {
                                        setName(e.target.value);
                                        valid(e.target.value, greeting, mail);
                                    }} />
                            </InputGroup> :
                            <Heading fontSize="lg">{name}</Heading>
                    }
                    {
                        !isEditing ?
                        <IconButton fontSize="xl" aria-label="editButton" onClick={setIsEditing.on} variant="link" icon={<EditIcon />}/> :
                        <HStack spacing={0}>
                            <IconButton fontSize="md" aria-label="cancelButton" onClick={cancel} variant="link" icon={<CloseIcon />}/>
                            <IconButton isDisabled={!completable} fontSize="md" aria-label="checkButton" onClick={submit} variant="link" icon={<CheckIcon />}/>
                        </HStack>
                    }
                </PopoverHeader>
                <PopoverBody>
                    {
                        isEditing ? 
                        <InputGroup>
                            <InputLeftAddon>ひとこと</InputLeftAddon>
                            <Input value={greeting} onChange={e => {
                                    setGreeting(e.target.value);
                                    valid(name, e.target.value, mail);
                                }} />
                        </InputGroup> :
                        <Text>{greeting}</Text>
                    }
                    {
                        isEditing ? 
                        <InputGroup mt="5pt">
                            <InputLeftAddon>メール</InputLeftAddon>
                            <Input fontWeight="bold" value={mail} onChange={e => {
                                    setMail(e.target.value);
                                    valid(name, greeting, e.target.value);
                                }} />
                        </InputGroup> :
                        <Text>{mail}</Text>
                    }
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
});

export const ProfileCard: React.FC<{userId: string, isMe: boolean}> = ({userId, isMe}) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef: LegacyRef<HTMLButtonElement> = createRef();
    const [isFollowing, setIsFollowing] = useState<boolean>();
    const [profile, setProfile] = useState<profile>();
    const [organizations, setOrganizations] = useState<organization[]>([]);
    const p = useColorModeValue(palette.light, palette.dark);

    const updateProfile = () => {
        GetProfile(userId).then(p => {
            setProfile(p);
            Promise.all(p.organizationIds.map(id => GetOrganization(id))).then(os => setOrganizations(os))
        }).catch(e => {
            console.error(e);
            navigate("/error");
        });
    }

    useEffect(() => {
        try{
            updateProfile();
            if (isMe) return;
            GetFollow(userId).then(res => setIsFollowing(res)).catch(e => {
                console.error(e);
                navigate("/sessionexpired");
            });
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }, [userId, isMe])

    const toggleFollow = () => {
        if (isMe) return;
        PostFollow(userId).then(res => setIsFollowing(res));
    }

    if (!profile) return <Center w="100%" py="30pt"><Spinner size="xl"/></Center>

    return (
        <Center bg={p.bgDim} h="fit-content" flexDir="column" w="inherit" boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" p="20pt" m="10pt">
            <Flex align="center" w="100%" my="5pt">
                <Avatar size="md" mr="10pt" name={profile.name} src={`https://picsum.photos/seed/${profile.name}/100/100`}/>
                <Heading fontSize="3xl">{profile.name}</Heading>
            </Flex>
            <Wrap my="5pt" alignSelf="start">
                {
                    organizations.map((o, i) => (<OrganizationTag onUpdate={updateProfile} key={`org-${i}`} organization={o} />))
                }
            </Wrap>
            <Text fontSize="lg" placeSelf="start" mt="10pt">{profile.greeting}</Text>
            <Divider mt="10pt" mb="5pt"/>
            <VStack w="100%" px="5pt">
                <HStack w="100%">
                    <Heading flex={1} fontSize="md">SlackID</Heading>
                    <Text flex={2} fontSize="md">{profile.slackId}</Text>
                </HStack>
                <HStack w="100%">
                    <Heading flex={1} fontSize="md">メール</Heading>
                    <Text flex={2} fontSize="md">{profile.mail}</Text>
                </HStack>
            </VStack>
            <Divider mt="5pt" mb="10pt"/>
            {
                !isMe ? 
                <Button isLoading={isFollowing == undefined} colorScheme={mainColorTheme} variant={isFollowing ? "outline" : "solid"} size="md" onClick={toggleFollow}>
                    {
                        isFollowing ? "フォロー中" : "フォローする"
                    }
                </Button> :
                 <Button onClick={onOpen}>プロフィールを編集</Button>
            }
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
                <Portal>
                <AlertDialogOverlay style={{zIndex: 100}}>
                    <AlertDialogContent>
                        <AlertDialogHeader>

                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <EditProfileOverlay profile={profile} onSubmit={() => {
                                updateProfile();
                                onClose();
                            }} onCancelled={onClose}/>
                        </AlertDialogBody>
                        <AlertDialogFooter/>
                    </AlertDialogContent>
                </AlertDialogOverlay>
                </Portal>
            </AlertDialog>
        </Center>
    )
};