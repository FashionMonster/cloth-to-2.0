import { useEffect, useRef } from 'react';

//レンダリング後、レンダリング前の値をセットする
const usePreviousValue = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export { usePreviousValue };
