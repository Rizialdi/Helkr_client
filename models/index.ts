import { createStore } from 'easy-peasy';
// import Offering from './Offering';
import Preferences from './Preferences';
import User from './User';

const store = createStore({ Preferences, User });

export default store;
