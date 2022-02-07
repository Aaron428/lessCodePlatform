import './index.css'

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} type="text" className="shared-input" autoComplete="off" />
}

export default Input
