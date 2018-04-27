import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import WithFiltering from 'consul-ui/mixins/with-filtering';
import ucfirst from 'consul-ui/utils/ucfirst';
import numeral from 'numeral';
const countType = function(items, type) {
  return type === '' ? get(items, 'length') : items.filterBy('Type', type).length;
};
export default Controller.extend(WithFiltering, {
  init: function() {
    this._super(...arguments);
    this.filters = {
      type: '',
    };
  },
  typeFilters: computed('items', function() {
    const items = get(this, 'items');
    return ['', 'management', 'client'].map(function(item) {
      return {
        label: `${item === '' ? 'All' : ucfirst(item)} (${numeral(
          countType(items, item)
        ).format()})`,
        value: item,
      };
    });
  }),
  filter: function(item, { s = '', type = '' }) {
    return (
      get(item, 'Name')
        .toLowerCase()
        .indexOf(s.toLowerCase()) === 0 &&
      (type === '' || get(item, 'Type') === type)
    );
  },
  actions: {
    requestUse: function() {},
    requestDelete: function() {},
    clone: function() {},
  },
});