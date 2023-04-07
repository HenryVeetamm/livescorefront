
import { useMotionValue, Reorder } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  id: string;
  value: string;
  children: ReactNode | ReactNode[],
}

export const Item = ({ id, value, children }: Props) => {
  const y = useMotionValue(0);

  return (
    <Reorder.Item value={value} id={id} style={{ y }}>

      {children}
    </Reorder.Item>
  );
};
