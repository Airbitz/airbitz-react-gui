// @flow

export type Theme = {
  // The app scaling factor, which is the height of "normal" text:
  rem(size: number): number,

  // Background colors:
  background1: string,
  background2: string,
  modalBody: string,

  // Text colors:
  accentTextNegative: string,
  accentTextPositive: string,
  headerText: string,
  primaryText: string,
  secondaryText: string,

  // Tile colors:
  lineDivider: string,
  tileBackground: string,
  tileIcon: string,
  tileMore: string,

  // Button colors:
  cancelButton: string,
  primaryButton: string,
  primaryButtonText: string,
  secondaryButtonOutline: string,
  secondaryButtonText: string,
  selectButtonOutline: string,
  selectButtonText: string
}
