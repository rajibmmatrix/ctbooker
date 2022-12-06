import {IState} from './translation';

export const Actions = {
  Change_Language: 'CHANGE_LANGUAGE',
  Set_Language: 'CHANGE_LANGUAGE',
  Update_Language: 'UPDATE_LANGUAGE',
  Completed: 'COMPLETED',
};

const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case Actions.Change_Language:
      return {...state, type: action.payload};
    case Actions.Update_Language:
      return {...state, lang: action.payload};
    case Actions.Completed:
      return {...state, complete: true};
    default:
      return state;
  }
};

export default reducer;
