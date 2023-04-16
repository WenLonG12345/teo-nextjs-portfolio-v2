import React from 'react';

interface IOverTitle {
  title: string;
}

const OverTitle: React.FC<IOverTitle> = ({title}) => {
  return (
    <div className='flex items-center gap-2 mb-3'>
      <div className='w-[10px] h-[10px] bg-primary'/>
      <span className='font-semibold uppercase'>{title}</span>
    </div>
  )
}

export default OverTitle
