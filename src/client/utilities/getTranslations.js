const currentLanguage = 'russian';

const translations = {
    'sign in': {
        'english': 'sign in',
        'russian': 'вход'
    },
    'sign up': {
        'english': 'sign up',
        'russian': 'регистрация'
    },
    'sign out': {
        'english': 'sign out',
        'russian': 'выход'
    },
    'password': {
        'english': 'password',
        'russian': 'пароль'
    },
    'repeat password': {
        'english': 'repeat password',
        'russian': 'повторите пароль'
    },
    'save': {
        'english': 'save',
        'russian': 'сохранить'
    },
    'cancel': {
        'english': 'cancel',
        'russian': 'отмена'
    },
    'name': {
        'english': 'name',
        'russian': 'имя'
    },
    'last name': {
        'english': 'last name',
        'russian': 'фамилия'
    },
    'it is not valid': {
        'english': 'it is not valid',
        'russian': 'неверное значение'
    },
    'it is not equal to the requirements': {
        'english': 'it is not equal to the requirements',
        'russian': 'пароль не соответствует требованиям'
    },
    'it does not match': {
        'english': 'it does not match',
        'russian': 'пароли не совпадают'
    },
    'it is required': {
        'english': 'it is required',
        'russian': 'обязательное поле'
    },
    'no elements here yet': {
        'english': 'no elements here yet',
        'russian': 'здесь пока нет элементов'
    },
    'delete': {
        'english': 'delete',
        'russian': 'удалить'
    },
    'file': {
        'english': 'file',
        'russian': 'файл'
    },
    'add': {
        'english': 'add',
        'russian': 'добавить'
    },
    'edit': {
        'english': 'edit',
        'russian': 'изменить'
    },
    'share': {
        'english': 'share',
        'russian': 'поделиться'
    },
    'participants': {
        'english': 'participants',
        'russian': 'участники'
    },
    'problems': {
        'english': 'problems',
        'russian': 'задачи'
    },
    'sets': {
        'english': 'sets',
        'russian': 'наборы задач'
    },
    'groups': {
        'english': 'groups',
        'russian': 'группы'
    },
    'contests': {
        'english': 'contests',
        'russian': 'соревнования'
    },
    'users': {
        'english': 'users',
        'russian': 'пользователи'
    },
    'number of participants': {
        'english': 'number of participants',
        'russian': 'количество участников'
    },
    'list of participants': {
        'english': 'list of participants',
        'russian': 'список участников'
    },
    'limitations': {
        'english': 'limitations',
        'russian': 'ограничения'
    },
    'languages': {
        'english': 'languages',
        'russian': 'языки'
    },
    'number': {
        'english': 'number',
        'russian': 'номер'
    },
    'upload': {
        'english': 'upload',
        'russian': 'загрузить'
    },
    'send': {
        'english': 'send',
        'russian': 'отправить'
    },
    'time': {
        'english': 'time',
        'russian': 'время'
    },
    'memory': {
        'english': 'memory',
        'russian': 'память'
    },
    'text': {
        'english': 'text',
        'russian': 'текст'
    },
    'checker': {
        'english': 'checker',
        'russian': 'чекер'
    },
    'tests': {
        'english': 'tests',
        'russian': 'тесты'
    },
    'input': {
        'english': 'input',
        'russian': 'входные данные'
    },
    'output': {
        'english': 'output',
        'russian': 'выходные данные'
    },
    'test description': {
        'english': 'test description',
        'russian': 'описание теста'
    },
    'number of problems': {
        'english': 'number of problems',
        'russian': 'количество задач'
    },
    'list of problems': {
        'english': 'list of problems',
        'russian': 'список задач'
    },
    'role': {
        'english': 'role',
        'russian': 'роль'
    },
    'participant': {
        'english': 'participant',
        'russian': 'участник'
    },
    'coordinator': {
        'english': 'coordinator',
        'russian': 'координатор'
    },
    'read': {
        'english': 'read',
        'russian': 'чтение'
    },
    'write': {
        'english': 'write',
        'russian': 'запись'
    },
    'is not started': {
        'english': 'is not started',
        'russian': 'не запущен'
    },
    'is active': {
        'english': 'is active',
        'russian': 'открыт'
    },
    'is finished': {
        'english': 'is finished',
        'russian': 'закрыт'
    }
};

const transformText = ({text, format = 'capitalize'}) => {
    switch (format) {
        case 'uppercase':
            return text.toUpperCase();
        case 'lowercase':
            return text;
        default:
            return text[0].toUpperCase() + text.slice(1);
    }
};

export default ({text, format = 'capitalize'}) => {
    return text ? transformText({text: translations[text.toLowerCase()][currentLanguage], format}) : '';
};