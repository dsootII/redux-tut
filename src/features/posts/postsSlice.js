import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns'

//a slice needs: a name, initial state, reducers

const initialState = [
  { 
    id: '1', 
    title: 'First Post!', 
    content: 'Hello!', 
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 1}
  },
  { 
    id: '2', 
    title: 'Second Post', 
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 3, eyes: 0} 
  }
]

const postsSlice = createSlice({
  name: 'posts',                    //the name
  initialState,                     //the initial state
  reducers: {                       //the reducers
    addPost: {
      reducer: (state, action) => {
      state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(), 
            title, 
            content,
            user: userId
          }
        }
      }
    },
    updatePost: (state, action) => {
      const {id, title, content} = action.payload;
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title,
        existingPost.content = content
      }
    },
    addReaction: {
      reducer: (state, action) => {
        const {postId, reaction} = action.payload
        const post = state.posts.find(post => post.id === postId)
        if (post) post.reactions[reaction]++
      }
    }
  }
})

export const { addPost, updatePost } = postsSlice.actions; 
export const postsReducer = postsSlice.reducer;
