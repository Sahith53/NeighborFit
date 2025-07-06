import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccount: 'Create Account',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      errors: {
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
        passwordMismatch: 'Passwords do not match',
        passwordTooShort: 'Password must be at least 8 characters',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required'
      }
    },
    es: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      createAccount: 'Crear Cuenta',
      passwordStrength: 'Fuerza de Contraseña',
      weak: 'Débil',
      fair: 'Regular',
      good: 'Buena',
      strong: 'Fuerte',
      errors: {
        required: 'Este campo es obligatorio',
        invalidEmail: 'Por favor ingrese un email válido',
        passwordMismatch: 'Las contraseñas no coinciden',
        passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
        firstNameRequired: 'El nombre es obligatorio',
        lastNameRequired: 'El apellido es obligatorio'
      }
    },
    fr: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse Email',
      password: 'Mot de Passe',
      confirmPassword: 'Confirmer le Mot de Passe',
      createAccount: 'Créer un Compte',
      passwordStrength: 'Force du Mot de Passe',
      weak: 'Faible',
      fair: 'Correct',
      good: 'Bon',
      strong: 'Fort',
      errors: {
        required: 'Ce champ est obligatoire',
        invalidEmail: 'Veuillez saisir une adresse email valide',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
        firstNameRequired: 'Le prénom est obligatoire',
        lastNameRequired: 'Le nom est obligatoire'
      }
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return t.weak;
      case 2:
        return t.fair;
      case 3:
        return t.good;
      case 4:
      case 5:
        return t.strong;
      default:
        return t.weak;
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-error';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-accent';
      case 4:
      case 5:
        return 'bg-success';
      default:
        return 'bg-error';
    }
  };

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

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t.errors.firstNameRequired;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t.errors.lastNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errors.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.errors.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = t.errors.required;
    } else if (formData.password.length < 8) {
      newErrors.password = t.errors.passwordTooShort;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.required;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="firstName"
            placeholder={t.firstName}
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            placeholder={t.lastName}
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder={t.email}
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t.password}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">{t.passwordStrength}:</span>
              <span className="font-medium">{getPasswordStrengthText(passwordStrength)}</span>
            </div>
            <div className="mt-1 w-full bg-border rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-error">{errors.password}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder={t.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-6"
        loading={isLoading}
        disabled={isLoading}
      >
        {t.createAccount}
      </Button>
    </form>
  );
};

export default RegistrationForm;