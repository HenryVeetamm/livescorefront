import Icon from '@ant-design/icons';

const SmileNeutralIcon = () => {

  const IconSvg = () => (
    <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
      <path
        fill="currentColor"
        d="M9 11a1 1 0 100-2 1 1 0 000 2zM9 15a1 1 0 100 2h6a1 1 0 100-2H9zM16 10a1 1 0 11-2 0 1 1 0 012 0z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return <Icon component={IconSvg}/>;
};
export default SmileNeutralIcon;