import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'


import { useContext } from 'react'
import { useNotificationDispatch } from '../NotificationContext'


const VoteForm = ( {anecdotes} ) => {

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

  const handleVote = (anecdote) => {
    const changedAnec = { ...anecdote, votes: anecdote.votes+1 }
    updateAnecdoteMutation.mutate(changedAnec)
  }


  const dispatch = useNotificationDispatch()

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}&nbsp;
            <button onClick={() => {handleVote(anecdote); dispatch( { type: "show", payload: `anecdote '${anecdote.content}' voted` } )
           setTimeout(() => { dispatch( { type: "clear", payload: "" } ) }, 5000)
          }}>vote</button>
           <p></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoteForm
