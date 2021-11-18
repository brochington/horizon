import React, { FC } from 'react';
import range from 'lodash/range';

type ColorRowProps = {
  colorName: string;
};

const ColorRow: FC<ColorRowProps> = (props: ColorRowProps) => {
  const { colorName } = props;

  return (
    <>
      <div>{colorName}</div>
      {range(12).map(num => (
        <div key={num} className={`bgd-${colorName}-${num}`} />
      ))}
    </>
  );
};

const ColorPage: FC = () => {
  return (
    <>
      <h2 className="header-2">Colors</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '12rem repeat(12, 1fr)',
          gridTemplateRows: 'repeat(25, 2rem)',
          gridGap: '.25rem',
        }}
      >
        <div className="spacer" />
        {range(12).map(num => (
          <div key={num} className="flex-center">
            {num}
          </div>
        ))}
        <ColorRow colorName="gray" />
        <ColorRow colorName="blue-gray" />
        <ColorRow colorName="blue" />
        <ColorRow colorName="indigo" />
        <ColorRow colorName="violet" />
        <ColorRow colorName="magenta" />
        <ColorRow colorName="red" />
        <ColorRow colorName="orange" />
        <ColorRow colorName="gold" />
        <ColorRow colorName="yellow" />
        <ColorRow colorName="lime" />
        <ColorRow colorName="green" />
        <ColorRow colorName="teal" />
        <ColorRow colorName="cyan" />
      </div>
    </>
  );
};

export default ColorPage;
