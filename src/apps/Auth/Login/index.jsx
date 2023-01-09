import React from 'react'
import { Button, TextField, } from "@mui/material"
import { useForm } from "react-hook-form"
import './Auth.css'
import { FormValidation } from './../../../components/Form/FormValidation/exports';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs';
import { Loader } from '../../../components/Loader/Loader';

const Auth = () => {


  const [email, setEmail] = React.useState()
  const [password, setPassword] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState('')

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()



  const signIn = async (data) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, data.login, data.password)
    }
    catch (e) {
      setErr(e.code)
    }
    finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <>
      <div className='auth-container'>
        <div className='auth-card'>
          {
            loading
              ? (<Loader height={'0'} />)
              : <h2>{!err ? 'Авторизация' : err}</h2>
          }
          <form onSubmit={handleSubmit(data => signIn(data))} className='form'>
            <TextField
              error={errors?.login && true}
              type="email"
              label={'e-mail*'}
              variant="outlined"
              value={email}
              // onChange={e => setEmail(e.target.value)}
              helperText={errors?.login?.message}
              {...register('login',
                {
                  required: FormValidation.RequiredInput.required
                })
              }
            />
            <TextField
              error={errors?.password && true}
              type="password"
              label="password"
              variant="outlined"
              value={password}
              // onChange={e => setPassword(e.target.value)}
              helperText={errors?.password?.message}
              {...register('password',
                {
                  required: FormValidation.RequiredInput.required,
                  minLength: FormValidation.minLengthValidation
                })
              }
            />
            <Button variant="contained" type='submit'>
              Войти
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth