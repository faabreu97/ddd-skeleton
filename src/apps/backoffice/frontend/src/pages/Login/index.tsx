import { AxiosError } from 'axios';
import { FormEvent, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logo_white from '../../assets/white-logo.png';
import Button from '../../components/Button';
import { Input } from '../../components/Input/Input';
import useDarkModeDetector from '../../hooks/useDarkModeDetector';
import { useLogin } from '../../hooks/user';

export default function Login() {
  const navigate = useNavigate();
  const isDarkMode = useDarkModeDetector();

  const { mutate, isPending, error } = useLogin();

  const errors = useMemo(
    () => error && error instanceof AxiosError && error.response?.data.errors,
    [error]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    mutate(
      {
        email: data.get('email')?.toString().trim() || '',
        password: data.get('password')?.toString() || ''
      },
      {
        onSuccess: () => {
          navigate('/dashboard');
        }
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Admin | Login</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen">
        <div className="surface min-w-[24vw] flex flex-col justify-center items-center rounded-lg p-3">
          <img
            className="w-60"
            src={isDarkMode ? logo_white : logo}
            alt="logo"
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3 mt-5 w-full px-3 "
          >
            <Input label="Email" name="email" error={errors?.['email']} />
            <Input
              label="Password"
              name="password"
              type="password"
              error={errors?.['password']}
            />
            <Button type="submit" loading={isPending}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
