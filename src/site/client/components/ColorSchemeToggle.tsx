import React, { FC, useState, useEffect } from 'react';
import { useColorScheme } from '@mantine/hooks';
import { Switch } from '@mantine/core';

const ColorSchemeToggle: FC = (props) => {
  const colorScheme = useColorScheme();
  const [cs, setCS] = useState(colorScheme);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('color-scheme', cs);
  }, [cs]);

  function toggleColorScheme() {
    const nextCS = cs === 'light' ? 'dark' : 'light';
    setCS(nextCS);
  }

  return (
    <div>
      <Switch label="Color Scheme" onChange={toggleColorScheme}/>
    </div>
  );
};

export default ColorSchemeToggle;
