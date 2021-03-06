import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import theme from "themes/index";

import DropdownTrigger from './DropdownTrigger.js';
import DropdownContent from './DropdownContent.js';

const DropdownDiv = styled.div`
  position: relative;
  display: block;
  > div {
    position: absolute;
    width: 100%;
    display: ${props => props.active ? 'block' : 'none'};
  }
`;

class Dropdown extends Component {

  componentDidMount () {
    window.addEventListener('click', this._onWindowClick);
    window.addEventListener('touchstart', this._onWindowClick);
  }

  componentWillUnmount () {
    window.removeEventListener('click', this._onWindowClick);
    window.removeEventListener('touchstart', this._onWindowClick);
  }

  constructor (props) {
    super(props);

    this.state = {
      active: false
    };

    this._onWindowClick = this._onWindowClick.bind(this);
    this._onToggleClick = this._onToggleClick.bind(this);
  }

  isActive () {
    return (typeof this.props.active === 'boolean') ?
      this.props.active :
      this.state.active;
  }

  hide () {
    this.setState({
      active: false
    }, () => {
      if (this.props.onHide) {
        this.props.onHide();
      }
    });
  }

  show () {
    this.setState({
      active: true
    }, () => {
      if (this.props.onShow) {
        this.props.onShow();
      }
    });
  }

  _onWindowClick (event) {
    const dropdownElement = findDOMNode(this);
    if (event.target !== dropdownElement && !dropdownElement.contains(event.target) && this.isActive()) {
      this.hide();
    }
  }

  _onToggleClick (event) {
    event.preventDefault();
    if (this.isActive()) {
      this.hide();
    } else {
      this.show();
    }
  }

  render () {
    const { children, className } = this.props;
    // create component classes
    const active = this.isActive();
    // stick callback on trigger element
    const boundChildren = React.Children.map(children, child => {
      if (child.type === DropdownTrigger) {
        const originalOnClick = child.props.onClick;
        child = cloneElement(child, {
          ref: 'trigger',
          onClick: (event) => {
            this._onToggleClick(event);
            if (originalOnClick) {
              originalOnClick.apply(child, arguments);
            }
          }
        });
      }
      return child;
    });
    const cleanProps = { ...this.props };
    delete cleanProps.active;
    delete cleanProps.onShow;
    delete cleanProps.onHide;

    return (
      <DropdownDiv
        {...cleanProps}
        active={active}
        className={`${className}`}>
        {boundChildren}
      </DropdownDiv>
    );
  }
}

Dropdown.propTypes = {
  active: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Dropdown.defaultProps = {
  className: ''
};

export { DropdownTrigger, DropdownContent };
export default Dropdown;
