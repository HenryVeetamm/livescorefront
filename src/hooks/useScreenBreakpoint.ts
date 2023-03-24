import { Grid } from 'antd';

const useScreenBreakpoint = () => {
  const screens = Grid.useBreakpoint();
  const isMobile = screens['xs'];
  const isSmall = screens['sm'];
  const isLarge = screens['lg'];
  const isMedium = screens['md'];
  const isBig = screens['xl'];

  return { isMobile, isSmall, isBig, isMedium, isLarge };
};

export default useScreenBreakpoint;