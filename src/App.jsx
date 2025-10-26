import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'
function App() {
  return (
    <div className='d-flex vh-100'>
       {/* d-flex sidebyside  vh-100 to occupy full height*/}
       {/* bootstrap clases to alocate width w-25 w-50 w-75 w-100 */}
      <div className='w-20 '><Sidebar /></div>
      <div className='w-50 '><Feed/></div>
      <div className='w-30 '><Suggestions /></div>
    </div>
  )
}

export default App
