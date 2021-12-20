// REF: https://reactnative.dev/docs/usewindowdimensions
import {Dimensions} from 'react-native';

const Window = {
  WINDOW_WIDTH: Dimensions.get('window').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,
  FONT_SCALE: Dimensions.get('window').fontScale,
  SCALE: Dimensions.get('window').scale,
};

export default Window;

export const deviceWidth = Math.round(Dimensions.get('window').width);
export const deviceHeight = Math.round(Dimensions.get('window').height);
