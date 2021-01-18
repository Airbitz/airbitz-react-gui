// @flow

import type { EdgeAccount, EdgeContext } from 'edge-core-js'
import { ChangePinScreen } from 'edge-login-ui-rn'
import * as React from 'react'

import { SceneWrapper } from '../common/SceneWrapper.js'

export type ChangePinOwnProps = {
  account: EdgeAccount,
  context: EdgeContext
}

export type ChangePinDispatchProps = {
  onComplete: () => void
}

export type ChangePinStateProps = {
  context: EdgeContext,
  account: EdgeAccount
}

type ChangePinComponentProps = ChangePinOwnProps & ChangePinDispatchProps & ChangePinStateProps

export default class ChangePassword extends React.Component<ChangePinComponentProps> {
  onComplete = () => {
    this.props.onComplete()
  }

  render() {
    return (
      <SceneWrapper hasTabs={false} background="body">
        <ChangePinScreen account={this.props.account} context={this.props.context} onComplete={this.onComplete} onCancel={this.onComplete} showHeader={false} />
      </SceneWrapper>
    )
  }
}
