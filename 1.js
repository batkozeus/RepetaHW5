// Task 1

function SocialBook(users = [], posts = {}) {
  this.users = users;
  this.posts = posts;

  this.getUserById = (userId) => this.users.find(user => user.id === userId);

  this.getAllUsers = () => {
    return this.users.map(user => user);
  };

  this.getUserByLogin = login => {
    const userByLogin = this.users.find(user => user.login === login);
    return userByLogin === undefined ? 'There is no such a user' : userByLogin;
  };

  this.getUserStatus = userId => {
    const userById = this.getUserById(userId);
    if (userById === undefined) {
      return 'There is no such a user';
    } else {
      return userById.isActive === true ? 'active' : 'inactive';
    }
  };

  this.addUser = user => {
    const newUser = this.users.some(oldUser => oldUser.login === user.login);
    if (newUser) {
      return 'Such a user already exists';
    } else {
      this.users.push(user);
      return this.users;
    }
  };

  this.removeUserById = userId => {
    const userById = this.getUserById(userId);
    if (userById === undefined) {
      return 'There is no such a user';
    } else {
      const indexOfUserById = this.users.indexOf(userById);
      this.users.splice(indexOfUserById, 1)
      return this.users;
    }
  };

  this.getUsersCount = () => {
    let userCount = 0;
    this.users.forEach((user) => userCount++);
    return userCount;
  };
  
  this.getUserPosts = userId => this.posts[userId];

  this.addPost = (userId, post) => {
    let getSinglePost = this.getUserPosts(userId);
    if (getSinglePost === undefined) {
      return 'There is no such a post';
    } else {
      getSinglePost.push(post);
      return getSinglePost;
    }
  };

  this.removePost = (userId, postId) => {
    let getSinglePost = this.getUserPosts(userId);
    if (getSinglePost === undefined) {
      return 'There is no such a post';
    } else {
      let getUserPost = getSinglePost.find(post => post.id === postId);
      if (getUserPost === undefined) {
        return 'There is no such a comment'
      }
      else {
        const indexOfUserPostById = getSinglePost.indexOf(getUserPost);
        getSinglePost.splice(indexOfUserPostById, 1);
        return getSinglePost;
      }    
    }
  };

  this.getAllLikes = userId => {
    let getSinglePost = this.getUserPosts(userId);
    return getSinglePost.reduce((acc, item) => acc + item.likes, 0);
  };

  this.addPostLike = (userId, postId) => {
    let getSinglePost = this.getUserPosts(userId);
    if (getSinglePost === undefined) {
      return 'There is no such a post';
    } else {
      let getUserPost = getSinglePost.find(post => post.id === postId);
      if (getUserPost === undefined) {
        return 'There is no such a comment'
      }
      else {
        getUserPost.likes++;
        return getSinglePost;
      }    
    }
  };

  this.getPostsCount = userId => {
    let getSinglePost = this.getUserPosts(userId);
    let postsCount = 0;
    getSinglePost.forEach(post => postsCount++);
    return postsCount;
  };
}

/*
  Используйте следующий массив пользователей при создании экземпляра SocialBook
*/
const initialUsers = [{
    id: "-s19a6hqce",
    login: "mangozedog@mail.com",
    password: "qwe123zv",
    isActive: true
  },
  {
    id: "-qkpzenjxe",
    login: "polysweet@skynet.ze",
    password: "123zxc78",
    isActive: true
  },
  {
    id: "-e51cpd4di",
    login: "ajax2k@change.ua",
    password: "ert234qw",
    isActive: false
  }
];

/*
  Используйте следующий объект постов пользователей при создании экземпляра SocialBook
*/
const initialPosts = {
  "-s19a6hqce": [{
      id: "-5sgljaskg",
      text: "post #1",
      likes: 3
    },
    {
      id: "-199hb6igr",
      text: "post #2",
      likes: 5
    },
    {
      id: "-hy0eyw5qo",
      text: "post #3",
      likes: 13
    }
  ],
  "-qkpzenjxe": [{
      id: "-5tu69g5rf",
      text: "post #1",
      likes: 8
    },
    {
      id: "-bje766393",
      text: "post #2",
      likes: 15
    }
  ],
  "-e51cpd4di": [{
      id: "-9y6nkmlj4",
      text: "post #1",
      likes: 18
    },
    {
      id: "-i03pbhy3s",
      text: "post #2",
      likes: 45
    }
  ],
};

/*
  Для создания уникального идентификатора для поля id, используйте 
  вспомогательную функцию getId(), возвращающую уникальную строку.
  
  К примеру: const user = { id: getId(), name: 'Mango' };
*/
const getId = () => "-" + Math.random().toString(36).substr(2, 9);

function User (name, password) {
  this.id = getId();
  this.name = name;
  this.password = password;
  this.isActive = true;
};

function Post (text, likes = 0) {
  this.id = getId();
  this.text = text;
  this.likes = likes;
};

// ----------------------------------------------------------------

const newSocialBook = new SocialBook(initialUsers, initialPosts);

console.log('Список всех пользователей', newSocialBook.getAllUsers());
console.log('Получит юзера по логину', newSocialBook.getUserByLogin("polysweet@skynet.ze"));
console.log('Узнать статус юзера', newSocialBook.getUserStatus("-e51cpd4di"));
const newUser = new User('Makson', 'Enot');
console.log("Добавить нового пользователя", newSocialBook.addUser(newUser));
console.log("Удалить нового пользователя",newSocialBook.removeUserById('-s19a6hqce'));
console.log("Общее количество пользователей", newSocialBook.getUsersCount());

console.log('Список всех постов', newSocialBook.getUserPosts('-s19a6hqce'));
const newPost = new User('CoolPost', 8);
console.log('Добавить пост юзера', newSocialBook.addPost('-s19a6hqce', newPost));
console.log('Удалить пост юзера', newSocialBook.removePost('-qkpzenjxe', '-5tu69g5rf'));
console.log('Сума лайков', newSocialBook.getAllLikes('-qkpzenjxe'));
console.log('Добавить лайк посту', newSocialBook.addPostLike('-qkpzenjxe', '-5tu69g5rf'));
console.log('Общее количество постов', newSocialBook.getPostsCount('-qkpzenjxe'));