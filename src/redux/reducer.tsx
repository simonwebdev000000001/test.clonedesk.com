import { combineReducers } from 'redux';
import authReducer, { moduleName as authModule } from '../ducks/auth';
import homeReducer, { moduleName as homeModule } from '../ducks/home';


export default combineReducers({
  [authModule]: authReducer,
  [homeModule]: homeReducer,
});
