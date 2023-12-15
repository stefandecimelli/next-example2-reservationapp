import React, { ChangeEvent } from 'react'

interface Props {
  inputs: {
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
    password: string
  },
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void,
  isSignIn: boolean
}

export default function AuthModelInputs({ inputs, handleChangeInput, isSignIn }: Props) {
  const renderContent = (signInContent: string, signUpContent: string) => {
    return true ? signInContent : signUpContent;
  }
  return (
    <div>
      {!isSignIn && <div className="my-3 flex justify-between text-sm">
        <input type="text" className="border rounded p-2 py-3 w-[49%]" name="firstName" placeholder={"First Name"} value={inputs.firstName} onChange={handleChangeInput} />
        <input type="text" className="border rounded p-2 py-3 w-[49%]" name="lastName" placeholder={"Last Name"} value={inputs.lastName} onChange={handleChangeInput} />
      </div>
      }
      <div className="my-3 flex justify-between text-sm">
        <input type="text" className="border rounded p-2 py-3 w-full" placeholder={"Email"} name="email" value={inputs.email} onChange={handleChangeInput} />
      </div>
      {!isSignIn && <div className="my-3 flex justify-between text-sm">
        <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder={"Phone"} name="phone" value={inputs.phone} onChange={handleChangeInput} />
        <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder={"City"} name="city" value={inputs.city} onChange={handleChangeInput} />
      </div>
      }
      <div className="my-3 flex justify-between text-sm">
        <input type="text" className="border rounded p-2 py-3 w-full" placeholder={"Password"} name="password" value={inputs.password} onChange={handleChangeInput} />
      </div>
    </div>
  )
}
