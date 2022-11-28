import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_LOCATION = '@token';
const SET_LANG = '@lang';

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_LOCATION);
    return token != null ? JSON.parse(token) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const setToken = async (value: string): Promise<boolean> => {
  try {
    const token = JSON.stringify(value);
    await AsyncStorage.setItem(TOKEN_LOCATION, token);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteToken = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(TOKEN_LOCATION);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export enum LType {
  'en',
  'fn',
}

//For handel language state
export const getLang = async (): Promise<LType | null> => {
  try {
    const lang = await AsyncStorage.getItem(SET_LANG);
    return lang != null ? JSON.parse(lang) : null;
  } catch (e) {
    return null;
  }
};

export const setLang = async (value: LType): Promise<boolean> => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(SET_LANG, data);
    return true;
  } catch (e) {
    return false;
  }
};
