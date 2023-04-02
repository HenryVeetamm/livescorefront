import { Tooltip } from 'antd';
import Button, { ButtonProps } from 'antd/es/button/button';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

export type TooltipButtonProps = {
  title: string,
  buttonProps: ButtonProps
}

const TooltipButton = ({ title, buttonProps }: TooltipButtonProps) => {
  const { isMobile } = useScreenBreakpoint();

  return isMobile ?
    <Tooltip title={title} open={false} >
      <Button {...buttonProps}></Button>
    </Tooltip> :<Tooltip title={title} >
      <Button {...buttonProps}></Button>
    </Tooltip>;
};

export { TooltipButton };