import { Button, ButtonProps, Tooltip } from 'antd';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

type CustomButtonProps = {
  title: string;
  buttonProps: ButtonProps,
  breakPoint?: boolean
};

const CustomButton = ({ title, buttonProps, breakPoint } : CustomButtonProps) => {
  const { isMobile } = useScreenBreakpoint();


  if(isMobile || breakPoint) {
    return (
      <Tooltip open={false}>
        <Button {...buttonProps}></Button>
      </Tooltip>
    );
  }
  return <Button {...buttonProps}>{title}</Button>;
};

export default CustomButton;