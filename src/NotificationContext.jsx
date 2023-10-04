import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {

  /*
  console.log('notificationReducer occurred')
  console.log('action', action)
  console.log('action.payload', action.payload)
  console.log('state', state)
  console.log('state', JSON.parse(JSON.stringify(state)))
  */


  switch (action.type) {
    case "show":
        return action.payload
    case "clear":
        return action.payload
    case "reload":
        return action.payload
    default:
        return ""
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 'Anecdote application. Vote for an existing anecdote and/or add a new anecdote to the list')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
