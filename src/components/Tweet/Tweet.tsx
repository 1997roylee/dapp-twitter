import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface Props {
    author: string;
    date: string;
    content: string;
}

export default function Tweet({
    author,
    date,
    content,
}: Props) {
    return <Box>
        <Flex>
            <Avatar src={author} />
            <Text>
                Posted by {author} {dayjs(date).fromNow()}
            </Text>
        </Flex>
        <Box>
            {content}
        </Box>
    </Box>
}