if (typeof Scripts === "undefined") {
	window.Scripts = {};
}

$.UsersSearch = function (el) {
  this.$el = $(el);
	this.$input = this.$el.find("input");
	this.$ul = this.$el.find("ul");
	this.$input.on('keydown', this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
	var value = this.$input.val();
	var sent_data = { query: value};
	// var query = $(this.$input).serialize();
	// var result = JSON.stringify();
	var that = this;
	$.ajax({
		url: "/users/search",
		type: 'GET', 
		dataType: 'json',
		data: sent_data,
		success: function ( resp ) {
			that.renderResults(resp);
		}
	})
};

$.UsersSearch.prototype.renderResults = function (usersArray) {
	this.$ul.text("");
	var that = this;
	usersArray.forEach(function(user){
		//<li><a href='></il>
		var $li = $("<li></li>");
		var $a = $("<a href='/users/" + user.id + "'>" + user.username + "</a>");
		var $button = $('<button class="follow-toggle"></button>');
		
		if (user.followed){
			var option_state = "followed"
		}
		else{
			var option_state = "unfollowed"
		}
		var options = { userId: user.id, followState: option_state };
		console.log(user.followed);
		$button.followToggle(options);

		$li.append($a);
		$li.append($button);
		that.$ul.append($li);
	})
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});