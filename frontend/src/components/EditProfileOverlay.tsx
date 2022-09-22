import { Flex,Button, Box,Text,Heading, Input, Stack, HStack,InputGroup,InputLeftAddon,useDisclosure, FormControl, FormLabel, Select,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    TagCloseButton,
    TagLabel,
    Tag,
    Portal,
    VStack,
    Spinner,
    Center,
    useColorModeValue
  } from '@chakra-ui/react';
import {ArrowRightIcon,ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons'
import React,{useEffect}from 'react';
import  FocusLock from "react-focus-lock"
import { createRef, LegacyRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { PostPost } from '../requests/PostPost';
import {GetAllOrganizationName} from "../requests/GetAllOrganizationName";
import {OrganizationName} from "../requests/GetAllOrganizationName";
import { profile } from '../models/profile';
import {PutProfile} from "../requests/PutProfile";
import { Field, Formik, useField, useFormikContext } from "formik";
import { mainColorTheme, palette } from '../theme';
import { GetProfile } from '../requests/GetProfile';
import SessionStorage from '../utils/SessionStorage';
import { stringify } from 'querystring';
import { PutOrganization } from '../requests/PutOrganization';
import { EnterSubmittableInput } from './EnterSubmittableInput';

const OrganizationFiled = ({...props}) => {
  const {setFieldValue} = useFormikContext();
  
  const [tags, setTags] = useState<OrganizationName[]>(props.value as OrganizationName[])
  const deleteTag = (tag: OrganizationName) => {
      const newTags = tags.filter(t => t != tag);
      setTags(newTags);
      setFieldValue(props.name, newTags);
  }
  const addTag = (tag: OrganizationName) => {
      const newTags = tags.includes(tag) ? tags : [...tags, tag];
      setTags(newTags);
      setFieldValue(props.name, newTags);
  }
  const [tagCandidate, setTagCandidate] = useState("");

  const submit = () => {
      if (tagCandidate == "") return;
      PutOrganization(tagCandidate).then(id => {
        addTag({name: tagCandidate, id: id});
        setTagCandidate("");
      })
  }

  return (
    <VStack align="start">
      {
        tags.map((tag, index) => (
          <Tag key={`tag-${index}`} colorScheme={mainColorTheme} size="md">
              <TagLabel>{tag?.name}</TagLabel>
              <TagCloseButton onClick={() => deleteTag(tag)}/>
          </Tag>
        ))
      }
      <Popover isLazy>
          <PopoverTrigger>
              <Button size="sm" variant="link" aria-label="add">
                  <SmallAddIcon/>
                  組織を追加
              </Button>
          </PopoverTrigger>
          <Portal >
            <Box sx={{"div": {zIndex: 101}}}>
              <PopoverContent boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" p="5pt">
                  <PopoverArrow />
                  <PopoverBody>
                      <HStack>
                          <EnterSubmittableInput value={tagCandidate} onEnterKeyPressed={submit} onChange={e => setTagCandidate(e.target.value)} placeholder="組織の名前を入力"/>
                          <Button disabled={tagCandidate == ""} size="md" onClick={submit}>追加</Button>
                      </HStack>
                  </PopoverBody>
              </PopoverContent>
            </Box>
          </Portal>
      </Popover>
    </VStack>
  )
}

export const EditProfileOverlay: React.FC<{profile: profile, onSubmit: () => void, onCancelled: () => void}> = ({profile, onSubmit, onCancelled}) => {
    const navigate = useNavigate();
    const cancelRef: LegacyRef<HTMLButtonElement> = createRef();
    const p = useColorModeValue(palette.light, palette.dark);

    const [myProfile, setMyProfile] = useState<{name: string, slackId: string, mail: string, greeting: string, organizations: OrganizationName[]}>();

    const [allOrganizationName, setAllOrganizatipnName] = useState<OrganizationName[]>([]);

    useEffect(() => {
      GetAllOrganizationName().then(res => {
        setAllOrganizatipnName(res);   
        let p = {
          name: profile.name,
          slackId: profile.slackId,
          mail: profile.mail,
          greeting: profile.greeting,
          organizations: profile.organizationIds.map(o => res.filter(r => r.id == o)[0])
        };
        setMyProfile(p);
      }).catch(e => {
        console.error(e);
        navigate("/error");
      });
    }, [profile]);

    const submit = (profile: {name: string, slackId: string, mail: string, greeting: string, organizations: OrganizationName[]}) => {
      const p: profile = {
          name: profile.name,
          slackId: profile.slackId,
          mail: profile.mail,
          greeting: profile.greeting,
          organizationIds: profile.organizations.map(o => o.id)
      }
      PutProfile(p).then(res => onSubmit());
    }

    return (
      <>
      <Heading fontSize="3xl" w="100%" textAlign="center" mb="20pt">プロフィールを編集</Heading>
      {
        !myProfile ? <Center w="100%"><Spinner size="lg"/></Center> :
        <Flex flexDir="column">
            <Formik initialValues={myProfile} onSubmit={p => submit(p)}>
              {
                ({handleSubmit, errors, touched}) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <FormControl display="flex" alignItems="center">
                        <Box flex={1} h="100%" bg={p.ash} rounded="md" p={1.5}>
                          <Text fontSize="lg" textAlign="center">名前</Text>
                        </Box>
                        <Field flex={2} as={Input} name="name" placeholder="名前を入力"/>
                      </FormControl>
                      <FormControl display="flex" alignItems="center">
                        <Box flex={1} h="100%" bg={p.ash} rounded="md" p={1.5}>
                          <Text fontSize="lg" textAlign="center">Slack ID</Text>
                        </Box>
                        <Field flex={2} as={Input} name="slackId" placeholder="Slack IDを入力"/>
                      </FormControl>
                      <FormControl display="flex" alignItems="center">
                        <Box flex={1} h="100%" bg={p.ash} rounded="md" p={1.5}>
                          <Text fontSize="lg" textAlign="center">メール</Text>
                        </Box>
                        <Field flex={2} as={Input} type="email" name="mail" placeholder="メールを入力"/>
                      </FormControl>
                      <FormControl display="flex" alignItems="center">
                        <Box flex={1} h="100%" bg={p.ash} rounded="md" p={1.5}>
                          <Text fontSize="lg" textAlign="center">ひとこと</Text>
                        </Box>
                        <Field flex={2} as={Input} name="greeting" placeholder="ひとことを入力"/>
                      </FormControl>
                      <FormControl display="flex" alignItems="center">
                        <Box flex={1} h="100%" bg={p.ash} rounded="md" p={1.5}>
                          <Text fontSize="lg" textAlign="center">組織</Text>
                        </Box>
                        <Box flex={2} px="10pt">
                          <Field as={OrganizationFiled} name="organizations"/>
                        </Box>
                      </FormControl>
                      <VStack justify="center" pt="10pt">
                        <Button type="submit" variant="solid" width='120px'>
                          更新
                        </Button>
                        <Button width='120px' variant="link" onClick={onCancelled}>
                          キャンセル
                        </Button>
                      </VStack>
                    </Stack>
                  </form>
                )
              }
            </Formik>
        </Flex>
    }
    </>
)}