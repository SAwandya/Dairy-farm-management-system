const EventBus = {
    events: {},
    subscribe(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
    unsubscribe(event, callback) {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    },
    emit(event, data) {
      if (!this.events[event]) return;
      this.events[event].forEach(callback => callback(data));
    },
    on: function(event, callback) {
      this.subscribe(event, callback);
    },
    off: function(event, callback) {
      this.unsubscribe(event, callback);
    }
};

export default EventBus;


/* EventBus.js
const EventEmitter = require('events');

class EventBus extends EventEmitter {}

const eventBus = new EventBus();

export default eventBus; */
