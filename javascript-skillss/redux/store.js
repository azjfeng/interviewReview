// import { reducer } from "./reducer"

const initialState = {
    count: 0
}
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'plus':
            return {
                ...state,
                count: state.count + 1
            }
        case 'subtract':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return initialState
    }
}

const createStore = (reducer) => {
    let currentState = {}
    let observers = []
    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        observers.forEach(fn => fn())
    }

    function subscribe(fn) {
        observers.push(fn)
    }
    dispatch({ type: '@@REDUX_INIT' })  //初始化store数据
    return { getState, dispatch, subscribe }
}

const store = createStore(reducer)       //创建store
store.subscribe(() => { console.log('组件1收到store的通知') })
store.subscribe(() => { console.log('组件2收到store的通知') })
store.dispatch({ type: 'plus' })         //执行dispatch，触发store的通知
console.log(store.getState())
