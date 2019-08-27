// @flow

import type { EdgeAccount, EdgeContext } from 'edge-core-js'
import { LoginScreen } from 'edge-login-ui-rn'
import React, { Component } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import slowlog from 'react-native-slowlog'

import { version } from '../../../package.json'
import edgeBackgroundImage from '../../assets/images/edgeBackground/login_bg.jpg'
import edgeLogo from '../../assets/images/edgeLogo/Edge_logo_L.png'
import s from '../../locales/strings.js'
import * as CONTEXT_API from '../../modules/Core/Context/api'
import THEME from '../../theme/variables/airbitz.js'
import type { Dispatch } from '../../types/reduxTypes.js'

type Props = {
  initializeAccount: (EdgeAccount, touchIdInfo: ?Object) => void,
  context: EdgeContext,
  addUsernames: (Array<string>) => void,
  account: ?EdgeAccount,
  recoveryLogin: string,
  dispatch: Dispatch,
  username?: string
}
type State = { key: number }

export default class Login extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { key: 0 }
    slowlog(this, /.*/, global.slowlogOptions)
  }

  onLogin = (error: ?Error = null, account: ?EdgeAccount, touchIdInfo: ?Object = null) => {
    if (error || !account) return
    this.props.initializeAccount(account, touchIdInfo)

    CONTEXT_API.listUsernames(this.props.context) // update users list after each login
      .then(usernames => {
        this.props.addUsernames(usernames)
      })
  }

  UNSAFE_componentWillReceiveProps (nextProps: Props) {
    // If we have logged out, destroy and recreate the login screen:
    if (this.props.account && nextProps.account && nextProps.account !== this.props.account) {
      if (typeof nextProps.account.username === 'undefined') {
        this.setState({ key: this.state.key + 1 })
      }
    }
  }

  render () {
    return !this.props.context.listUsernames ? null : (
      <View style={styles.container} testID={'edge: login-scene'}>
        <LoginScreen
          username={this.props.username}
          accountOptions={null}
          context={this.props.context}
          recoveryLogin={this.props.recoveryLogin}
          onLogin={this.onLogin}
          fontDescription={{
            regularFontFamily: THEME.FONTS.DEFAULT
          }}
          key={this.state.key.toString()}
          appName={s.strings.app_name_short}
          backgroundImage={edgeBackgroundImage}
          primaryLogo={edgeLogo}
          landingScreenText={`v${version}`}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: THEME.COLORS.PRIMARY
  }
})
