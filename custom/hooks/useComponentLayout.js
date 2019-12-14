import {useState, useCallback} from 'react';

const useComponentLayout = () => {
  const [layout, setLayout] = useState(null);

  const onLayout = useCallback(
    event => {
      const {x, y, width, height} = event.nativeEvent.layout;
      setLayout({x, y, width, height});
    },
    [layout],
  );

  return [layout, onLayout];
};
export default useComponentLayout;
