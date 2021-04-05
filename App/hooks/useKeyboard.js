import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = () => {
    setIsKeyboardVisible(false);
  };

  const keyboardDidHide = () => {
    setIsKeyboardVisible(true);
  };

  return isKeyboardVisible;
};

export default useKeyboard;
