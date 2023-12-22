const { projects, clients } = require("../sampleData.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//ClientType
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => clients.find((c) => c.id === parent.clientId),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>
        clients.find((client) => client.id === args.id),
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => clients,
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) =>
        projects.find((project) => project.id === args.id),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => projects,
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
