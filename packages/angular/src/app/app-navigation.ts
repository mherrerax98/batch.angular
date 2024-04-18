
export const navigation = [
  {
    text: 'Ordenes De Producción',
    icon: 'detailslayout',
    path: '/order-list',
  },
  {
    text: 'Ruta De Producción',
    icon: 'runner',
    path: '/ruta-prod'
  },
  {
    text: 'Batch Record',
    icon: 'event',
    path: '',
    items: [
      {
        text: 'Portada',
        path: '/portada'
      },
      {
        text: 'Despeje Inicial',
        path: '/despeje-linea',
      },
      {
        text: 'Despeje Final',
        path: '/despeje-final',
      },
      {
        text: 'Impresion de Rotulo',
        path: '/impresion-rotulo',
      },
      {
        text: 'Transacción de Recursos',
        path: '/asignacion-recursos-page',
      },
      {
        text: 'Instructivo de Fabrica',
        path: '/instructivo-fab',
      },
      {
        text: 'Controles en Proceso',
        path: '/controles-en-proceso'
      },
      {
        text: 'I.Producto Terminado',
        path: 'inspeccion-producto-terminado',
      },
      {
        text: 'Certificado de Calidad',
        path: 'certificado-calidad-page',
      },
    ],
  },
  {
    text: 'Definiciones',
    icon: 'preferences',
    path: '',
    items: [
      {
        text: 'Configuracion del Sistema',
        path: ''
      },
      {
        text: 'Despeje de Linea',
        path: 'definicion-despeje-linea'
      }
    ]
  }
  /*
  {
    text: 'CRM',
    icon: 'user',
    path: '',
    items: [
      {
        text: 'Contact List',
        path: '/crm-contact-list',
      },
      {
        text: 'Contact Details',
        path: '/crm-contact-details',
      },
    ],
  },
  {
    text: 'Planning',
    icon: 'event',
    path: '',
    items: [
      {
        text: 'Task List',
        path: '/planning-task-list',
      },
      {
        text: 'Task Details',
        path: '/planning-task-details',
      },
      {
        text: 'Scheduler',
        path: '/planning-scheduler',
      },
    ],
  },
  {
    text: 'Analytics',
    icon: 'chart',
    path: '',
    items: [
      {
        text: 'Dashboard',
        path: '/analytics-dashboard',
      },
      {
        text: 'Sales Report',
        path: '/analytics-sales-report',
      },
      {
        text: 'Geography',
        path: '/analytics-geography',
      },
    ],
  },
  {
    text: 'Authentication',
    icon: 'card',
    path: '',
    items: [
      {
        text: 'Sign In Form',
        path: '/sign-in-form',
      },
      {
        text: 'Sign Up Form',
        path: '/sign-up-form',
      },
      {
        text: 'Reset Password Form',
        path: '/reset-password-form',
      }
    ],
  },
  {
    text: 'Common',
    icon: 'box',
    path: '',
    items: [
      {
        text: 'User Profile',
        path: '/user-profile',
      },
    ]
  }*/,
];
