import moment, { isMoment } from 'moment';

export const formats = {
  DD_MM_YYYY: 'DD.MM.YYYY',
  DD_MM_YYYY_HH_MM: 'DD.MM.YYYY HH:mm',
};

export const getDate = (date : Date) => {
  return moment(date).format(formats.DD_MM_YYYY);
};

export const calculateAge = (date : Date) => {
  return moment().diff(date, 'years');
};

export const getDateTime = (date: Date) => {
  return moment(date).format(formats.DD_MM_YYYY_HH_MM);
};

export const getDateByFormat = (date: Date, format: string) => {
  return moment(date).format(format);
};

export const isDate = (date : any) => {
  return date instanceof Date || isMoment(date);
};

