import { Icon } from '../icon'

const path = '/public/icons/'

const messageImage = new Image()
const enemyImage = new Image()

messageImage.src = path + 'message.svg'
enemyImage.src = path + 'enemy.svg'

export const IconsList: Icon[] = [
  { id: 'message', image: messageImage },
  { id: 'enemy', image: enemyImage }
]