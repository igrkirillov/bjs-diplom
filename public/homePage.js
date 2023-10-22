"use strict";
// Кнопка "Выйти"
const lb = new LogoutButton();
lb.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

// обновление текущего профиля
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

// Обновление курса валют
const rb = new RatesBoard();
function updateRatesView() {
    ApiConnector.getStocks(response => {
       if (response.success) {
           rb.fillTable(response.data);
       } else {
           rb.clearTable();
       }
    });
}
updateRatesView();
setInterval(updateRatesView, 60*1000);

// пополнение баланса
const mm = new MoneyManager();
mm.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            mm.setMessage(true, "Пополнение баланса выполнено успешно!");
        } else {
            mm.setMessage(false, response.error);
        }
    })
}

// конвертирование валюты
mm.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            mm.setMessage(true, "Конвертация валюты выполнена успешно!");
        } else {
            mm.setMessage(false, response.error);
        }
    });
}

// перевод валюты
mm.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            mm.setMessage(true, "Перевод валюты выполнен успешно!");
        } else {
            mm.setMessage(false, response.error);
        }
    });
}

// Начальный список избранного
const fw = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        fw.clearTable();
        fw.fillTable(response.data)
        mm.updateUsersList(response.data);
    } else {
        fw.setMessage(false. response.error);
    }
})

// Добавление пользователя в список избранного
fw.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            fw.clearTable();
            fw.fillTable(response.data)
            mm.updateUsersList(response.data);
            fw.setMessage(true, "Добавление пользователя в Избранное выполнено успешно!");
        } else {
            fw.setMessage(false, response.error);
        }
    })
}

// Удаление пользователя из списка избранного
fw.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            fw.clearTable();
            fw.fillTable(response.data)
            mm.updateUsersList(response.data);
            fw.setMessage(true, "Удаление пользователя из Избранное выполнено успешно!");
        } else {
            fw.setMessage(false, response.error);
        }
    })
}