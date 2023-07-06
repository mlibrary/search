import { Pride } from 'pride';

// Get This placing a hold
const placeHold = ({
  datastoreUid,
  recordId,
  item,
  location,
  date,
  callback
}) => {
  Pride.requestRecord(datastoreUid, recordId).placeHold(item, location, date, callback);
};

export {
  placeHold
};
