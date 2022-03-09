export const loginValidation = {
  required: "Oбязательно для заполнения",
  validate: (value: string) => {
    if (value.length < 2) {
      return "Имя/Фамилия не может содержать меньше 2ух букв!";
    }
    if (/[0-9]/.test(value)) {
      return "Имя/Фамилия не может содержать цифры!";
    }

    return true;
  },
};
export const emailValidation = {
  required: "Oбязательно для заполнения",
  validate: (value: string) => {
    const regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
    if (!regex.test(value)) {
      return "Некоректный email!";
    }

    return true;
  },
};
export const dateValidation = {
  required: "Oбязательно для заполнения",
  validate: (value: any) => {
    if (value == "Invalid Date") {
      return "Некоректно введена дата!";
    }
    return true;
  },
};
