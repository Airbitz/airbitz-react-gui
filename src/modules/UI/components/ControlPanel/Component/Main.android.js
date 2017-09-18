import React, {Component} from 'react'
import {View, TouchableNativeFeedback, Image} from 'react-native'
import {Text} from 'native-base'
import {Actions} from 'react-native-router-flux'
import {sprintf} from 'sprintf-js'
import strings from '../../../../../locales/default'

import UserList from './UserListConnector'

import styles from '../style'

import logoutImage from '../../../../../assets/images/sidenav/logout.png'
import settings from '../../../../../assets/images/sidenav/settings.png'

const LOGOUT_TEXT = sprintf(strings.enUS['settings_button_logout'])
const SETTINGS_TEXT = sprintf(strings.enUS['settings_title'])

export default class Main extends Component {
  onLogout = () => {
    // console.log('logout')
    this.props.logout()
  }

  render () {
    return this.props.usersView ? <UserList /> : (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.others.container}>
          <TouchableNativeFeedback
            onpress={this.onLogout}>
            <View style={[styles.others.link, styles.others.borderVertical]}>
              <View style={styles.iconImageContainer}>
                <Image style={styles.iconImage} source={logoutImage} />
              </View>
              <View style={styles.others.textContainer}>
                <Text style={styles.others.text}>
                  {LOGOUT_TEXT}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this._handleOnPressRouting('settingsOverview')}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.others.link}>
              <View style={styles.iconImageContainer}>
                <Image style={styles.iconImage} source={settings} />
              </View>
              <View style={styles.others.textContainer}>
                <Text style={styles.others.text}>
                  {SETTINGS_TEXT}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }

  _handleOnPressRouting = (route) => () => {
    switch (route) {
    case 'settingsOverview':
      return Actions.settingsOverview({type: 'reset'})
    case 'walletList':
      return Actions.walletList({type: 'reset'})
    case 'transactions':
      return Actions.transactionList({type: 'reset'})
    default:
      return
    }
  }
}
