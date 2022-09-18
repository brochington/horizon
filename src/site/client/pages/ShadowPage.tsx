import React, { FC } from 'react';

type Props = {
  
};

const ShadowPage: FC<Props> = (props: Props) => {
  const {  } = props;

  return (
    <div>
      <div className="hrem-20 bgd-teal-10 flex-center gap3">
        <div className="wrem-10 hrem-10 shadow-1">
          <div className="h100 w100 bgd-teal-5 p3"></div>
        </div>
        <div className="wrem-10 hrem-10 shadow-2">
          <div className="h100 w100 bgd-teal-6"></div>
        </div>
        <div className="wrem-10 hrem-10 shadow-3">
          <div className="h100 w100 bgd-teal-7"></div>
        </div>
        <div className="wrem-10 hrem-10 shadow-4">
          <div className="h100 w100 bgd-teal-8"></div>
        </div>
        <div className="wrem-10 hrem-10 shadow-5">
          <div className="h100 w100 bgd-teal-9"></div>
        </div>
      </div>
    </div>
  );
};

export default ShadowPage;
