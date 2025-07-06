import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, isLoading, error }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
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
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      invalidEmail: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      invalidCredentials: 'Invalid email or password. Please try again.',
      showPassword: 'Show password',
      hidePassword: 'Hide password'
    },
    es: {
      emailLabel: 'Dirección de Correo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signIn: 'Iniciar Sesión',
      invalidEmail: 'Por favor ingresa una dirección de correo válida',
      passwordRequired: 'La contraseña es requerida',
      invalidCredentials: 'Correo o contraseña inválidos. Inténtalo de nuevo.',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña'
    },
    fr: {
      emailLabel: 'Adresse E-mail',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      passwordLabel: 'Mot de Passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      signIn: 'Se Connecter',
      invalidEmail: 'Veuillez entrer une adresse e-mail valide',
      passwordRequired: 'Le mot de passe est requis',
      invalidCredentials: 'E-mail ou mot de passe invalide. Veuillez réessayer.',
      showPassword: 'Afficher le mot de passe',
      hidePassword: 'Masquer le mot de passe'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = {};
    
    if (!formData.email) {
      errors.email = t.invalidEmail;
    } else if (!validateEmail(formData.email)) {
      errors.email = t.invalidEmail;
    }
    
    if (!formData.password) {
      errors.password = t.passwordRequired;
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    onLogin(formData, rememberMe);
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error font-medium">{t.invalidCredentials}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            {t.emailLabel}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.emailPlaceholder}
            required
            className={validationErrors.email ? 'border-error' : ''}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-error">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            {t.passwordLabel}
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t.passwordPlaceholder}
              required
              className={`pr-10 ${validationErrors.password ? 'border-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              title={showPassword ? t.hidePassword : t.showPassword}
            >
              <Icon 
                name={showPassword ? 'EyeOff' : 'Eye'} 
                size={20} 
                className="text-text-secondary hover:text-text-primary transition-smooth"
              />
            </button>
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-error">{validationErrors.password}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
          />
          <span className="ml-2 text-sm text-text-secondary">{t.rememberMe}</span>
        </label>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          {t.forgotPassword}
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="py-3"
      >
        {t.signIn}
      </Button>
    </form>
  );
};

export default LoginForm;