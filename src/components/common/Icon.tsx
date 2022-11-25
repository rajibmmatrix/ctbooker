import React, {FC, memo} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

export enum icons {
  'ant',
  'evil',
  'entypo',
  'fa',
  'fa5',
  'feather',
  'fontisto',
  'foundation',
  'ionicon',
  'materialCommunity',
  'material',
  'octicon',
  'simpleLine',
  'zocial',
}

const getIconName = (type: icons) => {
  switch (type) {
    case icons.ant:
      return AntDesign;
    case icons.evil:
      return EvilIcon;
    case icons.entypo:
      return EntypoIcon;
    case icons.fa:
      return FAIcon;
    case icons.fa5:
      return FAIcon5;
    case icons.feather:
      return Feather;
    case icons.fontisto:
      return Fontisto;
    case icons.foundation:
      return FoundationIcon;
    case icons.ionicon:
      return Ionicon;
    case icons.materialCommunity:
      return MaterialCommunityIcon;
    case icons.material:
      return MaterialIcon;
    case icons.octicon:
      return OcticonIcon;
    case icons.simpleLine:
      return SimpleLineIcon;
    case icons.zocial:
      return ZocialIcon;
    default:
      return FAIcon;
  }
};

const Icon: FC<any> = ({type, ...props}) => {
  const Icons = getIconName(type);

  return <Icons {...props} />;
};

export default memo(Icon);
