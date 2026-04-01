export type QuestionType = 'textarea' | 'single_select';

export type RoleQuestion = {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
};

export type RoleConfig = {
  id: string;
  title: string;
  department: 'FOH' | 'BOH';
  shortSummary: string;
  wageRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  expectations: string[];
  screeningQuestions: RoleQuestion[];
};

export const cultureFitQuestions: RoleQuestion[] = [
  {
    id: 'culture_teamwork',
    label: 'Describe how you support teammates during busy shifts.',
    type: 'textarea',
    required: true,
  },
  {
    id: 'culture_feedback',
    label: 'How do you respond to coaching and feedback?',
    type: 'single_select',
    required: true,
    options: ['I welcome feedback and apply it quickly', 'I need time but I adapt', 'I prefer independent work'],
  },
];

export const rolesConfig: RoleConfig[] = [
  {
    id: 'line-cook',
    title: 'Line Cook',
    department: 'BOH',
    shortSummary: 'Execute high-volume prep and line work with speed, consistency, and safety.',
    wageRange: '$22-$28/hr',
    description: 'Work the hot line and prep stations while maintaining quality standards and ticket times.',
    responsibilities: ['Prep and station setup', 'Cook to recipe standards', 'Maintain sanitation and FIFO practices'],
    requirements: ['1+ years kitchen experience', 'Comfortable in fast-paced service', 'Food safety awareness'],
    expectations: ['40-60 hours/week availability', 'Reliable attendance', 'Professional communication'],
    screeningQuestions: [
      {
        id: 'line_cook_volume',
        label: 'What is the busiest service volume you have handled?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'line_cook_station',
        label: 'Which station are you strongest on?',
        type: 'single_select',
        required: true,
        options: ['Grill', 'Saute', 'Fryer', 'Expo'],
      },
    ],
  },
  {
    id: 'server',
    title: 'Server',
    department: 'FOH',
    shortSummary: 'Deliver hospitality-first guest experiences and drive strong check averages.',
    wageRange: '$18-$35/hr (incl. tips)',
    description: 'Own the guest experience from greeting to closeout while coordinating with support staff.',
    responsibilities: ['Table service and menu guidance', 'POS accuracy', 'Team communication with BOH/FOH'],
    requirements: ['Customer-facing experience', 'Professional demeanor', 'Strong multitasking skills'],
    expectations: ['40-60 hours/week availability', 'Nights/weekends flexibility', 'Friendly, upbeat attitude'],
    screeningQuestions: [
      {
        id: 'server_conflict',
        label: 'How do you recover a table after a service mistake?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'server_sales',
        label: 'How comfortable are you with upselling?',
        type: 'single_select',
        required: true,
        options: ['Very comfortable', 'Somewhat comfortable', 'Need coaching'],
      },
    ],
  },
  {
    id: 'dishwasher',
    title: 'Dishwasher / Utility',
    department: 'BOH',
    shortSummary: 'Keep the kitchen running by maintaining clean wares and sanitized prep areas.',
    wageRange: '$17-$21/hr',
    description: 'Run dish pit operations, assist with cleaning tasks, and support prep flow as needed.',
    responsibilities: ['Wash and sanitize wares', 'Trash/cardboard breakdown', 'Support prep as assigned'],
    requirements: ['Able to lift 40 lbs', 'Dependable and punctual', 'Safety-first mindset'],
    expectations: ['40-60 hours/week availability', 'Team-first attitude', 'Night shift flexibility'],
    screeningQuestions: [
      {
        id: 'dishwasher_shift',
        label: 'Which shift are you most available for?',
        type: 'single_select',
        required: true,
        options: ['Morning', 'Afternoon', 'Evening', 'Any shift'],
      },
      {
        id: 'dishwasher_safety',
        label: 'How do you prioritize safety in wet/high-traffic areas?',
        type: 'textarea',
        required: true,
      },
    ],
  },
];
