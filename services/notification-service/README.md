notification-service/
├── src/
│   ├── config/
│   │   ├── index.js             
│   │   ├── rabbitmq.js          
│   │   └── mailer.js            
│   │
│   ├── messaging/
│   │   ├── rabbitmq.connection.js
│   │   └── notification.consumer.js 
│   │
│   ├── services/
│   │   ├── email.service.js     
│   │   └── email.templates.js   
│   │
│   ├── utils/
│   │   └── logger.js           
│   │
│   └── server.js                
│
├── .env
├── Dockerfile
└── package.json