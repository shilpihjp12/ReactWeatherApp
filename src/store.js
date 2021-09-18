import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import temperaturesReducer from './Reducer/reducer'

const reducer = combineReducers({
  temperatures: temperaturesReducer
})
const initialState = {};
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;