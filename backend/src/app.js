const express = require('express');
class App {
    constructor(expressApp) {
      this.app = expressApp;
      this.apiVersion = '/api/v1';
    }

    initializeMiddleware() {
        const cors = require('cors');
        const helmet = require('helmet');
        const morgan = require('morgan');
    
        // Security middleware - protects against common vulnerabilities
        this.app.use(helmet());
    
        // CORS middleware - allows frontend to connect to backend
        this.app.use(cors({
          origin: process.env.FRONTEND_URL || 'http://localhost:5173',
          credentials: true
        }));
    
        // Request logging middleware - logs all HTTP requests
        this.app.use(morgan('combined'));
    
        // Body parsing middleware - parses JSON and URL-encoded data
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true }));
    
        console.log('✅ Middleware initialized');
      }
    
      // Initialize all API routes
      initializeRoutes() {
        const authRoutes = require('./routes/authRoutes');
        const userRoutes = require('./routes/userRoutes');
          // Health check endpoint - useful for deployment monitoring
          this.app.get('/health', (req, res) => {
          res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
          });
        });
    
        // API routes will be added here
        this.app.use(`${this.apiVersion}`, authRoutes);
        this.app.use(`${this.apiVersion}`, userRoutes);
        // this.app.use(`${this.apiVersion}/users`, userRoutes);
        // this.app.use(`${this.apiVersion}/neighborhoods`, neighborhoodRoutes);
    
        console.log('✅ Routes initialized');
      }
    
      // Initialize error handling middleware
      initializeErrorHandling() {
        // 404 handler - catches all undefined routes
        this.app.use((req, res, next) => {
            console.log('🔴 Global Error Handler:', error);
          res.status(error.statusCode || 500).json({
            error: error.message || 'Internal Server Error',
            // message: `Cannot ${req.method} ${req.originalUrl}`,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
          });
        });
    
        // Global error handler - catches all application errors
        this.app.use((req, res, next) => {
            res.status(404).json({
              error: 'Route not found',
              message: `Cannot ${req.method} ${req.originalUrl}`,
              timestamp: new Date().toISOString()
            });
          });
    
        console.log('✅ Error handling initialized');
      }
    }
    
    module.exports = App;