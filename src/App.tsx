import { Provider } from 'react-redux'
import { store } from '@/store'
// import { AuthRouter } from '@/components/AuthRouter'
import RouterElement from '@/router'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <AuthRouter>
          <RouterElement></RouterElement>
        </AuthRouter> */}
        <RouterElement />
      </div>
    </Provider>
  )
}

export default App
