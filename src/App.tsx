import { useRoutes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import routes from '@/router/index'

function App() {
  const Router = useRoutes(routes)

  return (
    <Provider store={store}>
      <div className="App">
        {Router}
      </div>
    </Provider>

  )
}

export default App
