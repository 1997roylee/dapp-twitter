import { Button, Divider, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Editor, Tweet } from 'components';
import { useState } from 'react';
import { useTweetsStore } from 'stores';

export default function Home() {
  const [tweet, setTweet] = useState<string>('')
  const { tweets, addTweet } = useTweetsStore(({
    tweets,
    addTweet
  }) => ({
    tweets,
    addTweet
  }))


  const handleChange = (value: string) => {
    setTweet(value)
  }

  const handleTweet = () => {
    addTweet({
      id: (new Date()).getDate(),
      author: '0x0000000000000000000000000000000000000000',
      content: tweet,
      date: new Date()
    })
    setTweet('')
  }

  return (
    <>
      <ConnectButton />

      <Grid templateColumns='repeat(5, 1fr)'>
        <GridItem borderRight='1px solid' borderRightColor='gray.100'>
          <Stack px={4}>
            <Text>
              Home
            </Text>
            <Text>
              Explore
            </Text>
            <Text>
              Notificaionts
            </Text>
            <Button>
              Tweet
            </Button>
          </Stack>
        </GridItem>
        <GridItem colSpan={3} >
          <Stack px={4}>
            <Editor onChange={handleChange} />
            <Button onClick={handleTweet}>Tweet</Button>
            {
              tweets.map((tweet) => <>
              <Tweet key={tweet.id} author={tweet.author} content={tweet.content} date={tweet.date} />
              <Divider/></>)
            }
          </Stack>
        </GridItem>
        <GridItem>
        </GridItem>
      </Grid>
    </>
  )
}