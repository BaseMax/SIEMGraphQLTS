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

## Extra Databases

### MeiliSearch

Using MeiliSearch for storing logs and searching offers several advantages that make it an excellent choice for implementing a SIEM system:

- **Full-Text Search**: MeiliSearch provides fast and accurate full-text search capabilities. In a SIEM system, the ability to quickly search through logs is crucial for identifying security events and potential threats. MeiliSearch's powerful indexing and ranking algorithms ensure that search queries return relevant results efficiently.
- **Real-Time Indexing**: MeiliSearch is designed for real-time indexing and searching. As new logs are generated and stored in the system, MeiliSearch can instantly index them, making them available for searches immediately. This real-time capability is essential in a SIEM system where timely detection and response to security incidents are vital.
- **Scalability**: MeiliSearch is scalable, allowing the SIEM system to handle a large volume of logs effectively. As the amount of log data grows, MeiliSearch can scale horizontally to accommodate the increased load, ensuring the system's performance remains consistent.
- **Easy Integration**: MeiliSearch offers a straightforward API and SDKs for various programming languages, making it easy to integrate with the SIEM system's existing architecture. It simplifies the development process and reduces the effort required to implement the search functionality.
- **Customizable Ranking**: MeiliSearch allows customization of search result ranking. In a SIEM system, certain logs may be more critical than others. MeiliSearch enables the implementation of custom ranking algorithms that prioritize logs based on relevance, severity, or other criteria.
- **Typo-Tolerance and Synonyms**: MeiliSearch includes built-in support for typo-tolerance and synonyms. In a SIEM system, logs may contain typographical errors or variations in keywords. MeiliSearch's ability to handle such variations ensures that search queries are robust and produce accurate results.
- **Filtering and Faceting**: MeiliSearch supports filtering and faceting, allowing users to narrow down search results based on specific attributes or categories. This feature is valuable in a SIEM system to analyze logs by various criteria, such as source IP, destination IP, event type, severity, etc.
- **Open-Source and Community-Driven**: MeiliSearch is open-source software, with an active community of contributors and users. It benefits from continuous improvements, bug fixes, and feature enhancements driven by the community. This ensures that the SIEM system can take advantage of the latest advancements in MeiliSearch.
- **Security**: MeiliSearch provides security features to protect sensitive log data. It supports HTTP(S) authentication and can be deployed within a private network to control access to the search engine.
- **Documentation and Support**: MeiliSearch has comprehensive documentation and community support. This makes it easier for developers and system administrators to understand its capabilities, troubleshoot issues, and optimize its performance for the SIEM system.

### ClickHouse

Using ClickHouse in a SIEM system offers several compelling reasons that make it a valuable addition to the infrastructure:

- **High Performance and Scalability**: ClickHouse is designed for high-performance analytics and data processing. It can handle massive volumes of data and perform complex analytical queries efficiently. In a SIEM system, which deals with large-scale log data and requires real-time analytics, ClickHouse's performance and scalability are crucial.
- **Columnar Storage**: ClickHouse utilizes a columnar storage format, which is particularly suitable for analytical workloads. This storage format allows for efficient compression and selective data retrieval, optimizing query performance for analytical operations often performed in SIEM systems.
- **Real-Time Analytics**: ClickHouse can support real-time analytics due to its ability to perform incremental data inserts and merges. This is especially important in a SIEM system, where the analysis of security events must happen in near real-time to identify and respond to threats promptly.
- **Horizontal Scalability**: ClickHouse can be easily scaled horizontally by adding more nodes to the cluster. This ensures that the SIEM system can handle increasing data volumes without sacrificing performance or reliability.
- **Cost-Effective Storage**: ClickHouse's efficient storage format reduces disk space requirements, making it a cost-effective solution for storing large amounts of log data. As a result, SIEM systems can keep historical logs without incurring excessive storage costs.
- **Complex Query Support**: ClickHouse is capable of handling complex analytical queries, including aggregations, joins, and subqueries. This is valuable in a SIEM system, where data correlation and analysis across multiple log sources are common.
- **Real-Time Replication**: ClickHouse supports replication and high availability. This ensures that data is not lost in case of hardware failures and provides continuous access to analytical capabilities even during node outages.
- **Integration with Existing Tools**: ClickHouse offers various integrations and connectors, enabling seamless data ingestion from different data sources. It can be easily integrated into existing SIEM infrastructures, making it an attractive choice for enhancing analytics capabilities.
- **SQL Compatibility**: ClickHouse supports SQL, which is a familiar query language for many developers and analysts. This allows teams to leverage their existing SQL skills and knowledge to work with ClickHouse effectively.
- **Community and Ecosystem**: ClickHouse has an active and growing community that contributes to the development and improvement of the system. Additionally, various tools and libraries are available to enhance ClickHouse's functionality and ease of use within the SIEM system.

