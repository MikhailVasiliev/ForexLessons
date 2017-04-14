// @flow

import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// Components
import SwiperItem from '../Components/SwiperItem'

// External libs
import Swiper from 'react-native-swiper';
import * as firebase from 'firebase';

// Redux
import { connect } from 'react-redux'

// Redux
import FirebaseDB from '../Services/FirebaseDB'

// Styles
import styles from './Styles/PresentationScreenStyles'
import { Colors } from '../Themes'

class PresentationScreen extends React.Component {

  // this.login('mr.m.vasiliev@gmail.com', '111111')
  constructor (props) {
    super(props)

    this.state = {
      articles: props.articles ? props.articles : []
    }
  }

  componentWillMount() {
    if (!this.props.articles) {
      FirebaseDB.getAllArticles(this.setArticlesInState.bind(this))
    }

    NavigationActions.refresh({
      onLeft: () => {
        NavigationActions.login()
      },
      onRight: () => {
        NavigationActions.settings()
      },
    })
  }

  componentDidMount(){
  }

  setArticlesInState (articles) {
    this.setState({articles})
  }

  render () {
    let articles = this.props.filteredArticles ? this.props.filteredArticles : this.props.articles

    if (articles.length > 0) {
      return (
        <View style={styles.main}>
          <Swiper horizontal={false}
                   activeDotColor={Colors.skyBlue}
                   dot={this.renderDot('rgba(0, 0, 0, 0.2)')}
                   activeDot={this.renderDot(Colors.skyBlue)}
                   >
            { articles.map((article, index) => {
              return (<SwiperItem article={article} key={index}/>)
            }) }
          </Swiper>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButtons} onPress={() => {console.tron.log('Footer buttom pressed')}}>
              <Text style={styles.footerButtonText}>Read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButtons} onPress={() => {console.tron.log('Footer buttom pressed')}}>
              <Text style={styles.footerButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (<View style={{flex: 1, backgroundColor: 'green'}}/>)
    }
  }

  renderDot(color) {
    return (
      <View style={{
        backgroundColor: color,
        width: 6,
        height: 6,
        borderRadius: 2,
        margin: 2,
      }}/>
    )
  }

  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.tron.log('Account created');
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  async login(email, pass) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      console.tron.log('Logged In!');
        // Navigate to the Home page
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
        // Navigate to login view
    } catch (error) {
      console.tron.log(error);
    }
  }

}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
