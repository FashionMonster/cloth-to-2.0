const makeDispUserName = (userName) => {
  if (userName.length > 4) {
    return userName.substr(0, 4) + '...';
  } else {
    return userName;
  }
};

export { makeDispUserName };
