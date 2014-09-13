$.FollowToggle = function (el, options) {
  this.$el = $(el);
	this.userId = this.$el.data("user-id") || options.userId;
	this.followState = this.$el.data("initial-follow-state") || options.followState;
	this.render();
	this.$el.on('click', this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
	if (this.followState === "followed" || this.followState === "unfollowed") {
		this.$el.prop("disabled", false);
	} else if (this.followState === "followed" || this.followState === "unfollowed"){
		this.$el.prop("disabled", true);
	}
	 
  if (this.followState === "followed") {
  	this.$el.text("Unfollow");
  } else if (this.followState === "unfollowed") {
  	this.$el.text("Follow!");
  } else if (this.followState === "following") {
  	this.$el.text("Following");
	} else if (this.followState === "unfollowing") {
		this.$el.text("Unfollowing");
	}
};

$.FollowToggle.prototype.handleClick = function (event) {
	var that = this;
	event.preventDefault();
	
	if (that.followState === "followed") {
		that.followState = "unfollowing"
	} else {
		that.followState = "following" 
	}
	that.render();
	
	if (that.followState === "unfollowing") {
		console.log(that.userId +"/follow");
		$.ajax({
			url: "/users/" + that.userId + "/follow",
			type: 'DELETE', 
			dataType: 'json',
			success: function () {
				that.followState = "unfollowed" 
				that.render();
			}
		});
	} else if (that.followState === "following") {
		
		$.ajax({
			url: "/users/"+that.userId +"/follow",
			type: 'POST', 
			success: function () {
				that.followState = "followed"
				that.render();
			}
		})
	}
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});