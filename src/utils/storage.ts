import AsyncStorage from '@react-native-async-storage/async-storage';
import {IType, ILANG} from '~translation';

const TOKEN_LOCATION = '@token';
const LANGUAGE_TYPE = '@language_type';
const LANGUAGE = '@language';

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_LOCATION);
    return token != null ? JSON.parse(token) : null;
  } catch (e) {
    return null;
  }
};

export const setToken = async (value: string): Promise<boolean> => {
  try {
    const token = JSON.stringify(value);
    await AsyncStorage.setItem(TOKEN_LOCATION, token);
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteToken = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(TOKEN_LOCATION);
    return true;
  } catch (e) {
    return false;
  }
};

//For handel language state
export const setLanguageType = async (value: IType): Promise<boolean> => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(LANGUAGE_TYPE, data);
    return true;
  } catch (e) {
    return false;
  }
};

export const getLanguageType = async (): Promise<IType> => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE_TYPE);
    return lang != null ? JSON.parse(lang) : 'fr';
  } catch (e) {
    return 'fr';
  }
};

interface ILANGNV {
  lang: ILANG;
  version: string;
}

//For set language file in local stroge
export const setLanguage = async (value: ILANGNV): Promise<boolean> => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(LANGUAGE, data);
    return true;
  } catch (e) {
    return false;
  }
};

export const getLanguage = async (): Promise<ILANGNV | null> => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE);
    return lang != null ? JSON.parse(lang) : null;
  } catch (e) {
    return null;
  }
};
