import { JobPost } from '../components/cards/JobCard';

export const mockJobPosts: JobPost[] = [
  {
    id: 'job-1',
    title: 'Développeur Full Stack Senior',
    description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe technique. Vous serez responsable du développement d\'applications web modernes utilisant React, Node.js et des bases de données NoSQL.',
    requirements: [
      'Maîtrise de JavaScript/TypeScript',
      'Expérience avec React et Node.js',
      'Connaissance des bases de données MongoDB/PostgreSQL',
      'Expérience en déploiement cloud (AWS/Azure)',
      'Méthodologies Agile/Scrum'
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Git'],
    experience: '5+ ans d\'expérience',
    location: 'Dakar / Remote',
    contractType: 'CDI',
    salary: '55-70 XOF'
  },
  {
    id: 'job-2',
    title: 'Chef de Projet IT',
    description: 'Pilotez des projets informatiques complexes au sein d\'une équipe dynamique. Vous coordonnerez les équipes techniques, gérerez les budgets et assurerez la livraison dans les délais.',
    requirements: [
      'Formation supérieure en informatique ou gestion de projet',
      'Certification PMP ou équivalent',
      'Maîtrise des outils de gestion de projet',
      'Expérience en management d\'équipe',
      'Excellentes capacités de communication'
    ],
    skills: ['Gestion de projet', 'Agile', 'Scrum', 'JIRA', 'Management', 'Budget'],
    experience: '7+ ans d\'expérience',
    location: 'Dakar',
    contractType: 'CDI',
    salary: '60-75 XOF'
  },
  {
    id: 'job-3',
    title: 'Designer UX/UI',
    description: 'Créez des expériences utilisateur exceptionnelles pour nos applications web et mobiles. Vous travaillerez en étroite collaboration avec les équipes produit et développement.',
    requirements: [
      'Portfolio démontrant une expertise en UX/UI',
      'Maîtrise des outils de design (Figma, Adobe Suite)',
      'Connaissance du design thinking',
      'Expérience en recherche utilisateur',
      'Sensibilité aux tendances design'
    ],
    skills: ['Figma', 'Adobe Creative Suite', 'Prototypage', 'Design System', 'User Research'],
    experience: '3-5 ans d\'expérience',
    location: 'Dakar',
    contractType: 'CDI',
    salary: '45-55 XOF'
  },
  {
    id: 'job-4',
    title: 'Ingénieur DevOps',
    description: 'Optimisez notre infrastructure cloud et automatisez nos processus de déploiement. Vous serez responsable de la mise en place des pipelines CI/CD et de la monitoring des applications.',
    requirements: [
      'Expérience avec les plateformes cloud (AWS, Azure, GCP)',
      'Maîtrise des outils de containerisation (Docker, Kubernetes)',
      'Connaissance des outils CI/CD (Jenkins, GitLab CI)',
      'Scripting (Bash, Python)',
      'Monitoring et observabilité'
    ],
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python', 'Monitoring'],
    experience: '4-6 ans d\'expérience',
    location: 'Dakar / Hybride',
    contractType: 'CDI',
    salary: '50-65 XOF'
  },
  {
    id: 'job-5',
    title: 'Analyste Cybersécurité',
    description: 'Protégez notre infrastructure et nos données contre les menaces cybernétiques. Vous analyserez les incidents de sécurité et implémenterez les meilleures pratiques de sécurité.',
    requirements: [
      'Certification en cybersécurité (CISSP, CEH, CISAP)',
      'Connaissance des frameworks de sécurité (ISO 27001, NIST)',
      'Expérience en analyse forensique',
      'Maîtrise des outils de sécurité (SIEM, IDS/IPS)',
      'Veille technologique en cybersécurité'
    ],
    skills: ['Cybersécurité', 'SIEM', 'Forensique', 'Penetration Testing', 'Risk Assessment'],
    experience: '3-5 ans d\'expérience',
    location: 'Dakar',
    contractType: 'CDI',
    salary: '48-62k XOF'
  },
  {
    id: 'job-6',
    title: 'Data Scientist',
    description: 'Exploitez nos données pour générer des insights business et développer des modèles prédictifs. Vous travaillerez sur des projets d\'intelligence artificielle et de machine learning.',
    requirements: [
      'Formation en mathématiques, statistiques ou informatique',
      'Maîtrise de Python/R et des bibliothèques ML',
      'Expérience avec les bases de données big data',
      'Connaissance des algorithmes de ML/DL',
      'Capacité à présenter des résultats complexes'
    ],
    skills: ['Python', 'R', 'TensorFlow', 'Pandas', 'SQL', 'Machine Learning', 'Statistics'],
    experience: '2-4 ans d\'expérience',
    location: 'Dakar',
    contractType: 'CDI',
    salary: '45-60k XOF'
  }
]; 