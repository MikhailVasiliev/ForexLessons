// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: Colors.transparent
  },
  bluredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  switchContainer: {
    // marginTop: Metrics.navBarHeight + Metrics.statusBarHeight * 2,
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientFirst: {
    marginTop: Metrics.navBarHeight + Metrics.statusBarHeight * 2,
    margin: 20,
    height: 70,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    margin: 20,
    height: 70,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicsStickerContainer: {
    margin: 20,
    height: 70,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  topicsSticker: {
    ...Fonts.style.h6,
    backgroundColor: Colors.transparent,
    color: 'white'
  },
  // switchComponent: {
  //   margin: 10,
  // },
  switchComponent: {
    margin: 10,
    padding: -10,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchButtonView: {
    margin: 10,
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 0.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchComponentText: {
    ...Fonts.style.h5,
    marginLeft: 25,
    color: 'white'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  labelStyle: {
    ...Fonts.style.h5,
    flex: 1,
    color: 'white',
    textAlign: 'right',
    marginRight: 30,
  },
  checkboxStyle: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: Colors.mainGreen,
    borderRadius: 5
  },
  applyButton: {
    backgroundColor: Colors.mainGreen,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
  },
  checkboxText: {
    color: 'white'
  },
})
