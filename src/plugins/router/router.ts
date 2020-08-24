import { App } from 'vue'

export default {}

export const install = (app: App, options: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.log(app, options)
}