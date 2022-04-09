import { Icon } from '../icon'

const path = '/public/icons/'

const messagePath = path + 'message.svg'
const enemyPath = path + 'enemy.svg'

export const IconsList: Icon[] = [
  new Icon('message', messagePath),
  new Icon('enemy', enemyPath),
]
