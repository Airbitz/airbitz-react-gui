// @flow

import * as React from 'react'

import { LoadingScene } from '../../../../components/scenes/LoadingScene.js'
import { connect } from '../../../../types/reactRedux.js'
import { type RootState } from '../../../../types/reduxTypes.js'

type StateProps = {
  loginStatus: boolean
}

export function ifLoggedIn<Props>(Component: React.ComponentType<Props>): (props: Props) => React.Node {
  return connect<StateProps, {}, Props>(
    (state: RootState): StateProps => ({
      loginStatus: state.ui.settings.loginStatus ?? false
    }),
    dispatch => ({})
  )((props: Props & StateProps): React.Node => {
    const { loginStatus, ...rest } = props
    return loginStatus ? <Component {...rest} /> : <LoadingScene />
  })
}
