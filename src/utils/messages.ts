import { message } from 'antd';

export const showSuccess = (text: string) => {
  message.success({
    content: text,
    duration: 2.5,
    style: {
      marginTop: '4em',
    },
  });
};

export const showError = (text: string) => {
  message.error({
    content: text,
    duration: 2.5,
    style: {
      marginTop: '4em',
    },
  });
};