// @flow
import React, { Component } from 'react'
import { View } from 'react-native'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView/index.js'
import { TransactionExportSceneStyle } from '../../../../styles/indexStyles'
import type { EdgeCurrencyWallet, EdgeGetTransactionsOptions } from 'edge-core-js'
import s from '../../../../locales/strings'
import { PrimaryButton } from '../../components/Buttons/index'
import Share from 'react-native-share'
import RNFS from 'react-native-fs'

type PassedProps = {
  sourceWallet: EdgeCurrencyWallet
}
type Props = PassedProps

export class TransactionsExportSceneComponent extends Component<Props> {
  render () {
    console.log('allen: ', this.props)
    const styles = TransactionExportSceneStyle
    return <SafeAreaView>
      <View style={styles.container}>
        <Gradient style={styles.gradient} />
        <View style={styles.shim} />
        <View style={styles.actionButtonContainer} >
          <PrimaryButton
            text={s.strings.string_export_qbo}
            onPressFunction={this.exportQBO}
          />
        </View>
        <View style={styles.shim} />
        <View style={styles.actionButtonContainer} >
          <PrimaryButton
            text={s.strings.string_export_csv}
            onPressFunction={this.exportCSV}
          />
        </View>
      </View>
    </SafeAreaView>
  }
  exportQBO = async () => {
    const transactionOptions: EdgeGetTransactionsOptions = {

    }
    const file = await this.props.sourceWallet.exportTransactionsToQBO(transactionOptions)
    const path = RNFS.DocumentDirectoryPath + '/transactions.qbo'
    RNFS.writeFile(path, file, 'utf8')
      .then((success) => {
        console.log('FS: FILE WRITTEN!')
        this.openShareApp(path, 'Share Transactions QBO')
      })
      .catch((err) => {
        console.log('FS: ', err.message)
      })
  }
  exportCSV = async () => {
    const transactionOptions: EdgeGetTransactionsOptions = {

    }
    const file = await this.props.sourceWallet.exportTransactionsToCSV(transactionOptions)
    const path = RNFS.DocumentDirectoryPath + '/transactions.csv'
    RNFS.writeFile(path, file, 'utf8')
      .then((success) => {
        console.log('FS: FILE WRITTEN!')
        this.openShareApp(path, 'Share Transactions CVS')
      })
      .catch((err) => {
        console.log('FS: ', err.message)
      })
  }

  openShareApp = (path: string, subject: string) => {
    const shareOptions = {
      title: subject,
      message: '',
      url: 'file://' + path,
      subject: subject //  for email
    }
    Share.open(shareOptions)
      .then(() => {
        console.log('FS: Success')
      })
      .catch((err) => {
        console.log('FS:error on Share  ', err.message)
        console.log('FS:error on Share  ', err)
      })
  }
}
