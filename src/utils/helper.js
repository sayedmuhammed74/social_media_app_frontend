export const checkSender = (members, userId) => {
  if (members?.length > 0) {
    return members[0]._id === userId ? members[1] : members[0];
  }
};
