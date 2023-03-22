import Icon from '@ant-design/icons';

const SlashIcon = () => {

  const IconSvg = () => (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
    >
      <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
      <path d="M11.354 4.646a.5.5 0 00-.708 0l-6 6a.5.5 0 00.708.708l6-6a.5.5 0 000-.708z" />
    </svg>
  );

  return <Icon component={IconSvg}/>;
};
export default SlashIcon;