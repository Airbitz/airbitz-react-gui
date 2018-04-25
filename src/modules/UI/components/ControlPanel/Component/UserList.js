// @flow

import { Icon } from 'native-base'
import React, { Component } from 'react'
import { Alert, ScrollView, TouchableHighlight, View } from 'react-native'

import T from '../../../components/FormattedText'
import styles from '../style'

type Props = {
  usernames: Array<string>,
  logout: (username?: string) => void,
  deleteLocalAccount: string => void,
  allUsernames: Array<string>,
  currentUsername: string
}
type State = {}
export default class UserList extends Component<Props, State> {
  render () {
    const { allUsernames, currentUsername } = this.props
    const usernames = allUsernames.filter(username => username !== currentUsername)

    return (
      <ScrollView style={styles.userList.container}>
        {usernames.map(username => (
          <View key={username} style={styles.userList.row}>
            <TouchableHighlight style={styles.userList.textContainer} underlayColor={styles.underlay.color} onPress={this.handlePressUserSelect(username)}>
              <T style={styles.userList.text}>{username}</T>
            </TouchableHighlight>

            <TouchableHighlight style={styles.userList.icon} underlayColor={styles.underlay.color} onPress={this.handlePressDeleteLocalAccount(username)}>
              <Icon name="close" />
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    )
  }

  handlePressUserSelect = (username: string) => () => {
    return this.props.logout(username)
  }
  handleDeleteLocalAccount = (username: string) => () => {
    return this.props.deleteLocalAccount(username)
  }
  handlePressDeleteLocalAccount = (username: string) => () => {
    return Alert.alert(
      'Delete Account',
      "Delete '" +
        username +
        "' on this device? This will disable access via PIN. If 2FA is enabled on this account, this device will not be able to login without 2FA reset which takes 7 days",
      [{ text: 'No', style: 'cancel' }, { text: 'Yes', onPress: () => this.handleDeleteLocalAccount(username)() }]
    )
  }
}
