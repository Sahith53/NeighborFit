import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePhotoUpload = ({ currentLanguage, onPhotoChange, initialPhoto = null }) => {
  const [photo, setPhoto] = useState(initialPhoto);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const translations = {
    en: {
      uploadPhoto: 'Upload Profile Photo',
      dragDrop: 'Drag & drop your photo here',
      orClick: 'or click to browse',
      changePhoto: 'Change Photo',
      removePhoto: 'Remove Photo',
      photoTip: 'A clear photo helps neighbors recognize you'
    },
    es: {
      uploadPhoto: 'Subir Foto de Perfil',
      dragDrop: 'Arrastra y suelta tu foto aquí',
      orClick: 'o haz clic para explorar',
      changePhoto: 'Cambiar Foto',
      removePhoto: 'Eliminar Foto',
      photoTip: 'Una foto clara ayuda a los vecinos a reconocerte'
    },
    fr: {
      uploadPhoto: 'Télécharger Photo de Profil',
      dragDrop: 'Glissez-déposez votre photo ici',
      orClick: 'ou cliquez pour parcourir',
      changePhoto: 'Changer la Photo',
      removePhoto: 'Supprimer la Photo',
      photoTip: 'Une photo claire aide les voisins à vous reconnaître'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target.result;
        setPhoto(photoUrl);
        onPhotoChange(photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        {t.uploadPhoto}
      </h3>
      
      {photo ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              iconName="Camera"
              iconPosition="left"
            >
              {t.changePhoto}
            </Button>
            <Button
              variant="ghost"
              onClick={handleRemovePhoto}
              iconName="Trash2"
              iconPosition="left"
            >
              {t.removePhoto}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-smooth cursor-pointer ${
            isDragging
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary hover:bg-muted'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Camera" size={24} color="var(--color-text-secondary)" />
            </div>
            
            <div className="space-y-2">
              <p className="text-text-primary font-medium">
                {t.dragDrop}
              </p>
              <p className="text-text-secondary text-sm">
                {t.orClick}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-text-secondary text-sm mt-3 text-center">
        {t.photoTip}
      </p>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoUpload;