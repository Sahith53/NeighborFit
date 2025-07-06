import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import BiometricAuth from './components/BiometricAuth';
import WelcomeSection from './components/WelcomeSection';

const UserLogin = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translations = {
    en: {
      signInToAccount: 'Sign in to your account',
      dontHaveAccount: "Don\'t have an account?",
      signUp: 'Sign up',
      loginSuccess: 'Login successful! Redirecting...',
      loginError: 'Login failed. Please check your credentials.'
    },
    es: {
      signInToAccount: 'Inicia sesión en tu cuenta',
      dontHaveAccount: '¿No tienes una cuenta?',
      signUp: 'Regístrate',
      loginSuccess: '¡Inicio de sesión exitoso! Redirigiendo...',
      loginError: 'Error de inicio de sesión. Verifica tus credenciales.'
    },
    fr: {
      signInToAccount: 'Connectez-vous à votre compte',
      dontHaveAccount: "Vous n\'avez pas de compte?",
      signUp: "S\'inscrire",
      loginSuccess: 'Connexion réussie! Redirection...',
      loginError: 'Échec de la connexion. Vérifiez vos identifiants.'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  // Mock credentials for testing
  const mockCredentials = {
    email: 'user@neighborfit.com',
    password: 'password123'
  };

  const handleLogin = async (formData, rememberMe) => {
    setIsLoading(true);
    setError('');

    try {
      // Mock authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Mock successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Show success message briefly
        setError('');
        setTimeout(() => {
          navigate('/neighborhood-discovery');
        }, 500);
      } else {
        setError(t.loginError);
      }
    } catch (err) {
      setError(t.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Mock social login delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('loginProvider', provider);

      setTimeout(() => {
        navigate('/neighborhood-discovery');
      }, 500);
    } catch (err) {
      setError(t.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async (result) => {
    setIsLoading(true);
    setError('');

    try {
      if (result.success) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('loginMethod', 'biometric');

        setTimeout(() => {
          navigate('/neighborhood-discovery');
        }, 500);
      }
    } catch (err) {
      setError(t.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 min-h-screen lg:grid lg:grid-cols-2">
        {/* Welcome Section - Desktop Only */}
        <div className="hidden lg:block bg-muted/30">
          <WelcomeSection />
        </div>

        {/* Login Form Section */}
        <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                {t.signInToAccount}
              </h2>
              <p className="text-sm text-text-secondary">
                {t.dontHaveAccount}{' '}
                <Link
                  to="/user-registration"
                  className="font-medium text-primary hover:text-primary/80 transition-smooth"
                >
                  {t.signUp}
                </Link>
              </p>
            </div>

            <div className="bg-surface rounded-lg shadow-elevation-2 p-6 sm:p-8">
              {/* Social Login Buttons */}
              <SocialLoginButtons
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />

              {/* Login Form */}
              <LoginForm
                onLogin={handleLogin}
                isLoading={isLoading}
                error={error}
              />

              {/* Biometric Authentication */}
              <BiometricAuth
                onBiometricLogin={handleBiometricLogin}
                isLoading={isLoading}
              />
            </div>

            {/* Mock Credentials Info */}
            <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
              <p className="text-xs text-info font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-text-secondary">
                Email: {mockCredentials.email}<br />
                Password: {mockCredentials.password}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;