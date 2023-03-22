import _ from 'lodash';

export const getAllKeys = (items: any, list: string[] = []): string[] => {
  items.forEach((item: any) => {
    if (items.children) {
      getAllKeys(item.children, list);
    }else{
      list.push(item.key);
    }
  });
  return list;
};

export const findActiveKeys = (items: string[]) => {
  const found: string[] = [];
  _.forEach(items, (item: string) => {
    if (_.startsWith(location.pathname, item)) {
      found.push(item);
    }
  });
  return found;
};