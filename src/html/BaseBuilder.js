(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @constructor np.HeadBuilder
	 * @param {np.HtmlBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var BaseBuilder = np.inherits(function(parentBuilder) {
		Base.call(this, parentBuilder, new np.Element('base'));
	}, Base);

  BaseBuilder.prototype.href = function(href) {
		if(this.validateHref) this.validateHref(href);
    this.attrib('href', href);
  };

  BaseBuilder.prototype.target = function(target) {
		if(this.validateTarget) this.validateTarget(target);
    this.attrib('target', target);
  };

	np.BaseBuilder = BaseBuilder;
}(this.np));
