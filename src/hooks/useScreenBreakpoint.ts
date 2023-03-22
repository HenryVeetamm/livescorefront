import { Grid } from 'antd';

const useScreenBreakpoint = () => {
  const screens = Grid.useBreakpoint();
  const isMobile = screens['xs'];
  const isSmall = screens['sm'];
  const isMedium = screens['md'];
  const isBig = screens['xl'];

  return { isMobile, isSmall, isBig, isMedium };
};

export default useScreenBreakpoint;