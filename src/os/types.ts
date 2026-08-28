export type AppId =
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'education'
  | 'contact'
  | 'resume'
  | 'readme';

export type WindowState = {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prev?: { x: number; y: number; width: number; height: number };
};
