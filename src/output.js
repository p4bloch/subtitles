import chalk from 'chalk'

export const log = (str, any) => console.log(chalk.green(str), any || '')
