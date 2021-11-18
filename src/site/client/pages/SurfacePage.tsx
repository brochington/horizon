import React, { FC } from 'react';

type SurfaceTileProps = {
  num: number;
};

const SurfaceTile: FC<SurfaceTileProps> = (props: SurfaceTileProps) => {
  const { num } = props;

  return (
    <div className={`surface-${num} shadow-3`}>SurfaceTile</div>
  );
};


type Props = {
  
};

const SurfacePage: FC<Props> = (props: Props) => {
  const {  } = props;

  return (
    <div 
      className="m3"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 8rem)',
      gridAutoRows: '8rem',
      gap: '1rem',
    }}>
      <SurfaceTile num={1} />
      <SurfaceTile num={2} />
      <SurfaceTile num={3} />
      <SurfaceTile num={4} />
      <SurfaceTile num={5} />
      {/* <SurfaceTile />
      <SurfaceTile />
      <SurfaceTile />
      <SurfaceTile /> */}
    </div>
  );
};

export default SurfacePage;
