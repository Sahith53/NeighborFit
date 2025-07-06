import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MessagingPreview = ({ messages, profileName }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
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
      previousConversation: 'Previous Conversation',
      viewFullConversation: 'View Full Conversation',
      startConversation: 'Start Conversation',
      you: 'You',
      noMessages: 'No previous messages'
    },
    es: {
      previousConversation: 'Conversación Anterior',
      viewFullConversation: 'Ver Conversación Completa',
      startConversation: 'Iniciar Conversación',
      you: 'Tú',
      noMessages: 'No hay mensajes anteriores'
    },
    fr: {
      previousConversation: 'Conversation Précédente',
      viewFullConversation: 'Voir la Conversation Complète',
      startConversation: 'Commencer la Conversation',
      you: 'Vous',
      noMessages: 'Aucun message précédent'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  const handleViewConversation = () => {
    // Navigate to messaging interface (would be implemented)
    console.log('Navigate to messaging interface');
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="bg-surface p-6 rounded-lg border border-border">
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary mb-4">{t.noMessages}</p>
          <Button
            variant="primary"
            onClick={handleViewConversation}
            iconName="MessageCircle"
            iconPosition="left"
          >
            {t.startConversation}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {t.previousConversation}
        </h3>
        <Button
          variant="ghost"
          onClick={handleViewConversation}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-sm"
        >
          {t.viewFullConversation}
        </Button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {messages.slice(-3).map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isFromUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-medium">
                  {message.isFromUser ? t.you : profileName}
                </span>
                <span className="text-xs opacity-70">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {messages.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button
            variant="outline"
            onClick={handleViewConversation}
            className="w-full"
          >
            {t.viewFullConversation}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessagingPreview;