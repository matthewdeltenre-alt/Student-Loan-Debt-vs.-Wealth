export interface Major {
  id: string;
  name: string;
  field: string;
  startingSalary: number;
  midCareerSalary: number;
}

export const MAJORS: Major[] = [
  // Engineering & Computer Science
  { id: 'cs', name: 'Computer Science', field: 'Engineering & Tech', startingSalary: 75000, midCareerSalary: 120000 },
  { id: 'software-eng', name: 'Software Engineering', field: 'Engineering & Tech', startingSalary: 80000, midCareerSalary: 125000 },
  { id: 'computer-eng', name: 'Computer Engineering', field: 'Engineering & Tech', startingSalary: 78000, midCareerSalary: 118000 },
  { id: 'electrical-eng', name: 'Electrical Engineering', field: 'Engineering & Tech', startingSalary: 72000, midCareerSalary: 110000 },
  { id: 'mechanical-eng', name: 'Mechanical Engineering', field: 'Engineering & Tech', startingSalary: 70000, midCareerSalary: 105000 },
  { id: 'civil-eng', name: 'Civil Engineering', field: 'Engineering & Tech', startingSalary: 65000, midCareerSalary: 95000 },
  { id: 'chemical-eng', name: 'Chemical Engineering', field: 'Engineering & Tech', startingSalary: 72000, midCareerSalary: 108000 },
  { id: 'aerospace-eng', name: 'Aerospace Engineering', field: 'Engineering & Tech', startingSalary: 70000, midCareerSalary: 112000 },
  { id: 'industrial-eng', name: 'Industrial Engineering', field: 'Engineering & Tech', startingSalary: 68000, midCareerSalary: 98000 },
  { id: 'biomedical-eng', name: 'Biomedical Engineering', field: 'Engineering & Tech', startingSalary: 65000, midCareerSalary: 97000 },
  { id: 'data-science', name: 'Data Science / Statistics', field: 'Engineering & Tech', startingSalary: 72000, midCareerSalary: 105000 },
  { id: 'cybersecurity', name: 'Cybersecurity', field: 'Engineering & Tech', startingSalary: 70000, midCareerSalary: 102000 },

  // Business & Finance
  { id: 'finance', name: 'Finance', field: 'Business', startingSalary: 58000, midCareerSalary: 95000 },
  { id: 'accounting', name: 'Accounting', field: 'Business', startingSalary: 55000, midCareerSalary: 80000 },
  { id: 'economics', name: 'Economics', field: 'Business', startingSalary: 58000, midCareerSalary: 98000 },
  { id: 'business-admin', name: 'Business Administration', field: 'Business', startingSalary: 48000, midCareerSalary: 72000 },
  { id: 'marketing', name: 'Marketing', field: 'Business', startingSalary: 45000, midCareerSalary: 68000 },
  { id: 'management', name: 'Management', field: 'Business', startingSalary: 48000, midCareerSalary: 75000 },
  { id: 'supply-chain', name: 'Supply Chain / Logistics', field: 'Business', startingSalary: 52000, midCareerSalary: 82000 },
  { id: 'hr', name: 'Human Resources', field: 'Business', startingSalary: 45000, midCareerSalary: 68000 },
  { id: 'real-estate', name: 'Real Estate', field: 'Business', startingSalary: 48000, midCareerSalary: 78000 },
  { id: 'entrepreneurship', name: 'Entrepreneurship', field: 'Business', startingSalary: 42000, midCareerSalary: 85000 },

  // Health & Science
  { id: 'nursing', name: 'Nursing (BSN)', field: 'Health & Science', startingSalary: 65000, midCareerSalary: 82000 },
  { id: 'pharmacy', name: 'Pharmacy (PharmD)', field: 'Health & Science', startingSalary: 110000, midCareerSalary: 125000 },
  { id: 'pa', name: 'Physician Assistant', field: 'Health & Science', startingSalary: 95000, midCareerSalary: 118000 },
  { id: 'physical-therapy', name: 'Physical Therapy (DPT)', field: 'Health & Science', startingSalary: 65000, midCareerSalary: 82000 },
  { id: 'occupational-therapy', name: 'Occupational Therapy', field: 'Health & Science', startingSalary: 62000, midCareerSalary: 80000 },
  { id: 'health-admin', name: 'Health Administration', field: 'Health & Science', startingSalary: 50000, midCareerSalary: 75000 },
  { id: 'biology', name: 'Biology / Pre-Med', field: 'Health & Science', startingSalary: 38000, midCareerSalary: 65000 },
  { id: 'chemistry', name: 'Chemistry', field: 'Health & Science', startingSalary: 48000, midCareerSalary: 78000 },
  { id: 'biochemistry', name: 'Biochemistry', field: 'Health & Science', startingSalary: 45000, midCareerSalary: 72000 },
  { id: 'env-science', name: 'Environmental Science', field: 'Health & Science', startingSalary: 42000, midCareerSalary: 62000 },
  { id: 'physics', name: 'Physics', field: 'Health & Science', startingSalary: 52000, midCareerSalary: 88000 },
  { id: 'math', name: 'Mathematics', field: 'Health & Science', startingSalary: 58000, midCareerSalary: 95000 },

  // Social Sciences & Humanities
  { id: 'psychology', name: 'Psychology', field: 'Social Sciences', startingSalary: 35000, midCareerSalary: 52000 },
  { id: 'political-sci', name: 'Political Science', field: 'Social Sciences', startingSalary: 40000, midCareerSalary: 65000 },
  { id: 'sociology', name: 'Sociology', field: 'Social Sciences', startingSalary: 35000, midCareerSalary: 50000 },
  { id: 'history', name: 'History', field: 'Social Sciences', startingSalary: 36000, midCareerSalary: 52000 },
  { id: 'english', name: 'English / Literature', field: 'Social Sciences', startingSalary: 35000, midCareerSalary: 52000 },
  { id: 'communications', name: 'Communications', field: 'Social Sciences', startingSalary: 38000, midCareerSalary: 58000 },
  { id: 'journalism', name: 'Journalism', field: 'Social Sciences', startingSalary: 36000, midCareerSalary: 52000 },
  { id: 'philosophy', name: 'Philosophy', field: 'Social Sciences', startingSalary: 38000, midCareerSalary: 62000 },
  { id: 'criminal-justice', name: 'Criminal Justice', field: 'Social Sciences', startingSalary: 38000, midCareerSalary: 55000 },
  { id: 'social-work', name: 'Social Work', field: 'Social Sciences', startingSalary: 35000, midCareerSalary: 45000 },
  { id: 'education', name: 'Education / Teaching', field: 'Social Sciences', startingSalary: 38000, midCareerSalary: 52000 },
  { id: 'foreign-languages', name: 'Foreign Languages', field: 'Social Sciences', startingSalary: 38000, midCareerSalary: 55000 },
  { id: 'anthropology', name: 'Anthropology', field: 'Social Sciences', startingSalary: 34000, midCareerSalary: 50000 },

  // Arts & Design
  { id: 'architecture', name: 'Architecture', field: 'Arts & Design', startingSalary: 48000, midCareerSalary: 78000 },
  { id: 'graphic-design', name: 'Graphic Design', field: 'Arts & Design', startingSalary: 40000, midCareerSalary: 58000 },
  { id: 'fine-arts', name: 'Fine Arts', field: 'Arts & Design', startingSalary: 32000, midCareerSalary: 48000 },
  { id: 'film', name: 'Film / Theater', field: 'Arts & Design', startingSalary: 30000, midCareerSalary: 45000 },
  { id: 'music', name: 'Music', field: 'Arts & Design', startingSalary: 30000, midCareerSalary: 45000 },
  { id: 'fashion', name: 'Fashion Design', field: 'Arts & Design', startingSalary: 35000, midCareerSalary: 52000 },
  { id: 'interior-design', name: 'Interior Design', field: 'Arts & Design', startingSalary: 38000, midCareerSalary: 58000 },
];

export const FIELDS = [...new Set(MAJORS.map((m) => m.field))];

export function getMajorById(id: string): Major | undefined {
  return MAJORS.find((m) => m.id === id);
}
