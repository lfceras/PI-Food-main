import {createSlice} from '@reduxjs/toolkit'

export const currentPage = createSlice({
  name: 'page',
  initialState: {
    page: 1
  },
  reducers: {
    setCurrentPage: (state, action)=>{
      state.page = action.payload
    }
  }
}) 

export const {setCurrentPage} = currentPage.actions
export default currentPage.reducer
