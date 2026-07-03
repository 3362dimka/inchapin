export const UI = {
  menu: {
    title: "Меню",
    burgerLabel: "Меню",
    nav: [
      { label: "Главная", href: "/" },
      { label: "О нас", href: "/about" },
      { label: "Квартиры", href: "/apartments" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
  header: {
    selectPlaceholder: "Выбрать квартиру",
    selectAriaLabel: "Выбрать квартиру",
    apartments: [
      { value: "first", label: "Квартира 1", href: "/apartments/first" },
      { value: "second", label: "Квартира 2", href: "/apartments/second" },
    ],
    ctaButton: "Заказать звонок",
  },
  form: {
    modalTitle: "ЗАКАЗАТЬ ЗВОНОК",
    fields: {
      name: { label: "Ваше имя", placeholder: "Введите ваше имя" },
      phone: { label: "Телефон", placeholder: "+7 (___) ___-__-__" },
      email: { label: "E-mail", placeholder: "example@mail.com" },
    },
    submit: "Отправить",
    submitting: "Отправка...",
    acceptance:
      "Нажимая на кнопку «Отправить», вы ознакомлены и подтверждаете согласие с <a href='#'>политикой обработки персональных данных</a>",
  },
  notFound: {
    code: "404",
    title: "Страница не найдена",
    description:
      "Похоже, такой страницы не существует или она была перемещена.",
    button: "На главную",
  },
};
