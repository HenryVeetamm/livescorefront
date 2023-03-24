import { ReactNode, useEffect, useState } from 'react';
import './styles.less';


const Tracker = ({ content, children }: { content: any, children: ReactNode }) => {

  const [ original, setOriginal ] = useState(true);
  useEffect(() => {

    setOriginal(false);
    const handler = setTimeout(() => {
      setOriginal(true);
    }, 500);

    return () => clearTimeout(handler);
  }, [ content ]);

  return <span className={`data${!original ? '-changed': ''}`}> {children}</span>;
};


export default Tracker;