// @flow

import * as React from 'react'
import { View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import { Fontello } from '../../../../../assets/vector'
import { type Theme, cacheStyles, useTheme } from '../../../../../components/services/ThemeContext'
import { EdgeText } from '../../../../../components/themed/EdgeText'

export type Props = {
  username: string
}

export default function SwitcherHeader(props: Props) {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.header}>
      <View style={styles.iconUser}>
        <Fontello name="fioNames" size={theme.rem(1.5)} color={theme.iconPanel} />
      </View>
      <View style={styles.textContainer}>
        <EdgeText style={styles.text}>{props.username}</EdgeText>
      </View>
      <Feather name="chevron-down" color={theme.iconPanel} size={theme.rem(1.5)} />
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.rem(2)
  },
  iconUser: {
    marginRight: theme.rem(1.5)
  },
  textContainer: {
    marginRight: 'auto'
  },
  text: {
    fontFamily: theme.fontFaceBold
  }
}))
