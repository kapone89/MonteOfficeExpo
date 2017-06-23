import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, WebView, Dimensions } from 'react-native';
import { observer } from "mobx-react/native"

var { height, width } = Dimensions.get('window');

@observer
export default class ScreenThumbnail extends Component {
  htmlContent(imgUrl) {
    return `<html><body style="background-size: cover; background-position: center; background-image: url('${imgUrl}')"></body></html>`
  }
  render() {
      var styles = StyleSheet.create({
          wrapper: {
              flex:1,
              width: width * this.props.size,
              height: ( width * 1080 * this.props.size )/ 1920
          },
          back: {
              width: width * this.props.size,
              height: ( width * 1080 * this.props.size )/ 1920,
              zIndex: 0
          },
          front: {
              position: 'absolute',
              top:0,
              left:0,
              width: width * this.props.size,
              height: ( width * 1080 * this.props.size )/ 1920,
              zIndex: 1
          }
      });
      var source = {}
      if (this.props.thumb && this.props.screen.thumb) {
        source.html = this.htmlContent(this.props.screen.thumb)
      } else {
        source.uri = this.props.screen.website
      }
      return (
        <View style={styles.wrapper}>
            <WebView
              style={styles.back}
              source={source}
            />
            <TouchableOpacity style={styles.front} onPress={this.props.onPress}></TouchableOpacity>
        </View>
      )
  }
}
