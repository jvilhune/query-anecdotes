// JSX
// space -> &nbsp;
// line break -> <br/>
// division of a section (line break) -> <div></div>
// paragraph break (single empty line fefore and after) -> <p></p>
// {/* This is a comment in JSX */}
// <!-- This is a comment in HTML -->
// This is a comment in javascript
/* This is a comment in javascript */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

import { useContext } from 'react'
import { useNotificationDispatch } from '../NotificationContext'

const testFunction = (param) => {
  const content = param
  const dispatch = useNotificationDispatch()
  console.log('content', content)
}


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
    }
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length < 5) {
      alert('too short anecdote, must have length 6 or more')
      event.target.anecdote.value = ''
      return false
    }
    else { 
      newAnecdoteMutation.mutate({ content, votes: 0 })
      event.target.anecdote.value = ''
      return true
    }
  }

  const dispatch = useNotificationDispatch()

  return (
    <div>
      <form name="anecdoteForm" onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit" onClick={() => {dispatch( { type: "show", payload: `new anecdote '${ event.target.form.anecdote.value }' added` } )
           setTimeout(() => { dispatch( { type: "clear", payload: "" } ) }, 5000)
          }}>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
