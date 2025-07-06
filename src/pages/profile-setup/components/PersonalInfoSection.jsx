import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoSection = ({ currentLanguage, formData, onFormChange }) => {
  const translations = {
    en: {
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      age: 'Age',
      occupation: 'Occupation',
      bio: 'Bio',
      bioPlaceholder: 'Tell your neighbors about yourself...',
      required: 'Required'
    },
    es: {
      personalInfo: 'Información Personal',
      firstName: 'Nombre',
      lastName: 'Apellido',
      age: 'Edad',
      occupation: 'Ocupación',
      bio: 'Biografía',
      bioPlaceholder: 'Cuéntales a tus vecinos sobre ti...',
      required: 'Requerido'
    },
    fr: {
      personalInfo: 'Informations Personnelles',
      firstName: 'Prénom',
      lastName: 'Nom',
      age: 'Âge',
      occupation: 'Profession',
      bio: 'Biographie',
      bioPlaceholder: 'Parlez de vous à vos voisins...',
      required: 'Requis'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        {t.personalInfo}
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.firstName} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={t.firstName}
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.lastName} <span className="text-error">*</span>
            </label>
            <Input
              type="text"
              placeholder={t.lastName}
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.age} <span className="text-error">*</span>
            </label>
            <Input
              type="number"
              placeholder="25"
              min="18"
              max="100"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {t.occupation}
            </label>
            <Input
              type="text"
              placeholder={t.occupation}
              value={formData.occupation || ''}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {t.bio}
          </label>
          <textarea
            placeholder={t.bioPlaceholder}
            value={formData.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;