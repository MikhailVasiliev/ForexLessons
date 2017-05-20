// @flow

import React from 'react'
import { Text, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Components
import SwiperItem from '../Components/SwiperItem'
import LoadingIndicator from '../Components/LoadingIndicator'

// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'

// services
import FirebaseDB from '../Services/FirebaseDB'

// Styles
import styles from './Styles/PresentationScreenStyles'
import { Colors } from '../Themes'

// External libs
import Swiper from 'react-native-swiper';
import FCM from 'react-native-fcm';
import Fabric from 'react-native-fabric';

let defaultScalingDrawerConfig = {
  scalingFactor: 0.9,
  minimizeFactor: 0.6,
  swipeOffset: 20
};

class PresentationScreen extends React.Component {

  componentWillReceiveProps(nextProps){
    switch (nextProps.mode){
    case 'feed':
      this.articles = nextProps.articles ? nextProps.articles : []
      break;
    case 'filtered':
      this.articles = nextProps.filteredArticles
      break;
    case 'marked':
      this.articles = nextProps.markedArticles
      break;
    default:
      break;
    }
  }

  componentWillMount() {
    //TODO - hide splash screen after timeout to change screen if no-auth

    if (this.props.mode === 'feed'){
      FirebaseDB.getAllArticles(this.setArticlesInState.bind(this), this.props.allThemes, this.articles)
    }
    NavigationActions.refresh({
      onLeft: () => {
        this.props.toggleDrawer()
      },
    })
  }

  componentDidMount(){
    this.props.blockDrawer(false)
    Fabric.Answers.logCustom('Presentation Screen', {user: this.props.user ? this.props.user : 'unauth launch'});
  }

  setDynamicDrawerValue = (type, value) => {
    defaultScalingDrawerConfig[type] = value;
    /** forceUpdate show drawer dynamic scaling example **/
    this.forceUpdate();
  };

  setArticlesInState (articles, themes) {
    this.props.storeArticles(articles)
    this.props.storeThemes(themes)
    this.subscribeToTopics(themes)
  }

  subscribeToTopics(themes) {
    themes.map((theme) => {
      if (theme.enabled && this.props.notificationsEnabled) {
        FCM.subscribeToTopic('/topics/' + theme.topic);
      }
    })
  }

  render () {

    if (this.articles && this.articles.length > 0) {
      return (
          <View style={styles.main}>
            <Swiper horizontal={false}
                     activeDotColor={Colors.skyBlue}
                     dot={this.renderDot('rgba(0, 0, 0, 0.2)')}
                     activeDot={this.renderDot(Colors.skyBlue)}
                     showsButtons={true}
                     buttonWrapperStyle={styles.footer}
                     nextButton={this.renderFooterButton('След. >')}
                     prevButton={this.renderFooterButton('< Назад')}
                     >
              { this.articles.map((article, index) => {
                return (<SwiperItem article={article} key={index}/>)
              }) }
            </Swiper>
          </View>
      )
    } else {
      return (
        <View style={styles.noArticlesContainer}>
          <LoadingIndicator
            active={true}
            text={'Загружаем данные...'}/>
        </View>
      )
    }
  }

  renderFooterButton(text){
    return (
        <Text style={styles.footerButtonText}>{text}</Text>
    )
  }

  renderDot(color) {
    return (
        <View style={[styles.dot, {backgroundColor: color}]}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.data,
    markedArticles: state.articles.markedArticles,
    filteredArticles: state.articles.filteredArticles,
    allThemes: state.notification.allThemes,
    notificationsEnabled: state.notification.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
