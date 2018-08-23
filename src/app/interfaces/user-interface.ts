export interface User {
  userName: String;
  email: String;
  avatar: String;
  bookmarks: Array<Bookmarks>;
  key?: String;
  userOptions: {
    theme: String,
    fontSize: String,
    pageSize: Number,
    showBookmarks: boolean
  };
}

export interface Bookmarks {
  title: String;
  url: String;
}
