import { citations, locale } from './citations';

const isInList = (list, uid) => {
  return list?.some((item) => {
    return item.uid === uid;
  });
};

export {
  citations,
  isInList,
  locale
};
