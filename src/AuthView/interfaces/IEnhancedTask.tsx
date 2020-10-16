import { IProjectConpact } from "./IProjectConpact";

interface IEnhancedTask {
  gid: string;
  name: string;
  notes: string;
  due_on: string | null;
  tags: string[];
  projects: IProjectConpact[];
}
