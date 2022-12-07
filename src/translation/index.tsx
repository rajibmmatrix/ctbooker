import React, {
  createContext,
  useReducer,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import reducer, {Actions} from './reducer';
import language from './lang.json';
import {baseURL, URL} from '~constants';
import {storage} from '~utils';
import {ITranslation} from 'types';

interface Props {
  children: React.ReactNode;
}

export type IType = 'fr' | 'en';

interface IContext {
  translation: ITranslation;
  type: IType;
  changeLanguage: (data: IType) => void;
  updateLanguage: () => void;
}

export interface IState {
  lang: {
    en: ITranslation;
    fr: ITranslation;
  };
  type: IType;
  complete: boolean;
}

const Translation = createContext<IContext>(null as any);

const initialState: IState = {
  lang: language,
  type: 'fr',
  complete: false,
};

export default function Translations({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {lang, type} = state;

  useEffect(() => {
    (async () => {
      const data = await storage.getLanguage();
      dispatch({type: Actions.Set_Language, payload: data});
    })();
  }, []);

  const actions = useMemo(
    () => ({
      setLanguage: async (data: IType) => {
        await storage.setLanguage(data);
        dispatch({type: Actions.Change_Language, payload: data});
      },
      changeLanguage: async (data: IType) => {
        if (data === type) return;
        await storage.setLanguage(data);
        dispatch({type: Actions.Change_Language, payload: data});
        RNRestart.Restart();
      },
      updateLanguage: () => {
        axios
          .get(baseURL + URL.lang, {headers: {type: 'client'}})
          .then(({data}: {data: ITranslation}) => {
            dispatch({type: Actions.Update_Language, payload: data});
          })
          .catch(err => console.log(err));
      },
      completed: () => dispatch({type: Actions.Completed}),
    }),
    [type],
  );

  return (
    <Translation.Provider value={{translation: lang[type], type, ...actions}}>
      {children}
    </Translation.Provider>
  );
}

export function useTranslations() {
  return useContext(Translation);
}
