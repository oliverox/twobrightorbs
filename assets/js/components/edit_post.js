/** @jsx React.DOM */

var React = require('react');
var ImageItem = require('./edit_post/image_item');
var bootstrap = require('bootstrap');
var summernote = require('summernote');
var $postbody;

var EditPost = React.createClass({

        componentWillMount: function() {
            this.props.model.on("change", function() {
                console.log("$$$$$$$$$$$$$$$$$ MODEL CHANGED!!!! $$$$$$$$$", this.props.model.changedAttributes());
                if ('body' in this.props.model.changedAttributes()) {
                    $postbody.code(this.props.model.get('body'));
                }
                this.forceUpdate();
            }, this);
        },

        componentDidMount: function() {
            $postbody = $("#post-body");
            this.renderSummernote();
        },

        save: function() {
            var url = '/post/update/' + this.props.model.get('id');
            this.props.model.save({
                url: function() {
                    return url;
                }
            });
        },

        change: function(param) {
            console.log('changing', param.target.attributes['data-fld'].value,"=======\n", param.target.value);
            var fld = param.target.attributes['data-fld'].value;
            this.props.model.set(fld, param.target.value);
        },

        render: function() {        
            var body = this.props.model.get('body');
            var imgs = [];
            if (body) {
                var parts = body.split('src="');
                $.each(parts, function(i) {
                    if (parts[i].indexOf('data') === 0) {
                        imgs.push(parts[i].split('" style')[0]);
                    }
                });
            }
            var imageItems = imgs.map(function(img) {
                return <ImageItem src={img}></ImageItem>
            });
        
            return ( 
                <div className="layout">
                    <input id="post-title" type="text" className="form-control" placeholder="New Post Title" data-fld="title" value={this.props.model.get('title')} onChange={this.change} />
                    <input id="post-author" type="text" className="form-control" placeholder="Author" data-fld="author" value={this.props.model.get('author')} onChange={this.change} /> 
                    <textarea id="post-body" data-fld="body" value={this.props.model.get('body')} />
                    <div className="image-list">
                        {imageItems}
                    </div>
                    <button onClick={this.save} id="save-post" type="button" className="btn btn-primary">Save Post</button> 
                </div>
            );
        },

        renderSummernote: function() {
            console.log(">>>>>>>>>> rendering summernote");
            var self = this;
            console.log("INITIALIZING SUMMERNOTE WITH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", self.props.model.get('body'), this.getDOMNode());
            $postbody.summernote({

                height: 400,

                oninit: function() {
                    console.log('SUMMERNOTE ONINIT');
                    $postbody.code(self.props.model.get('body'));
                },

                onblur: function() {
                    console.log('SUMMERNOTE ONBLUR', $postbody.code());
                    self.props.model.set('body', $postbody.code());
                },

                onImageUpload: function(files, editor, welEditable) {
                    var readFile = function (file) {
                        return $.Deferred(function (deferred) {
                            var reader = new FileReader();
                            reader.onload = function (e) { deferred.resolve(e.target.result); };
                            reader.onerror = function () { deferred.reject(this); };
                            reader.readAsDataURL(file);
                        }).promise();
                    };

                    $.each(files, function (idx, file) {
                        readFile(file).done(function (sURL) {
                            console.log(">>>>>>>>>>>> URL ======>>>>>", sURL);
                            editor.insertImage(welEditable, sURL);
                            $postbody[0].blur();
                            // var param = {
                            //     target: {
                            //         attributes: {
                            //             'data-fld': {value: 'body'}
                            //         },
                            //         value: $postbody.code()
                            //     }
                            // };
                            // self.change(param);
                            // self.forceUpdate();
                        }).fail(function () {
                            if (callbacks.onImageUploadError) {
                                callbacks.onImageUploadError();
                            }
                        });
                    });
                }      
            });
        }
});

module.exports = EditPost;
