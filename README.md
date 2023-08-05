# SIEM GraphQL-based Project (TypeScript)

Welcome to the SIEM (Security Information and Event Management) GraphQL-based project! This project is designed to provide a powerful and flexible security monitoring solution by leveraging the capabilities of GraphQL and TypeScript. The SIEM system collects, analyzes, and correlates security events from various sources, helping you gain insights into potential security threats and vulnerabilities.

## Features

- GraphQL API for querying and managing security events.
- Real-time event monitoring and alerting.
- Integration with various data sources and security tools.
- User authentication and authorization.
- Role-based access control (RBAC) for enhanced security.
- Customizable dashboards and visualizations.
- Rule-based event correlation for identifying complex attack patterns.
- Extensible architecture to support future enhancements.

## Technologies

The SIEM project is built using the following technologies:

- **GraphQL**: Provides a powerful and efficient API for querying and managing data.
- **TypeScript**: Ensures type safety and scalability for the project.
- **Node.js**: Server-side JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **TypeORM**: TypeScript-based ORM (Object-Relational Mapping) library for database interaction.
- **PostgreSQL**: Relational database for storing security event data.
- **WebSocket**: Enables real-time event monitoring and alerting.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Docker**: Containerization for easy deployment and scalability.

## Getting Started

To get started with the SIEM project, follow these steps:

- Clone the repository: `git clone https://github.com/BaseMax/SIEMGraphQLTS.git`
- Navigate to the project directory: `cd SIEMGraphQLTS`
- Install dependencies: `npm install`
- Set up the database: Ensure PostgreSQL is installed and create a new database for the project. Update the database configuration in `ormconfig.json`.
- Build the project: `npm run build`
- Run database migrations: `npm run migrations`
- Start the server: `npm start`
- The SIEM GraphQL server should now be up and running on `http://localhost:3000`.

## Usage

Once the server is running, you can interact with the SIEM system using GraphQL queries and mutations. Refer to the API documentation or explore the GraphQL playground (usually available at http://localhost:3000/graphql) to understand the available queries and mutations.

Here's a simple example of a GraphQL query:

```graphql
query {
  events {
    id
    timestamp
    sourceIP
    destinationIP
    eventType
    severity
  }
}
```

Remember to authenticate and authorize your GraphQL requests using JWT tokens when required.

## GraphQL

### Queries:

- Get a list of all security events.
- Get a specific security event by ID.
- Get the total count of security events.
- Get security events within a specified time range.
- Get security events by source IP address.
- Get security events by destination IP address.
- Get security events by event type (e.g., login, intrusion attempt).
- Get security events by severity (e.g., low, medium, high).
- Get security events sorted by timestamp in ascending order.
- Get security events sorted by severity in descending order.
- Get security events associated with a specific user.
- Get security events from a specific data source (e.g., firewall, antivirus).
- Get security events that match a specific keyword or pattern.
- Get the top N most frequent security events.
- Get the count of security events grouped by event type.
- Get the count of security events grouped by severity.
- Get the count of security events per data source.
- Get the count of security events per user.
- Get the count of security events per IP address.
- Get the count of security events per hour.

### Mutations:

- Create a new security event with specified attributes.
- Update the details of an existing security event.
- Delete a security event by ID.
- Add a new data source to the SIEM system.
- Update the settings of a data source.
- Remove a data source from the SIEM system.
- Create a new user account with authentication credentials.
- Update the details of an existing user account.
- Delete a user account by ID.
- Change the password for a user account.
- Assign a role to a user (e.g., admin, analyst, auditor).
- Revoke a role from a user.
- Add a new security rule for event correlation.
- Update the settings of an existing security rule.
- Remove a security rule from the SIEM system.
- Enable or disable real-time event monitoring.
- Subscribe to real-time security event notifications.
- Unsubscribe from real-time security event notifications.
- Acknowledge an alert for a security event.
- Dismiss an alert for a security event.

## Contributing

Contributions to the SIEM project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Please ensure that you follow the project's coding standards and guidelines.

## License

The SIEM GraphQL-based project is open-source and available under the GPL-3.0 License. Feel free to use, modify, and distribute it as per the terms of the license.

Copyright 2023, Max Base
