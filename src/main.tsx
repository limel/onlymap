import React from 'react'
import ReactDOM from 'react-dom/client'

const App = React.lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
