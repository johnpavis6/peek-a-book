import React, { Component } from 'react';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupScale: this.props.showAtInitial || false,
        }
        this.scalePopup = this.scalePopup.bind(this);
        this.togglePopupDisplay = this.togglePopupDisplay.bind(this);
    }
    hidePopup() {
        this.setState({
            popupScale: false,
        }, () => { setTimeout(this.props.togglePopupDisplay, 500) });
    }
    scalePopup() { this.setState({ popupScale: false }, () => { this.setState({ popupScale: true }) }); }
    dontClose(e) { e.stopPropagation() }
    togglePopupDisplay() {
        this.setState({ popupScale: !this.state.popupScale });
    }
    render() {
        let { ChildComponent, ChildComponentArgs } = this.props;
        return (
            <div className={`popup`}>
                <div className={`popup-container popup-blur-${this.state.popupScale}`}
                    onClick={this.hidePopup}>
                    <div className={`popup-content scale-${this.state.popupScale}`} onClick={this.dontClose}>
                        {<ChildComponent {...ChildComponentArgs} scalePopup={this.scalePopup} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;