const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalProfileDescription = editModal.querySelector(
  "#profile-description-input"
);

const newPostModal = document.querySelector("#new-post");
const newPostButton = document.querySelector(".profile__add-btn");
const newPostCloseButton = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");
/* -------------------------------------------------------------------------- */
/*                              Function Section                              */
/* -------------------------------------------------------------------------- */
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

function modalOverlayClose(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEscapeClose(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const activeModal = document.querySelector(".modal_is-opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("mousedown", modalOverlayClose);
  document.addEventListener("keydown", handleEscapeClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("mousedown", modalOverlayClose);
  document.removeEventListener("keydown", handleEscapeClose);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalProfileDescription.value;
  closeModal(editModal);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const link = newPostImageInput.value;
  const name = newPostCaptionInput.value;
  const cardElement = getCardElement({ name, link });
  cardsList.prepend(cardElement);
  newPostFormEl.reset();
  disableButton(newPostSubmitBtn);
  closeModal(newPostModal);
}

profileEditBtn.addEventListener("click", function () {
  editModalProfileDescription.value = profileDescription.textContent;
  editModalNameInput.value = profileNameEl.textContent;
  resetValidation(editFormElement, [
    editModalProfileDescription,
    editModalNameInput,
  ]);
  openModal(editModal);
});
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});
previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostFormEl.addEventListener("submit", handleNewPostSubmit);

newPostCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
