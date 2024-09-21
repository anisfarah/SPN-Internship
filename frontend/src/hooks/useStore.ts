'use client';

import { useState, useEffect } from 'react';

/**
 * This hook takes a state store and a callback function to read the store's state, and returns the result of the callback function.
 * The hook is designed to be strongly typed, with the types of the state store and callback function being specified as function arguments.
 * The return type of the hook is also specified as a generic type.
 * @template T The type of the state stored in the state store.
 * @template F The return type of the callback function.
 * @param {(callback: (state: T) => unknown) => unknown} store A function that takes a callback function as an argument and returns the result of calling that function on the state store.
 * @param {(state: T) => F} callback A function that takes the current state of the state store as an argument and returns something of type F.
 * @returns {F} The result of calling the callback function on the state store.
 */
const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
): F => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data as F;
};

export default useStore;
