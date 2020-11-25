const initPage = () => {
  //повесить слушателя на бургер
  buttonBurger.addEventListener('click',openMenuMobile);
  authButton.addEventListener('click',openPopupSignup);
  popupButtonClose.addEventListener('click', closePopupSignup);
  //отрисовать хедер


}

const openMenuMobile = () => {
  buttonBurger.removeEventListener('click',openMenuMobile);


  buttonBurger.classList.add('button-burger_is-invisible');
   alert("Вы нажали на кнопку");
   overlay.classList.remove('popup_is-invisible');
   page.classList.add('page_no-scroll');
   nav.classList.add('nav_is-visible');
   buttonCloseMenu.classList.add('button-close_is-visible');
   buttonCloseMenu.addEventListener('click',closeMenuMobile);
   overlay.addEventListener('click', handleClickOverlay);
   document.addEventListener('keydown', handleKeydown);

  //+открывается оверлай
  //+no scroll
  //+прячется бургер
  // +появляется меню
  // +появляется крестик
  // на крестик вешается слушатель
  // повесить слушателя на оверлей
  // повесить слушателя на документ(esc)

  //с бургера снимается
}







const closeMenuMobile = () => {
  overlay.classList.add('popup_is-invisible');
  page.classList.remove('page_no-scroll');
  nav.classList.remove('nav_is-visible');
  buttonCloseMenu.classList.remove('button-close_is-visible');
  buttonCloseMenu.removeEventListener('click',closeMenuMobile);
  buttonBurger.classList.remove('button-burger_is-invisible');
  buttonBurger.addEventListener('click',openMenuMobile);
  overlay.removeEventListener('click', handleClickOverlay);
  document.removeEventListener('keydown', handleKeydown);
  //+открывается оверлай
  //+no scroll
  //прячется бургер
  // появляется меню
  // появляется крестик
  // на крестик вешается слушатель

  //с бургера снимается
}

const handleClickOverlay = (event) => {
  console.log(event.target);
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {

  }

}


const openPopupSignup = () => {

 authButton.removeEventListener('click',openPopupSignup);

  popupSignupDE.classList.remove('popup_is-invisible');
  page.classList.add('page_no-scroll');
  document.addEventListener('keydown', handleKeydown);
  popupSignupDE.addEventListener('click',handleKeydown);
  const popupButtonClose = popupSignupDE.querySelector('.popup__button-close');
  buttonBurger.classList.add('button-burger_is-invisible');
 buttonCloseMenu.classList.remove('button-close_is-visible');
  popupButtonClose.classList.add('button-close_is-visible');
 popupButtonClose.addEventListener('click', closePopupSignup);


   //+открывается папап сигнап
  //слушатель на попап
  //слушатель на документ
  //слушатель на крестик

}


const closePopupSignup = () => {
  popupSignupDE.classList.add('popup_is-invisible');
  page.classList.remove('page_no-scroll');
  popupSignupDE.removeEventListener('click',handleKeydown);
  document.removeEventListener('keydown', handleKeydown);
  popupButtonClose.classList.remove('button-close_is-visible');



  //закрывается папап сигнап
 //снимается слушатель с попапа
 //снимается слушатель с документа
 //снимается слушатель с крестика
 // всё наоборот

}

initPage();