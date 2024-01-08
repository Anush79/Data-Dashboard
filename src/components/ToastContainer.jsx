
import toast,{ Toaster } from 'react-hot-toast';

export default function ToastContain (){
  return     <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 1500,
    style: {
      background: '#fff',
      color: '#111',
      border:'3px solid '
    },

    // Default options for specific types
    success: {
      duration: 1300,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
}