import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
      changeName(state){
        return 'jhon' + state
      }
    }
})

export let { changeName } = user.actions

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})


export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
}) 