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
      {range(10).map(num => (
        <div key={num} className="flex-center">
          <div className={`bgd-${colorName}-${num} hrem-3 wrem-3 b-1`}></div>
        </div>
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
          gridTemplateColumns: 'repeat(11, 1fr)',
          gridTemplateRows: 'repeat(13, 4rem)',
          gridGap: '.25rem',
        }}
      >
        <div className="spacer" />
        {range(10).map(num => (
          <div key={num} className="flex-center">
            {num}
          </div>
        ))}
        <ColorRow colorName="gray" />
        <ColorRow colorName="blue" />
        <ColorRow colorName="indigo" />
        <ColorRow colorName="violet" />
        <ColorRow colorName="red" />
        <ColorRow colorName="orange" />
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
