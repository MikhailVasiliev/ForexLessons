import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import styles from './Styles/SwiperItemStyles'

import { Actions as NavigationActions } from 'react-native-router-flux'


const photoPlaceHolder = 'https://2ch.hk/b/arch/2016-03-15/src/120139891/14580644394070.png'

export default class SwiperItem extends React.Component {

  render() {
    let article = this.props.article
    return (
      <View style={styles.main} >
        <Image style={styles.main} source={{uri: article.cover}}>
          <TouchableOpacity activeOpacity={0.95} style={styles.overlay} onPress={() => {NavigationActions.articleScreen({article})}}>
            <Text style={styles.articleDate}>{article.date}</Text>
            <Text style={styles.articleTitle}>{article.title}</Text>
          </TouchableOpacity>
        </Image>
      </View>
    )
  }
}

SwiperItem.propTypes = {
  article: React.PropTypes.object,
}
