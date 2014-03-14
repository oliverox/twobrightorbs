/** @jsx React.DOM */
var React = require('react');
var dp = require('bootstrap-datepicker');

var DatePicker = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.date
        }
    },
    componentDidMount: function() {
        var self = this;
        console.log('adding datepicker to', $(this.getDOMNode()));
        $(this.getDOMNode()).datepicker({
            autoclose: true,
            todayBtn: true,
            todayHighlight: true
        }).on("changeDate", function(evt) {
            console.log("Setting date value to", evt.format(0), this);
            var value = evt.format(0);
            self.props.model.set("date", value);
        });
    },
    render: function() {
        var value = this.state.value;
        return (
            <div className="input-group date datepicker" data-date={value} data-date-format="yyyy-mm-dd">
                <input type="text" className="form-control" defaultValue={value} />
                <span className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                </span>
            </div>
        );
    }
});

module.exports = DatePicker;