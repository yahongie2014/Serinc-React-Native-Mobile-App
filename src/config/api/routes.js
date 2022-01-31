const mainRoute = 'https://serinc.tech/api';

export default Routes = {
  RegisterUser: `${mainRoute}/createAuth`,
  Sliders: `${mainRoute}/Sliders`,
  Notification: `${mainRoute}/Notification`,
  Categories: `${mainRoute}/portfolio`,
  ServiceCategory: (id) => `${mainRoute}/singleCategory/${id}`,
  SingleProject: (id) => `${mainRoute}/singleProject/${id}`,
  NotificationSeen: `${mainRoute}/seen`,
  Blogs: `${mainRoute}/Blogs`,
  SingleBlog: (id) => `${mainRoute}/Blogs/${id}`,
  ContactStore: `${mainRoute}/Contact`,
  Search: (query) =>
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyCkDqBmtI_9m6Xqj0Q1rIr9gl3hAMR5BeY&cx=017576662512468239146:omuauf_lfve&q=${query}`,
};
