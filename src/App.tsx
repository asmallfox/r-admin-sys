import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthRouter } from '@/components/AuthRouter'
import GetRouter from './router/getRouter'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AuthRouter>
          <GetRouter></GetRouter>
        </AuthRouter>
      </div>
    </Provider>
  )
}

export default App
