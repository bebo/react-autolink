import "babel-core/polyfill";
import React from "react";
import ReactAutolinkMixin from "../src/react-autolink";

let App = React.createClass({
  getDefaultProps() {
    return {
      text: "foo bar baz http://yahoo.co.jp/test/abcde?abc=1234 www.google.com .bar ...hello blab.im www.blab.im bar" +
      " https://medium.com/@shaanvp/af1526dfee3e#.9g5fpk6cz http://fortune.com/march-madness-super-bowl-world-cup-revenue/",
    };
  },

  mixins: [
    ReactAutolinkMixin
  ],

  render() {
    return (
      <div>
        <div>{ this.autolink(this.props.text) }</div>
        <div>{ this.autolink(this.props.text, { target: "_blank", rel: "nofollow", ref:'blab' }) }</div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
