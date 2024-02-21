import './App.css'
import { Quiz } from './components/Quiz'
import QuizProvider from './providers/QuizProvider'

function App() {

  return (
    <>
      <QuizProvider>
          <Quiz />
      </QuizProvider>
    </>
  )
}

export default App
