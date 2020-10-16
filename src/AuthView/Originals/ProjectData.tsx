import IAccountData from '../interfaces/IAccountData';
import { IProjectWithSortedTasks } from './IProjectWithSortedTasks';
export class ProjectData {
  constructor (private accountData: IAccountData) {}

  /*
    Reorganizes task data by project
    
    Removes empty projects
  */
  public organizeAndFilter() {
    const projectsFormatted: IProjectWithSortedTasks[] = this.formatProjects();

    const projectsWithMatchingTasks: IProjectWithSortedTasks[] = projectsFormatted
      .map((formattedProject: IProjectWithSortedTasks) => this.loadAllMatchingTasks(formattedProject));

    const nonemptyProjects = projectsWithMatchingTasks.filter((project: IProjectWithSortedTasks) => project.tasks.length > 0);
    
    return nonemptyProjects;
  }

  // ---------- internal methods

  private formatProjects(): IProjectWithSortedTasks[] {
    const formatted = this.accountData.projectCompacts.map(projectCompact => {
      const { gid, name } = projectCompact;
      return { gid, name, tasks: [] };
    });

    return formatted;
  }

  private loadAllMatchingTasks(formattedProject: IProjectWithSortedTasks): IProjectWithSortedTasks {
    this.accountData.tasksEnhanced.forEach(task => {
      const taskProjectGid = task.projects[0].gid;

      if (formattedProject.gid === taskProjectGid) {
        const { gid, name, due_on, notes, tags } = task;

        formattedProject.tasks.push({ gid, name, due_on, notes, tags });
      }
    });

    const formattedProjectWithFilledTaskArray = formattedProject;
    return formattedProjectWithFilledTaskArray;
  }


}
