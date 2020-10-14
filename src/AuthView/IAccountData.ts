export default interface IAccountData {
  projectCompacts: {
    gid: string;
    name: string;
    resource_type: 'project'
  }[],
  tasksEnhanced: {
    gid: string;
    name: string;
    due_on: string;
    notes: string;
    tags: string[];
    projects: {
      gid: string;
      name: string;
    }[];
  }[];
}
