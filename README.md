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
  unit	          // Управление( Территориальный орган)
  position	      // Должность
  adress	        // Рабочий адрес
  officeNumber	  // Номер кабинета
  phoneNumber	    // Номер телефона
  deviceList[]    // Список утройств
  _id	             // id Сотрудника
}

DEVICETYPE	{     // Тип устройства
  name            // Наименование типа
  _id	            // id Типа
}

Device	{         // Устройство
  deviceType	    // Тип устройства 
  deviceModel	    // Модель
  serialNumber	  // Cерийный номер
  ipAdress ? 	    // IP
  inventoryNumber	// Инвентарный номер
  Person	        // id сотрудника
  _id	            // id устройства
}
```
