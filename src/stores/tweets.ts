import create from 'zustand'

export interface Tweet {
    id: number,
    content: string,
    author: string,
    date: Date,
}

export interface TweetsState {
    tweets: Tweet[]
    // eslint-disable-next-line no-unused-vars
    addTweet: (tweet: Tweet) => void
    // eslint-disable-next-line no-unused-vars
    removeTweet: (id: number) => void
    clearTweets: () => void

}


export const useTweetsStore = create<TweetsState>((set) => ({
    tweets: [],
    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
    removeTweet: (id) => set((state) => ({ tweets: state.tweets.filter((tweet) => tweet.id !== id) })),
    clearTweets: () => set(() => ({ tweets: [] })),
}))