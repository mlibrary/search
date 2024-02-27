import { prideRequestRecord } from './utils';

// Get This placing a hold
const placeHold = ({
  datastoreUid,
  recordId,
  item,
  location,
  date,
  callback
}) => {
  prideRequestRecord(datastoreUid, recordId).placeHold(item, location, date, callback);
};

export {
  placeHold
};
