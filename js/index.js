const url = "http://localhost:3000/";

const getBooks = () => {
  fetch(url + "books", {
    method: "GET",

    headers: {
      "Content-type": "application/json",

      Accept: "application/json",
    },

    body: JSON.stringify(),
  })
    .then((resp) => resp.json())
    .then((json) => {
      json.forEach((Book) => {
        viewBook(Book);
      });
    });
};

viewBook = (book) => {
  const ul = document.getElementById("list");

  const title = document.createElement("li");

  title.addEventListener("click", (e) => {
    e.preventDefault();

    clearBook();

    viewDescription(book);
  });

  title.innerHTML = book.title;

  ul.appendChild(title);
};

viewDescription = (book) => {
  const cardLoc = document.getElementById("show-panel");
  const card = document.createElement("div");
  const img = document.createElement("img");
  const desc = document.createElement("p");
  const likesList = document.createElement("ul");

  likesList.id = "likes-list";

  likesList.innerHTML = "Liked by: ";

  for (const user of book.users) {
    const likesElement = document.createElement("li");

    likesElement.innerHTML = user.username;

    likesList.append(likesElement);
  }

  const likeBtn = document.createElement("button");

  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    clearBook();

    let newLikedUsers = [{}];

    if (book.users.some((user) => user["id"] === 1)) {
      delLoop(book.users);

      newLikedUsers = [...book.users];

      delLoop(newLikedUsers);
    } else {
      newLikedUsers = [...book.users, { id: 1, username: "pouros" }];
    }

    likePatch(book, newLikedUsers);
  });

  img.src = book.img_url;
  desc.innerHTML = "Description: " + book.description;
  likeBtn.innerHTML = "Like";

  card.appendChild(img);
  card.appendChild(desc);
  card.appendChild(likesList);
  card.appendChild(likeBtn);
  cardLoc.appendChild(card);
};

likePatch = (book, users) => {
  fetch(url + "books/" + book.id, {
    method: "PATCH",

    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      users: users,
    }),
  })
    .then((resp) => resp.json())
    .then((json) => viewDescription(json));
};

delLoop = (users) => {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === 1) {
      users.splice(i, 1);
    }
  }
};

clearBook = () => {
  const container = document.getElementById("show-panel");
  let child = container.lastElementChild;

  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  getBooks();
});
