import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export interface LoadState {
    loading: boolean
}

const initialState: LoadState = {
  loading: false,
}

export const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setToLoad: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading = true
    },
    unLoad: (state) => {
      state.loading = false
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { setToLoad, unLoad } = loadSlice.actions

export const getLoadingState = (state: RootState): boolean => state.load.loading;

export default loadSlice.reducer