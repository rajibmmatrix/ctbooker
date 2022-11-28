import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import RNRestart from 'react-native-restart';
import language from './lang.json';
import {storage} from '~utils';
import {ITranslation} from 'types';

interface Props {
  children: React.ReactNode;
}

export enum LType {
  'en',
  'fn',
}

export interface IContext extends ITranslation {
  isLangSet?: boolean;
  changeLanguage?: (params: LType) => void;
}

export const Translation = createContext<IContext>(language.fn);

export default function TranslationProvider(props: Props) {
  const [lang, setLang] = useState<ITranslation | null>(null);
  const [isLangSet, setIsLangSet] = useState(false);

  const changeLanguage = useCallback(async (value: LType) => {
    if (value === LType.en) {
      setLang(language.en);
    } else if (value === LType.fn) {
      setLang(language.fn);
    }
    setIsLangSet(true);
    await storage.setLang(value);
    RNRestart.Restart();
  }, []);

  const updateLanguage = async (params: LType | null) => {
    console.log(params);
    //setLang(language.fn); // update language value from server
  };

  useEffect(() => {
    (async () => {
      const isLang = await storage.getLang();
      if (isLang === LType.en) {
        setLang(language.en);
        setIsLangSet(true);
      } else if (isLang === LType.fn) {
        setLang(language.fn);
        setIsLangSet(true);
      }
      updateLanguage(isLang);
    })();
  }, []);

  const value = {
    ...lang!,
    isLangSet,
    changeLanguage: changeLanguage,
  };

  return (
    <Translation.Provider value={value}>{props.children}</Translation.Provider>
  );
}

export function useTranslations() {
  return useContext(Translation);
}
