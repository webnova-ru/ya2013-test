'use strict';
/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name !== undefined? name: 'Vessel';
    this.position = Array.isArray(position)? position: [0,0];
    this.capacity = capacity !== undefined? capacity: 0;
    this.cargo = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    var str = 'Корабль "' + this.name + '". Местоположение: ' + this.position[0] + ', ' + this.position[1] + '. ' +
        'Занято: ' + this.getOccupiedSpace() +' из ' + this.capacity + 'т';
    console.log(str);
    document.write(str + '<br/>');
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    return this.capacity - this.cargo;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    return this.cargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    if(newPosition instanceof Planet)
    {
        this.position[0] = newPosition.position[0];
        this.position[1] = newPosition.position[1];
    }
    else if(Array.isArray(newPosition))
    {
        this.position[0] = newPosition[0];
        this.position[1] = newPosition[1];
    }

    else
        console.log('Невозможно осуществить полет');
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.name = name !== undefined? name: 'Земля';
    this.position = Array.isArray(position)? position: [0,0];
    this.availableAmountOfCargo = availableAmountOfCargo !== undefined? availableAmountOfCargo: 0;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    var str = 'Планета "' + this.name + '". Местоположение: ' + this.position[0] + ', ' + this.position[1] + '. ' +
        (this.getAvailableAmountOfCargo() === 0 ?'Грузов нет': 'Достуно груза: ' + this.getAvailableAmountOfCargo() + 'т');
    console.log(str);
    document.write(str + '<br/>');
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if(this.position[0] === vessel.position[0] && this.position[1] === vessel.position[1])
    {
        if(this.availableAmountOfCargo >= cargoWeight)
        {
            if(vessel.getFreeSpace() >= cargoWeight)
            {
                vessel.cargo += cargoWeight;
                this.availableAmountOfCargo -= cargoWeight;
            }
            else
                console.log('Столько места нет на корабле');
        }
        else
            console.log('Столько груза на планете нет');
    }
    else
        console.log('Корабль не смог сесть на планету');
}

/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if(this.position[0] === vessel.position[0] && this.position[1] === vessel.position[1])
    {
        if(vessel.cargo >= cargoWeight)
        {
            vessel.cargo -= cargoWeight;
            this.availableAmountOfCargo += cargoWeight;
        }
        else
            console.log('На коробле нет столько груза');
    }
    else
        console.log('Корабль не смог сесть на планету');
}

// -------------------------------------------
var vessel = new Vessel('Яндекс', [0,0], 1000);
var planetA = new Planet('A', [0,0], 0);
var planetB = new Planet('B', [100, 100], 5000);

// Проверка текущего состояния
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

vessel.flyTo(planetB);
planetB.loadCargoTo(vessel, 1000);
vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

vessel.flyTo(planetA);
planetA.unloadCargoFrom(vessel, 500);
vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
planetA.report(); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
planetB.report(); // Планета "B". Местоположение: 100,100. Доступно груза: 4000т.
