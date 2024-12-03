import { configureStore, combineSlices, ThunkAction, Action } from '@reduxjs/toolkit'
import {loadSlice} from '../features/load/loadSlice'
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineSlices(loadSlice);

export type RootState = ReturnType<typeof rootReducer>;


export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState
    });
    setupListeners(store.dispatch);
    return store;
  };

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
