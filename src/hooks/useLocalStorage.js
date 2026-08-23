import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {

  const [value, setValue] = useState(() => {

    try {

      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }

      return initialValue;

    } catch (error) {

      console.log(
        'Error reading local storage:',
        error
      );

      return initialValue;
    }

  });


  useEffect(() => {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

    } catch (error) {

      console.log(
        'Error saving to local storage:',
        error
      );

    }

  }, [key, value]);


  return [value, setValue];

}

export default useLocalStorage;