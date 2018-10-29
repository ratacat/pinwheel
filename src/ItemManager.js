'use strict';

const ItemType = require('./ItemType');

/**
 * Keep track of all in-game items
 * 
 * @extends Set
 */
class ItemManager extends Set {
  remove(item) {
    if (item.belongsTo) {
      item.belongsTo.removeItem(item);
    }

    if (item.inventory) {
      item.inventory.forEach(childItem => this.remove(childItem));
    }

    this.delete(item);
  }

  /**
   * @fires Item#updateTick
   */
  tickAll() {
    for (const item of this) {
      /**
       * @event Item#updateTick
       */
      item.emit('updateTick');
    }
  }
}

module.exports = ItemManager;
