import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type postState = {
  id?: number
  title?: string
  text?: string
  createdAt?: string
  owner?: string
}

const initialState: postState = {
  id: undefined,
  title: undefined,
  text: undefined,
  createdAt: undefined,
  owner: undefined,
}

const userSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost(state, action: PayloadAction<postState>) {
      state = action.payload
    },
  },
})

export const { selectPost } = userSlice.actions

export default userSlice.reducer
