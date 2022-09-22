import { forwardRef, FlexProps, Center, VStack, Image, Heading } from "@chakra-ui/react";
import { postSummary } from "../models/postSummary";
import { LinkCard } from "./LinkCard";

export const LinkCardList = forwardRef<FlexProps & {posts: postSummary[] | undefined, onSelected?: (tag: string) => void}, "div">((props, ref) => (
    <Center flexDir="column" w="100%" ref={ref} {...props as FlexProps}>
        {
            props.posts?.map((p, i) => (
                <LinkCard key={i} postSummary={p} onSelected={props.onSelected}/>
            ))
        }
    </Center>
))