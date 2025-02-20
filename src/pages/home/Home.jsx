import { Link } from 'react-router-dom'
import ModalExample from '../../components/examples/ModalExample'

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Welcome to Our App!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Get started by logging in below.
        </p>

        <Link
          to="/login"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Home
