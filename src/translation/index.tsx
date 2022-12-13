import React, {
  createContext,
  useReducer,
  useMemo,
  useEffect,
  useContext,
  useState,
} from 'react';
import {ActivityIndicator} from 'react-native';
import RNRestart from 'react-native-restart';
import reducer, {Actions} from './reducer';
import language from './lang.json';
import config from '~config';
import {api, log, storage} from '~utils';
import {ITranslation} from 'types';

interface Props {
  children: React.ReactNode;
}

export type IType = 'fr' | 'en';

interface IContext {
  translation: ITranslation;
  type: IType;
  version: string;
  changeLanguage: (data: IType) => void;
  updateLanguage: (v: string, callback?: () => void) => void;
}

export interface ILANG {
  en: ITranslation;
  fr: ITranslation;
}

export interface IState {
  lang: ILANG;
  type: IType;
  complete: boolean;
  version: string;
}

const Translation = createContext<IContext>(null as any);

const initialState: IState = {
  lang: language,
  type: 'fr',
  complete: false,
  version: config.lang_version,
};

export default function Translations({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const {lang, type, version} = state;

  useEffect(() => {
    (async () => {
      const lang_ver = await storage.getLanguage();
      if (lang_ver !== null) {
        dispatch({type: Actions.Update_Language, payload: lang_ver});
      }
      setLoading(false);
      const data = await storage.getLanguageType();
      dispatch({type: Actions.Set_Language, payload: data});
    })();
  }, []);

  const actions = useMemo(
    () => ({
      setLanguage: async (data: IType) => {
        await storage.setLanguageType(data);
        dispatch({type: Actions.Change_Language, payload: data});
      },
      changeLanguage: async (data: IType) => {
        if (data === type) {
          return;
        }
        await storage.setLanguageType(data);
        dispatch({type: Actions.Change_Language, payload: data});
        RNRestart.Restart();
      },
      updateLanguage: async (v: string, callback?: any) => {
        const data = await api.getLanguage().catch(err => log(err));
        if (data?.data) {
          const lang_data = {lang: data.data, version: v};
          await storage.setLanguage(lang_data);
          dispatch({type: Actions.Update_Language, payload: lang_data});
        }
        callback();
      },
      completed: () => dispatch({type: Actions.Completed}),
    }),
    [type],
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <Translation.Provider
      value={{translation: lang[type], version, type, ...actions}}>
      {children}
    </Translation.Provider>
  );
}

export function useTranslations() {
  return useContext(Translation);
}
