import Toast, { DURATION } from 'react-native-easy-toast';
import React, { Component } from 'react';

class ToastService {
  show = (msg) => {
    if (this.toastElement) {
      this.toastElement.show(msg);
    } else {
      console.log(msg);
    }

  }
}

const toast = new ToastService();

export class ToastElement extends Component {
  componentDidMount() {
    console.log(this.refs);
    toast.toastElement = this.refs.toast;
  }

  render() {
    return (
      <Toast ref="toast"/>
    );
  }
}


export default toast;
