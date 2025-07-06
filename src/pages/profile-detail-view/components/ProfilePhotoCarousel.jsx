import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoCarousel = ({ photos, userName, isVerified }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full h-80 md:h-96 bg-muted rounded-lg overflow-hidden">
      <Image
        src={photos[currentPhotoIndex]}
        alt={`${userName} - Photo ${currentPhotoIndex + 1}`}
        className="w-full h-full object-cover"
      />
      
      {/* Verification Badge */}
      {isVerified && (
        <div className="absolute top-4 right-4 bg-success text-success-foreground px-2 py-1 rounded-full flex items-center space-x-1">
          <Icon name="CheckCircle" size={16} />
          <span className="text-xs font-medium">Verified</span>
        </div>
      )}

      {/* Navigation Arrows */}
      {photos.length > 1 && (
        <>
          <Button
            variant="ghost"
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10 rounded-full p-0"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10 rounded-full p-0"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </>
      )}

      {/* Photo Indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoCarousel;