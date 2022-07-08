export const getRecipientEmail = (users: any, userLoggedIn: any) => {
  return users?.filter(
    (userToFilter: string) => userToFilter !== userLoggedIn?.email
  )[0];
};
