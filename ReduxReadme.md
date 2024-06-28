1. createStore method
2. combineReducer
3. Provider
4. useDispatch
5. useSelector
6. createSlice

7. Actions - It is a function which returns an action object having type and optional payload
   example
   function callApi(){
   return ({type:"callingApi",payload:[]})
   }
8. Reducers - It is a function which accepts state and action, depending on the action it performs some operations
   and returns the state

   example
   function reducer(state = {loading: false,count:0},action) {
   if (action.type === "loading") {
   console.log('dispatching loading')
   state.loading = true;
   state.count+=1
   }
   if (action.type === "error") {
   state.loading = false;
   }
   return state;
   }

9. Dispatch - It is used to dispatch an action to a reducer
   example - dispatch({ type:'loading', payload:[]})

   - dispatch behind the scene calls the reducer function

10. createStore - It accepts a reducer and returns a an object which has dispatch, getState,subscribe methods
    example - const store = createStore(reducer)

11. combineReducer - It accepts reducers object and combines all the reducers and returns a function whicjh
    further returns a state with reducer key and function as value

    example - const reducer=combineReducer(reducersObject)

12. Provider -
    It used Context api behind the scene
    example - <Provider store={store}></Provider>

13. useDispatch -
    It uses the dispatch method obtained from store
    We get the dispatch method from the Provider since Provider contains value returned from the store

14. useSelector -
    It used the getState obtained from the store

15. createSlice -
    CreateSlice creates actions automatically based on the name and reducers, so we dont have to create actions manually
    It is a function which accepts name,initialState, reducer as their arguments and returns name,reducers,actions

    const slice=function creatSlice({name,initialState,reducers}){
    return {name,reducer,actions}
    }

    - produce(originalState,(stateCopy)=>stateCopy) from immerjs is used under the hood which allows for writing mutatin code
