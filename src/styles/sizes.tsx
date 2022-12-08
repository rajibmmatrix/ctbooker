import {Dimensions, PixelRatio, Platform} from 'react-native';

export const screenWidth = Dimensions.get('window').width;

export const screenHeight = Dimensions.get('window').height;

export const widthDP = (widthPercent: any) => {
  const elemWidth = parseFloat(widthPercent); // Convert string input to decimal number
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightDP = (heightPercent: any) => {
  const elemHeight = parseFloat(heightPercent); // Convert string input to decimal number
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const fontSize = (size: number) => {
  const newSize = size * (screenWidth / 375);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const SIZES = {
  //For Vertical
  V2: heightDP(0.2),
  V3: heightDP(0.4),
  V5: heightDP(0.6),
  V7: heightDP(0.8), //7
  V8: heightDP(0.9),
  V10: heightDP(1.1),
  V12: heightDP(1.4), //12
  V15: heightDP(1.7),
  V18: heightDP(2.1),
  V22: heightDP(2.5), //22
  V25: heightDP(1.0),
  V28: heightDP(1.0), //28
  V35: heightDP(1.0), //35
  V38: heightDP(4.3), //38
  V40: heightDP(1.0),
  V45: heightDP(5.0), //45
  V55: heightDP(1.0),
  V65: heightDP(1.0),
  V110: heightDP(14.6), //110
  V195: heightDP(25.9), //195

  //For Horizontal
  H2: widthDP(0.4),
  H3: widthDP(0.7),
  H5: widthDP(1.2), //5
  H7: widthDP(1.6),
  H8: widthDP(1.9),
  H10: widthDP(2.4), //10
  H12: widthDP(1.0),
  H13: widthDP(1.0), //13
  H15: widthDP(3.5), //15
  H18: widthDP(1.0),
  H22: widthDP(4.4),
  H25: widthDP(1.0), //25
  H28: widthDP(6.7), //28
  H38: widthDP(7.4),
  H40: widthDP(1.0),
  H45: widthDP(1.0),
  H55: widthDP(1.0),
  H65: widthDP(1.0),
  H110: widthDP(1.0),
};
