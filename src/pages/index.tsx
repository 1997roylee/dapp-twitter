import { Container, Stack } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Tweet } from 'components';
import Tweets from 'constants/tweets';

export default function Home() {
  return (
    <>
      <ConnectButton />
      {/* <Editor /> */}
      <Container>
        <Stack>
          {
            Tweets.map((tweet) => <Tweet key={tweet.id} author={tweet.author} content={tweet.content} date={tweet.date} />)
          }
        </Stack>
      </Container>
    </>
  )
}