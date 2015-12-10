(function(np) {
  'use strict';

	var types = [
				'html', 'head', 'meta', 'body'
			].reduce(function(acc, value) { acc[value] = true; }, {});

  np.Element.prototype.validateType = function(type) {
		if(!types[type]) {
			throw new Error(np.message.invalidArgument('type', 'not an allowed type'));
		}
	};

}(this.np));
