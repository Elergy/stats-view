var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var dispatcher = require('./../dispatcher.es6');

var conversionStore = {
  _conversions: [],

  init() {
    this.on('change', this.save.bind(this));
    this.on('change-conversion', this.updateConversions.bind(this));
    this.load();

    dispatcher.register((payload) => {
      var action = payload.action;

      if (payload.source === 'VIEW_ACTION') {
        if (action.actionType === 'new-conversion') {
          this._conversions = this._conversions.filter((conversion) => conversion.title !== action.data.title);
          var conversion = action.data;
          if (conversion.data) {
            var info = this.countConversionInfo(conversion.data.value, conversion.base, conversion.data.n);
            conversion.data.interval = info.interval;
            conversion.data.isCredible = info.isCredible
          }

          this._conversions.push(conversion);
          this.emit('change');
          this.emit('change-conversion');
        }
      } else if (payload.source === 'ACTION') {
        if (action.actionType === 'graph-data') {
          conversion = _.find(this._conversions, (conversion) => conversion.title === action.data.name);
          if (conversion) {
            var func = new Function(`return ${conversion.func}`)();
            conversion.data = func(action.data.data);
            if (conversion.data) {
              info = this.countConversionInfo(conversion.data.value, conversion.base, conversion.data.n);
              conversion.data.interval = info.interval;
              conversion.data.isCredible = info.isCredible
            }
            this.emit('change');
          }
        }
      }
    });
  },

  load() {
    this._conversions = JSON.parse(localStorage.getItem('conversions')) || [];
    this.emit('change');
    this.emit('change-conversion');
  },

  updateConversions() {
    setTimeout(() => {
      this._conversions.forEach((conversion) => {
        dispatcher.handleAction({
          actionType: 'get-graph',
          data: conversion
        });
      });
    });
  },

  countConversionInfo(conversion, base, n) {
    conversion = parseFloat(conversion, 10);
    base = parseFloat(base, 10) / 100;
    n = parseInt(n, 10);
    console.log(`conversion = ${conversion}, base = ${base}, n = ${n}`);
    var interval = 2 * Math.sqrt(base * (1 - base) / n);
    console.log(`interval = ${interval}`);
    var diff = Math.abs(conversion - base);
    var origN = 16 * base * (1 - base) / diff / diff;
    return {
      interval: interval,
      isCredible: n > origN
    };
  },

  save() {
    localStorage.setItem('conversions', JSON.stringify(this._conversions));
  },

  getConversions() {
    return this._conversions;
  }
};

conversionStore = _.extend(conversionStore, EventEmitter.prototype);
conversionStore.init();

module.exports = conversionStore;