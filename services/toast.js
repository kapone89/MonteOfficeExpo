// import Toast, { DURATION } from 'react-native-easy-toast';
// import React, { Component } from 'react';

import { Toast } from "native-base";

class ToastService {
  show = (msg) => {
    Toast.show({text: msg});
  }
}

const toast = new ToastService();

export default toast;
