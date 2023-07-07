const isDatastoreBrowseable = (datastoreUid) => {
  // Long-term we'll probably want to be able
  // to ask the datastore whether it's browseable
  return (datastoreUid === 'databases' || datastoreUid === 'onlinejournals');
};

export {
  isDatastoreBrowseable
};
