import { useContext } from 'react'
import { useNotificationValue } from '../NotificationContext'


const Notification = () => {
  //console.log('notification occurred')

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useNotificationValue()
  return (
    <div className="ok">
      {notification}
    </div>
  )
}

export default Notification
