import { forwardRef, FlexProps, Center, HStack, VStack, Image, Spinner, Heading, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postSummary } from "../models/postSummary";
import { LinkCardList } from "./LinkCardList";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";

export const LinkCardListWithPagenation = forwardRef<FlexProps & {onSelected?: (tag: string) => void, requestPromise: (page: number) => Promise<{data: postSummary[], totalPage: number}>}, "div">((props, ref) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [posts, setPosts] = useState<postSummary[]>();

    useEffect(() => {
        updatePage(1);
    }, [props.requestPromise, props.onSelected]);

    const updatePage = (page: number) => {
        if (currentPage == page || page < 1 || page > totalPage) return;
        setPosts(undefined);
        props.requestPromise(page).then(res => {
            setPosts(res.data);
            setTotalPage(res.totalPage);
            setCurrentPage(page);
        })
    }

    return (
        <>
            {
                !posts ? <Center w="100%" py="30pt"><Spinner size="xl"/></Center> : 
                <LinkCardList posts={posts} onSelected={props.onSelected} ref={ref} {...props as FlexProps}/>
            }
            {
                posts && posts.length == 0 && (
                    <VStack w="60%">
                        <Image p="20pt" src="https://placekitten.com/450/450" rounded="full" style={{filter: "blur(3px) grayscale(50%) opacity(25%)"}}/>
                        <Text fontSize="lg">表示する内容がありません</Text>
                    </VStack>
                )
            }
            {
                totalPage != 1 &&
                <HStack w="100%" justify="center" my="10pt">
                    <IconButton isDisabled={currentPage==1} fontSize="xl" rounded="lg" onClick={() => updatePage(1)} icon={<FiChevronsLeft />} aria-label="first"/>
                    <IconButton isDisabled={currentPage==1} fontSize="xl" rounded="lg" onClick={() => updatePage(currentPage - 1)} icon={<FiChevronLeft />} aria-label="before"/>
                    <Heading size="lg" px="10pt">{currentPage} / {totalPage}</Heading>
                    <IconButton isDisabled={currentPage==totalPage} fontSize="xl" rounded="lg" onClick={() => updatePage(currentPage + 1)} icon={<FiChevronRight />} aria-label="next"/>
                    <IconButton isDisabled={currentPage==totalPage} fontSize="xl" rounded="lg" onClick={() => updatePage(totalPage)} icon={<FiChevronsRight />} aria-label="last"/>
                </HStack>
            }
        </>
    )
});