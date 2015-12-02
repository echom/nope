(function(np) {
	'use strict';

	var Base = np.ElementBuilder;
	var HtmlBuilder = np.inherits(Base, function() {
		Base.call(this, null, new np.Element('html'));
		this.head_ = new np.HeadBuilder(this);
		this.body_ = new np.BodyBuilder(this);

		this.charset_ = np.MetaBuilder().charset('utf-8');
	});
	HtmlBuilder.prototype.up = function() { return this; };
	HtmlBuilder.prototype.head = function() { return this.head_; };
	HtmlBuilder.prototype.body = function() { return this.body_; };
	HtmlBuilder.prototype.charset = function(charset) {
		this.head_.charset(charset);
		return this;
	};
	HtmlBuilder.prototype.httpEquiv = function(equiv) {
		this.head_.httpEquiv(equiv);
		return this;
	};
	HtmlBuilder.prototype.meta = function(name, content) {
		this.head_.meta(name, content);
		return this;
	};

	np.HtmlBuilder = HtmlBuilder;

	np.html = function() { return new np.HtmlBuilder; }
}(this.np));
