export const setupRelationships = (models) => {
    const { User, Project, Task } = models;

    // User <-> Project (many to many)
    User.belongsToMany(Project, { through: 'UserProjects'});
    Project.belongsToMany(User, { through: 'UserProjects'});

    // Project -> Task (one to many)
    Project.hasMany(Task, { foreignKey: "projectId" });
    Task.belongsTo(Project, { foreignKey: "projectId" });

    // User -> Task (One to many, for task assignment)
    Task.belongsTo(User, { as : 'assignee', foreignKey: 'assignedTo'});

    // User -> Project (One to many , for project ownership)
    Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId'})

}