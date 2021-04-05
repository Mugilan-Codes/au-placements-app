// TODO: responsive design
// ? https://reactnative.dev/docs/usewindowdimensions
import {Dimensions} from 'react-native';

const Window = {
  WINDOW_WIDTH: Dimensions.get('window').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,
  FONT_SCALE: Dimensions.get('window').fontScale,
  SCALE: Dimensions.get('window').scale,
};

export default Window;
