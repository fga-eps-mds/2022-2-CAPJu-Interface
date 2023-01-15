import toast from 'react-hot-toast';

export default function systemError(error, errorMessage) {
  if (error.response.status == 401) {
    toast(error.response.data.message, {
      icon: '⚠️',
      duration: 3000
    });
  } else {
    toast.error(errorMessage);
  }
}
