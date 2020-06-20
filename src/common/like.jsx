import React, { Component } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <Tippy content={<span>Favroite Movie</span>}>
        <i
          style={{ cursor: "pointer" }}
          className={classes}
          aria-hidden="true"
          onClick={this.props.onClick}
        ></i>
      </Tippy>
    );
  }
}

export default Like;
