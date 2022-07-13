export interface IChat {
  id: string;
  users: string;
}

export interface IChatScreen {
  chat: any;
  messages: any;
  setHideSidebar: any;
  hideSidebar: boolean;
}
