import { useEffect } from 'react';
import { useKeyboardContext } from '@store/keyboard/context';
import { ALT_KEY } from '@constants/AppConstants';

function isOptionKey(e) {
  return e.key === ALT_KEY;
}

function KeyboardHandler({ children }) {
  const { setIsOptionKeyPressed } = useKeyboardContext();

  const handelOptionKeyDown = (e) => {
    if (isOptionKey(e)) {
      setIsOptionKeyPressed(true);
    }
  };
  const handelOptionKeyUp = (e) => {
    if (isOptionKey(e)) {
      setIsOptionKeyPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handelOptionKeyDown);
    document.addEventListener('keyup', handelOptionKeyUp);

    return () => {
      document.removeEventListener('keydown', handelOptionKeyDown);
      document.removeEventListener('keyup', handelOptionKeyUp);
    };
  }, []);

  return children;
}

export default KeyboardHandler;
