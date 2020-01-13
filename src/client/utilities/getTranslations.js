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
    'not valid value message': {
        'english': 'it is not valid',
        'russian': 'неверное значение'
    },
    'password requirements error message': {
        'english': 'it is not equal to the requirements',
        'russian': 'пароль не соответствует требованиям'
    },
    'password match error message': {
        'english': 'it does not match',
        'russian': 'пароли не совпадают'
    },
    'require error message': {
        'english': 'it is required',
        'russian': 'обязательное поле'
    },
    'no elements message': {
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
    'move right': {
        'english': 'move right',
        'russian': 'переместить вправо'
    },
    'move left': {
        'english': 'move left',
        'russian': 'переместить влево'
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
        'english': 'time (in seconds)',
        'russian': 'время (в секундах)'
    },
    'memory': {
        'english': 'memory (in MBytes)',
        'russian': 'память (в МБайтах)'
    },
    'text': {
        'english': 'text',
        'russian': 'текст'
    },
    'checker': {
        'english': 'checker',
        'russian': 'чекер'
    },
    'generator': {
        'english': 'generator',
        'russian': 'генератор'
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
        'english': 'contest is not started',
        'russian': 'соревнование не запущено'
    },
    'is active': {
        'english': 'contest is active',
        'russian': 'соревнование открыто'
    },
    'is finished': {
        'english': 'contest is finished',
        'russian': 'соревнование закрыто'
    },
    'no options message': {
        'english': 'no options',
        'russian': 'нет опций'
    },
    'read right': {
        'english': 'read right',
        'russian': 'право на чтение'
    },
    'no rights': {
        'english': 'no rights',
        'russian': 'нет прав'
    },
    'write right': {
        'english': 'write right',
        'russian': 'право на запись'
    },
    'error': {
        'english': 'error',
        'russian': 'ошибка'
    },
    'success': {
        'english': 'success',
        'russian': 'успех'
    },
    'contest create message': {
        'english': 'contest has been created',
        'russian': 'соревнование создано'
    },
    'contest edit message': {
        'english': 'contest has been edited',
        'russian': 'соревнование изменено'
    },
    'contest delete message': {
        'english': 'contest has been deleted',
        'russian': 'соревнование удалено'
    },
    'group of users create message': {
        'english': 'group of users has been created',
        'russian': 'группа пользователей создана'
    },
    'group of users edit message': {
        'english': 'group of users has been edited',
        'russian': 'группа пользователей изменена'
    },
    'group of users delete message': {
        'english': 'group of users has been deleted',
        'russian': 'группа пользователей удалена'
    },
    'problem create message': {
        'english': 'problem has been created',
        'russian': 'задача создана'
    },
    'problem edit message': {
        'english': 'problem has been edited',
        'russian': 'задача изменена'
    },
    'problem delete message': {
        'english': 'problem has been deleted',
        'russian': 'задача удалена'
    },
    'set of problems create message': {
        'english': 'set of problems has been created',
        'russian': 'набор задач создан'
    },
    'set of problems edit message': {
        'english': 'set of problems has been edited',
        'russian': 'набор задач изменен'
    },
    'set of problems delete message': {
        'english': 'set of problems has been deleted',
        'russian': 'набор задач удален'
    },
    'user create message': {
        'english': 'user has been created',
        'russian': 'пользователь создан'
    },
    'user edit message': {
        'english': 'user has been edited',
        'russian': 'пользователь изменен'
    },
    'user delete message': {
        'english': 'user has been deleted',
        'russian': 'пользователь удален'
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