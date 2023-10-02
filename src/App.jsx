//npm install @tanstack/react-query


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import VoteForm from './components/VoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
    //refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  var anecdotes = [
    {
      "content": '',
      "id": '',
      "votes": ''
    },
  ]

  anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>    
      <Notification />
      <h3>create new</h3>
      <p></p>
     <AnecdoteForm />
      <p></p>
      <VoteForm anecdotes={anecdotes} />
    </div>
  )
}

export default App