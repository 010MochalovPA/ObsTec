# ITAuditTech

Система учета вычислительной техники на express и angular с подключением MongoDB

# Models

```
USER	{           // Модель пользователя
  username	     // username
  password	     // пароль
  _id	            // id пользователя
}

PERSON	{         // Модель Сотрудника
  firstName	      // Имя
  secondName	    // Фамилия
  patronymic	    // Отчество
  unit	          // Управление
  group           // Отдел
  position	      // Должность
  adress	        // Рабочий адрес
  officeNumber	  // Номер кабинета
  phoneNumber	    // Номер телефона
  _id	             // id Сотрудника
}

DEVICETYPE	{     // Тип устройства
  name            // Наименование типа
  _id	            // id Типа
  description     // Описание
}

Device	{         // Устройство
  deviceTypeId    // Тип устройства
  deviceModel	    // Модель
  serialNumber	  // Cерийный номер
  ipAdress ? 	    // IP
  inventoryNumber	// Инвентарный номер
  PersonId        // id сотрудника
  _id	            // id устройства
}

Vendor {
  name:           //Название вендора
  deviceTypeId    //id Типа устройства
  _id:            //id Производителя
}

Model {
  name :        // Название модели
  VendorId :    //id производителя
  _id:          //id модели
}
```

# API's

```
AUTH	{                         // routes/auth
  /api/login (POST)	            // Запрос логина
  /api/register (POST)          // Запрос регистрации
  /api/reset (POST)             // Сброс пароля
}

PERSON	{                       // routes/person
  /api/person (GET)	            // Получение всех сотрудников
  /api/person (POST)	          // Добавление сотрудника
  /api/person/:id (GET)	        // Получение конкретного сотрудника
  /api/person/:id (DELETE)	    // Удаление сотрудника
  /api/person/:id (PATCH)	      // Изменение сотрудника
}

DEVICETYPE	{                   // routes/devicetype
  /api/devicetype (GET)	        // Получение всех типов устройств
  /api/devicetype/:id (GET)	    // Получение конкретного типа
  /api/devicetype/:id (DELETE)	// Удаление типа (проверить на пустоту)
  /api/devicetype (POST)	      // Создание типа
  /api/devicetype/:id (PATCH)	  // Изменение типа
}

Device	{                                         // routes/device
  /api/device (GET)	                              // Получение всех устройств
  /api/device/:id (GET)	                          // Получение конкретного девайса
  /api/device/devicetype/:deviceTypeId (GET)	    // Получение устройств по типу
  /api/device/:person (GET)	                      // Получение устройств по сотруднику
  /api/device (POST)	                            // Создание
  /api/device/:id (PATCH)	                        // Изменение
  /api/device/:id (DELETE)	                      // Удаление
}
```
