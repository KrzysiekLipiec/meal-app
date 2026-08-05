import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: number;
  label: string;
  icon: LucideIcon;
  route: string;
}