In conclusion, ClickHouse's high performance, scalability, columnar storage, and real-time analytics capabilities make it a compelling choice for storing and analyzing log data in a SIEM system. Its ability to handle complex queries, cost-effective storage, and integration options further solidify its position as an excellent data warehousing solution for enhancing SIEM analytics and incident response.

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

Once the server is running, you can interact with the SIEM system using GraphQL queries and mutations. Refer to the API documentation or explore the GraphQL playground (usually available at `http://localhost:3000/graphql`) to understand the available queries and mutations.

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
- Get the top N users with the highest number of security events.
- Get the top N IP addresses with the most blocked attempts.
- Get security events that match a specific regular expression pattern.
- Get security events for a specific user within a time range.
- Get security events with a specific event description.
- Get security events related to a specific geographic region.
- Get security events for a specific data source within a time range.
- Get security events generated by a specific process or application.
- Get security events caused by a specific malware or virus.
- Get the most common attack types in the last 24 hours.
- Get the least common event types in the last 7 days.
- Get the number of blocked events per data source in the last hour.
- Get the average severity level of security events per user.
- Get the count of security events per event category (e.g., authentication, network).
- Get the top N users with the most successful login attempts.
- Get a list of all data sources.
- Get a specific data source by ID.
- Get a list of all rules.
- Get a specific rule by ID.
- Get security events for a specific data source.
- Get security events for a specific rule.
- Get security events for a specific user and data source.

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
- Create a new data source mapping for translating external event fields to the SIEM schema.
- Update the settings of an existing data source mapping.
- Remove a data source mapping from the SIEM system.
- Create a new correlation rule for identifying complex attack patterns.
- Update the settings of an existing correlation rule.
- Remove a correlation rule from the SIEM system.
- Acknowledge all alerts for a specific user.
- Dismiss all alerts for a specific user.
- Suspend real-time monitoring temporarily for maintenance.
- Resume real-time monitoring after maintenance.
- Add a new user group with specific permissions.
- Update the permissions of an existing user group.
- Remove a user group from the SIEM system.
- Get the average time taken to resolve security incidents.
- Get the most frequent attack patterns in the last 30 days.
- Get the top N destination IP addresses with the most incoming traffic.

## GraphQL Schema

```graphql
type User {
  id: ID!
  username: String!
  # You might not want to expose the password field in the schema,
  # as it should only be accessible for mutations, not queries.
  # password: String!

  # Add other user-specific fields like name, role, etc.
}

type SecurityEvent {
  id: ID!
  timestamp: String!
  sourceIP: String!
  destinationIP: String!
  eventType: String!
  severity: String!

  # Add other security event fields as required.
}

type DataSource {
  id: ID!
  name: String!
  description: String
  # Add other fields relevant to the data source.
}

type Rule {
  id: ID!
  name: String!
  description: String
  # Add other fields relevant to the rule.
}

type Query {
  users: [User!]!
  securityEvents: [SecurityEvent!]!

  # Additional queries go here...
}

type Mutation {
  createUser(username: String!, password: String!): User!

  createDataSource(name: String!, description: String): DataSource!

  updateDataSource(id: ID!, name: String!, description: String): DataSource!

  deleteDataSource(id: ID!): Boolean!

  createRule(name: String!, description: String): Rule!

  updateRule(id: ID!, name: String!, description: String): Rule!

  deleteRule(id: ID!): Boolean!

  securityEventsForUserAndDataSource(userId: ID!, dataSourceId: ID!): [SecurityEvent!]!

  createSecurityEvent(
    timestamp: String!
    sourceIP: String!
    destinationIP: String!
    eventType: String!
    severity: String!
  ): SecurityEvent!

  # Additional mutations go here...
}
```

## Contributing

Contributions to the SIEM project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Please ensure that you follow the project's coding standards and guidelines.

## License

The SIEM GraphQL-based project is open-source and available under the GPL-3.0 License. Feel free to use, modify, and distribute it as per the terms of the license.

Copyright 2023, Max Base
