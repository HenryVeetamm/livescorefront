import { ReactNode, useEffect, useState } from 'react';
import './styles.less';


const Tracker = ({ content, children }: { content: any, children: ReactNode }) => {
//   const isInitialData = useRef(true);
  const [ original, setOriginal ] = useState(true);

  useEffect(() => {
    if (!content) return undefined;
    setOriginal(false);
    const handler = setTimeout(() => {
      setOriginal(true);
    }, 500);

    return () => clearTimeout(handler);
  }, [ content ]);

  // const getClassName = () => {
  //   if (TrackerStatus.Good === status) return '-positive';
  //   if (TrackerStatus.Neutral === status) return '-neutral';
  //   if (TrackerStatus.Bad === status) return '-negative';
  // };

  return <span className={`data${!original ? '-changed': ''}`}> {children}</span>;
};


export default Tracker;