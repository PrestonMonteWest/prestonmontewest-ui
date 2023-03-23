const createPostScope = 'create:post';

export const environment = {
  production: true,
  title: 'Preston Monte West',
  auth0: {
    domain: 'prestonmontewest-blog.us.auth0.com',
    clientId: 'iPHYkgnZ2ZPcUJCKRsxmILh7S8eDJ1rV',
    audience: 'https://prestonmontewest.com/api',
    createPostScope,
    scope: `openid profile email ${createPostScope}`,
  },
  disqus: {
    shortname: 'prestonmontewest-blog',
  },
};
