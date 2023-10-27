
export const useAuthenticated = () => {
  const token = localStorage.getItem('token')
  return {
    token,
  }
}
