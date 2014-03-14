/** @jsx React.DOM */
var React = require('react');

var ImageItem = React.createClass({
    render: function() {
        return (
            <div className="radio">
                <label>
                    <input type="radio" name="featured-image-option" value={this.props.src} checked={this.props.checked}>
                        <img className="featured-image" src={this.props.src} />
                    </input>
                </label>
            </div>
        );
    }
});

module.exports = ImageItem;