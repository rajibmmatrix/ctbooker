import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_LOCATION = '@token';
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

type IType = 'fr' | 'en';

//For handel language state
export const setLanguage = async (value: IType): Promise<boolean> => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(LANGUAGE, data);
    return true;
  } catch (e) {
    return false;
  }
};

export const getLanguage = async (): Promise<IType> => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE);
    return lang != null ? JSON.parse(lang) : 'fr';
  } catch (e) {
    return 'fr';
  }
};
