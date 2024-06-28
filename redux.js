// 1. createStore method
// 2. combineReducer
// 3. Provider
// 4. useDispatch
// 5. useSelector
// 6. createSlice

function reducer(
    state = {
      loading: false,
      count: 0,
    },
    action
  ) {
    if (action.type === "loading") {
      console.log("dispatching loading");
      state.loading = true;
      state.count += 1;
    }
    if (action.type === "errors") {
      state.loading = false;
    }
    return state;
  }
  function errorReducer(
    state = {
      loading: false,
      count: 0,
    },
    action
  ) {
    if (action.type === "errors") {
      console.log("dispatching loading");
      state.loading = true;
      state.count -= 1;
    }
    return state;
  }
  let state;
  let listeners = [];
  export const createStore = (reducer) => {
    const store = {
      getState() {
        return state;
      },
      dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listen) => listen());
      },
      subscribe(listener) {
        listeners.push(listener);
  
        return function unsubscribe() {
          let index = listeners.findIndex((item) => listener === item);
          if (index !== -1) listeners.splice(index, 1);
        };
      },
    };
  
    store.dispatch({ type: "@@INIT" });
  
    return store;
  };
  
  const combinedReducers = (reducers) => {
    let newState = {};
    return function (state = {}, action) {
      Object.entries(reducers).map(([reducerKey, reducerFn]) => {
        newState[reducerKey] = reducerFn(state[reducerKey], action);
      });
      return newState;
    };
  };
  
  const reducerCombined = combinedReducers({
    loading: reducer,
    error: errorReducer,
  });
  console.log("reducerCombined", reducerCombined);
  
  export const store = createStore(reducerCombined);
  
  store.dispatch({ type: "loading" });
  store.subscribe((list) => console.log(store.getState()));
  
  const StoreContext = createContext(store);
  export const Provider = ({ store, children }) => {
    const [state, setState] = useState(store.getState());
  
    useEffect(() => {
      store.subscribe(() => {
        setState(store.getState());
      });
    }, []);
    return (
      <StoreContext.Provider value={{ state, dispatch: store.dispatch }}>
        {children}
      </StoreContext.Provider>
    );
  };
  
  // const useDispatch=()=>{
  //   const store=useContext(StoreContext)
  //   return store.dispatch
  // }
  const useDispatch = () => useContext(StoreContext).dispatch;
  
  // const useSelector = (selector) => {
  //   const store = useContext(StoreContext);
  
  //   return selector(store.state);
  // };
  const useSelector = (selector) => selector(useContext(StoreContext).state);
  
  const createSlice = (config) => {
    const { name, initialState, reducers } = config;
  
    // creating actions
    let actions = {};
  
    Object.keys(reducers).map((reducerKey) => {
      actions[reducerKey] = function (payload) {
        return { type: `${name}/${reducerKey}`, payload };
      };
    });
  
    function reducer(state = initialState, action) {
      return produce(state, () => {
        const caseReducer = reducers[action.type.splice("/")[1]];
  
        if (caseReducer) {
          caseReducer(state, action);
        }
        return state;
      });
    }
    return { name, actions, reducer };
  };
  
  