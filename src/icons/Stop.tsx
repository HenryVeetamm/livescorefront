import Icon from '@ant-design/icons';

const Stop = () => {

  const IconSvg = () => (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1.15em"
      width="1.25em"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M8 13V5.5a1.5 1.5 0 013 0V12M11 5.5v-2a1.5 1.5 0 113 0V12M14 5.5a1.5 1.5 0 013 0V12" />
      <path d="M17 7.5a1.5 1.5 0 013 0V16a6 6 0 01-6 6h-2 .208a6 6 0 01-5.012-2.7A69.74 69.74 0 017 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 01.536-2.022 1.867 1.867 0 012.28.28L8 13" />
    </svg>
  );

  return <Icon component={IconSvg}/>;
};
export default Stop;