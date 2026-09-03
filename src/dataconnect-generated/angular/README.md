# Generated Angular README
This README will guide you through the process of using the generated Angular SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/angular` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#angular).

# Table of Contents
- [**Overview**](#generated-angular-readme)
- [**TanStack Query Firebase & TanStack Angular Query**](#tanstack-query-firebase-tanstack-angular-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-angular-query-packages)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListUsers*](#listusers)
  - [*GetProject*](#getproject)
  - [*ListProjects*](#listprojects)
  - [*GetDocument*](#getdocument)
  - [*ListDocuments*](#listdocuments)
  - [*GetInsight*](#getinsight)
  - [*ListInsights*](#listinsights)
  - [*GetProjectMember*](#getprojectmember)
  - [*ListProjectMembers*](#listprojectmembers)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*DeleteProject*](#deleteproject)
  - [*CreateDocument*](#createdocument)
  - [*UpdateDocument*](#updatedocument)
  - [*DeleteDocument*](#deletedocument)
  - [*CreateInsight*](#createinsight)
  - [*UpdateInsight*](#updateinsight)
  - [*DeleteInsight*](#deleteinsight)
  - [*CreateProjectMember*](#createprojectmember)
  - [*UpdateProjectMember*](#updateprojectmember)
  - [*DeleteProjectMember*](#deleteprojectmember)

# TanStack Query Firebase & TanStack Angular Query
This SDK provides [Angular](https://angular.dev/) injectors generated specific to your application, for the operations found in the connector `example`. These injectors are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack Angular Query v5](https://tanstack.com/query/v5/docs/framework/angular/overview) and [AngularFire](https://github.com/angular/angularfire/tree/main).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated Angular SDK.

## Installing TanStack Query Firebase and TanStack Angular Query Packages
In order to use the Angular generated SDK, you must install `AngularFire` and select `Data Connect` during the setup.

You can install `AngularFire` using the [Angular CLI](https://angular.dev/installation#install-angular-cli). You can also follow the installation instructions from the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular#automatic-setup).

```bash
npm install -g @angular/cli
```
```bash
ng add @angular/fire
# select Data Connect during setup!
```

This should handle configuring your project to use TanStack Query. However, if you need to set up manually, please follow the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/angular#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, edit your `main.ts` file and your `app/app.config.ts` file and update your `provideDataConnect` provider:
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
... // other imports
// update your imports to include the function that connects to the emulator
import { getDataConnect, provideDataConnect, connectDataConnectEmulator } from '@angular/fire/data-connect';

// update the `provideDataConnect` provider to provide an instance of `DataConnect` which uses the emulator:
export const appConfig: ApplicationConfig = {
  providers: [
    ... // other providers
    // Firebase Data Connect providers
    ...
    provideDataConnect(() => {
      const dataConnect = getDataConnect(connectorConfig);
      connectDataConnectEmulator(dataConnect, 'localhost', 9399);
      return dataConnect;
    }),
  ],
};
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the injectors provided from your generated Angular SDK.

# Queries

The Angular generated SDK provides Query injectors that call [`injectDataConnectQuery`](https://react-query-firebase.invertase.dev/angular/data-connect/querying) from TanStack Query Firebase.

Calling these injectors will return a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these injectors and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular/data-connect/querying).

TanStack Angular Query caches the results of your Queries, so using the same Query injector in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query injectors execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/disabling-queries).

To learn more about TanStack Angular Query's Queries, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/queries).

## Using Query Injectors
Here's a general overview of how to use the generated Query injectors in your code:

- If the Query has no variables, the Query injector does not require arguments.
- If the Query has any required variables, the Query injector will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query injector does not require any arguments.
- The Angular generated SDK's Query injectors do not accept `DataConnect` instances as arguments.
- Query injector functions can be called with or without passing in an `options` argument, whose type is a function which returns an object. The type is generated alongside the operation's injector function in [dataconnect-generated/angular/index.d.ts](./index.d.ts). To learn more about the `options` argument, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query injector without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query injectors to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetCurrentUser
You can execute the `GetCurrentUser` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetCurrentUser(options?: GetCurrentUserOptions, injector?: Injector): CreateDataConnectQueryResult<GetCurrentUserData, undefined>;
```

### Variables
The `GetCurrentUser` Query has no variables.
### Return Type
Recall that calling the `GetCurrentUser` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetCurrentUser` Query is of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetCurrentUser`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectGetCurrentUser, GetCurrentUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetCurrentUser();

  // You can also pass in an options function (not object) of type `GetCurrentUserOptions` to the Query injector function.
  options: GetCurrentUserOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetCurrentUser(this.options);
}
```

## ListUsers
You can execute the `ListUsers` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListUsers(options?: ListUsersOptions, injector?: Injector): CreateDataConnectQueryResult<ListUsersData, undefined>;
```

### Variables
The `ListUsers` Query has no variables.
### Return Type
Recall that calling the `ListUsers` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListUsers` Query is of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    name: string;
  } & User_Key)[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListUsers`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListUsers, ListUsersOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListUsers();

  // You can also pass in an options function (not object) of type `ListUsersOptions` to the Query injector function.
  options: ListUsersOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListUsers(this.options);
}
```

## GetProject
You can execute the `GetProject` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetProject(args: GetProjectArgs, options?: GetProjectOptions, injector?: Injector): CreateDataConnectQueryResult<GetProjectData, GetProjectVariables>;
```

### Variables
The `GetProject` Query requires an argument of type `GetProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProject` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetProject` Query is of type `GetProjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetProjectData {
  project?: {
    name: string;
    owner: {
      name: string;
    };
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetProject`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetProjectVariables } from '@dataconnect/generated';
import { injectGetProject, GetProjectOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetProject` Query requires an argument of type `GetProjectVariables`:
  getProjectVars: GetProjectVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetProject(this.getProjectVars);
  // Variables can be defined inline as well.
  query = injectGetProject({ id: ..., });

  // You can also pass in an options function (not object) of type `GetProjectOptions` to the Query injector function.
  options: GetProjectOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetProject(this.getProjectVars, this.options);
}
```

## ListProjects
You can execute the `ListProjects` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListProjects(options?: ListProjectsOptions, injector?: Injector): CreateDataConnectQueryResult<ListProjectsData, undefined>;
```

### Variables
The `ListProjects` Query has no variables.
### Return Type
Recall that calling the `ListProjects` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListProjects` Query is of type `ListProjectsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
  } & Project_Key)[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListProjects`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListProjects, ListProjectsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListProjects();

  // You can also pass in an options function (not object) of type `ListProjectsOptions` to the Query injector function.
  options: ListProjectsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListProjects(this.options);
}
```

## GetDocument
You can execute the `GetDocument` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetDocument(args: GetDocumentArgs, options?: GetDocumentOptions, injector?: Injector): CreateDataConnectQueryResult<GetDocumentData, GetDocumentVariables>;
```

### Variables
The `GetDocument` Query requires an argument of type `GetDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDocumentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetDocument` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetDocument` Query is of type `GetDocumentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetDocumentData {
  document?: {
    title: string;
    contentSnippet: string;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetDocument`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetDocumentVariables } from '@dataconnect/generated';
import { injectGetDocument, GetDocumentOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetDocument` Query requires an argument of type `GetDocumentVariables`:
  getDocumentVars: GetDocumentVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetDocument(this.getDocumentVars);
  // Variables can be defined inline as well.
  query = injectGetDocument({ id: ..., });

  // You can also pass in an options function (not object) of type `GetDocumentOptions` to the Query injector function.
  options: GetDocumentOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetDocument(this.getDocumentVars, this.options);
}
```

## ListDocuments
You can execute the `ListDocuments` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListDocuments(options?: ListDocumentsOptions, injector?: Injector): CreateDataConnectQueryResult<ListDocumentsData, undefined>;
```

### Variables
The `ListDocuments` Query has no variables.
### Return Type
Recall that calling the `ListDocuments` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListDocuments` Query is of type `ListDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListDocumentsData {
  documents: ({
    title: string;
    fileUrl?: string | null;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListDocuments`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListDocuments, ListDocumentsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListDocuments();

  // You can also pass in an options function (not object) of type `ListDocumentsOptions` to the Query injector function.
  options: ListDocumentsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListDocuments(this.options);
}
```

## GetInsight
You can execute the `GetInsight` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetInsight(args: GetInsightArgs, options?: GetInsightOptions, injector?: Injector): CreateDataConnectQueryResult<GetInsightData, GetInsightVariables>;
```

### Variables
The `GetInsight` Query requires an argument of type `GetInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetInsightVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetInsight` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetInsight` Query is of type `GetInsightData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetInsightData {
  insight?: {
    question: string;
    answer: string;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetInsight`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetInsightVariables } from '@dataconnect/generated';
import { injectGetInsight, GetInsightOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetInsight` Query requires an argument of type `GetInsightVariables`:
  getInsightVars: GetInsightVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetInsight(this.getInsightVars);
  // Variables can be defined inline as well.
  query = injectGetInsight({ id: ..., });

  // You can also pass in an options function (not object) of type `GetInsightOptions` to the Query injector function.
  options: GetInsightOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetInsight(this.getInsightVars, this.options);
}
```

## ListInsights
You can execute the `ListInsights` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListInsights(options?: ListInsightsOptions, injector?: Injector): CreateDataConnectQueryResult<ListInsightsData, undefined>;
```

### Variables
The `ListInsights` Query has no variables.
### Return Type
Recall that calling the `ListInsights` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListInsights` Query is of type `ListInsightsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListInsightsData {
  insights: ({
    question: string;
    tags?: string[] | null;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListInsights`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListInsights, ListInsightsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListInsights();

  // You can also pass in an options function (not object) of type `ListInsightsOptions` to the Query injector function.
  options: ListInsightsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListInsights(this.options);
}
```

## GetProjectMember
You can execute the `GetProjectMember` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetProjectMember(args: GetProjectMemberArgs, options?: GetProjectMemberOptions, injector?: Injector): CreateDataConnectQueryResult<GetProjectMemberData, GetProjectMemberVariables>;
```

### Variables
The `GetProjectMember` Query requires an argument of type `GetProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `GetProjectMember` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetProjectMember` Query is of type `GetProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetProjectMemberData {
  projectMember?: {
    role: string;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetProjectMember`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetProjectMemberVariables } from '@dataconnect/generated';
import { injectGetProjectMember, GetProjectMemberOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetProjectMember` Query requires an argument of type `GetProjectMemberVariables`:
  getProjectMemberVars: GetProjectMemberVariables = {
    projectId: ..., 
    userId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetProjectMember(this.getProjectMemberVars);
  // Variables can be defined inline as well.
  query = injectGetProjectMember({ projectId: ..., userId: ..., });

  // You can also pass in an options function (not object) of type `GetProjectMemberOptions` to the Query injector function.
  options: GetProjectMemberOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetProjectMember(this.getProjectMemberVars, this.options);
}
```

## ListProjectMembers
You can execute the `ListProjectMembers` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListProjectMembers(args: ListProjectMembersArgs, options?: ListProjectMembersOptions, injector?: Injector): CreateDataConnectQueryResult<ListProjectMembersData, ListProjectMembersVariables>;
```

### Variables
The `ListProjectMembers` Query requires an argument of type `ListProjectMembersVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListProjectMembersVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `ListProjectMembers` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListProjectMembers` Query is of type `ListProjectMembersData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListProjectMembersData {
  projectMembers: ({
    user: {
      name: string;
    };
    role: string;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListProjectMembers`'s Query injector

```javascript
... // other imports
import { connectorConfig, ListProjectMembersVariables } from '@dataconnect/generated';
import { injectListProjectMembers, ListProjectMembersOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `ListProjectMembers` Query requires an argument of type `ListProjectMembersVariables`:
  listProjectMembersVars: ListProjectMembersVariables = {
    projectId: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListProjectMembers(this.listProjectMembersVars);
  // Variables can be defined inline as well.
  query = injectListProjectMembers({ projectId: ..., });

  // You can also pass in an options function (not object) of type `ListProjectMembersOptions` to the Query injector function.
  options: ListProjectMembersOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListProjectMembers(this.listProjectMembersVars, this.options);
}
```

# Mutations

The Angular generated SDK provides Mutations injectors that call [`injectDataConnectMutation`](https://react-query-firebase.invertase.dev/angular/data-connect/mutations) from TanStack Query Firebase.

Calling these injectors will return a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these injectors and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular/data-connect/mutations).

Mutation injectors do not execute their Mutations automatically when called. Rather, after calling the Mutation injector and getting a `CreateDataConnectMutationResult` object, you must call the `CreateDataConnectMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack Angular Query's Mutations, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/mutations).

## Using Mutation Injectors
Here's a general overview of how to use the generated Mutation injectors in your code:

- Mutation injectors are not called with the arguments to the Mutation. Instead, arguments are passed to `CreateDataConnectMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation injector does not require any arguments.
- The Angular generated SDK's Mutation injectors do not accept `DataConnect` instances as arguments.
- Mutation injector functions can be called with or without passing in an `options` argument, whose type is a function which returns an object. The type is generated alongside the operation's injector function in [dataconnect-generated/angular/index.d.ts](./index.d.ts). The type is generated alongside the operation's injector function. To learn more about the `options` argument, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/mutations#mutation-side-effects).
  - `CreateDataConnectMutationResult.mutate()` also accepts an `options` argument. It's type is not a function which returns an object, but the object itself.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `CreateDataConnectMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation injectors to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateUser
You can execute the `CreateUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, CreateUserVariables, CreateUserVariables>;
```

### Variables
The `CreateUser` Mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateUserVariables {
  name: string;
  email: string;
}
```
### Return Type
Recall that calling the `CreateUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateUser` Mutation is of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateUserData {
  user_insert: User_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateUserVariables } from '@dataconnect/generated';
import { injectCreateUser, CreateUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateUser();

  // You can also pass in a `CreateUserOptions` function (not object) to the Mutation injector function.
  options: CreateUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateUser` Mutation requires an argument of type `CreateUserVariables`:
    const createUserVars: CreateUserVariables = {
      name: ..., 
      email: ..., 
    };
    this.mutation.mutate(createUserVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ name: ..., email: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createUserVars);

    // You can also pass in a `CreateUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createUserVars, this.options());
  }
}
```

## UpdateUser
You can execute the `UpdateUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateUser(options?: UpdateUserOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateUserData, UpdateUserVariables, UpdateUserVariables | void>;
```

### Variables
The `UpdateUser` Mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateUserVariables {
  name?: string | null;
}
```
### Return Type
Recall that calling the `UpdateUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateUser` Mutation is of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateUserVariables } from '@dataconnect/generated';
import { injectUpdateUser, UpdateUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateUser();

  // You can also pass in a `UpdateUserOptions` function (not object) to the Mutation injector function.
  options: UpdateUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateUser` Mutation has an optional argument of type `UpdateUserVariables`:
    const updateUserVars: UpdateUserVariables = {
      name: ..., // optional
    };
    this.mutation.mutate(updateUserVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ name: ..., });
    // Since all variables are optional for this Mutation, you can omit the `UpdateUserVariables` argument.
    this.mutation.mutate();

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateUserVars);

    // You can also pass in a `UpdateUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    // Since all variables are optional for this Mutation, you can provide options without providing any variables.
    // To do so, you must pass `undefined` where you would normally pass the variables.
    this.mutation.mutate(updateUserVars /** or undefined */, this.options());
  }
}
```

## DeleteUser
You can execute the `DeleteUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteUser(options?: DeleteUserOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteUserData, undefined, >;
```

### Variables
The `DeleteUser` Mutation has no variables.
### Return Type
Recall that calling the `DeleteUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteUser` Mutation is of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectDeleteUser, DeleteUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteUser();

  // You can also pass in a `DeleteUserOptions` function (not object) to the Mutation injector function.
  options: DeleteUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    this.mutation.mutate();

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync();

    // You can also pass in a `DeleteUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    // Since this Mutation accepts no variables, you must pass `undefined` where you would normally pass the variables.
    this.mutation.mutate(undefined, this.options());
  }
}
```

## CreateProject
You can execute the `CreateProject` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateProject(options?: CreateProjectOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProjectData, CreateProjectVariables, CreateProjectVariables>;
```

### Variables
The `CreateProject` Mutation requires an argument of type `CreateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProjectVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that calling the `CreateProject` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateProject` Mutation is of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateProject`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateProjectVariables } from '@dataconnect/generated';
import { injectCreateProject, CreateProjectOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateProject();

  // You can also pass in a `CreateProjectOptions` function (not object) to the Mutation injector function.
  options: CreateProjectOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateProject(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateProject` Mutation requires an argument of type `CreateProjectVariables`:
    const createProjectVars: CreateProjectVariables = {
      name: ..., 
      description: ..., // optional
    };
    this.mutation.mutate(createProjectVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ name: ..., description: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createProjectVars);

    // You can also pass in a `CreateProjectOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createProjectVars, this.options());
  }
}
```

## UpdateProject
You can execute the `UpdateProject` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateProject(options?: UpdateProjectOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables, UpdateProjectVariables>;
```

### Variables
The `UpdateProject` Mutation requires an argument of type `UpdateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that calling the `UpdateProject` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateProject` Mutation is of type `UpdateProjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateProject`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateProjectVariables } from '@dataconnect/generated';
import { injectUpdateProject, UpdateProjectOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateProject();

  // You can also pass in a `UpdateProjectOptions` function (not object) to the Mutation injector function.
  options: UpdateProjectOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateProject(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateProject` Mutation requires an argument of type `UpdateProjectVariables`:
    const updateProjectVars: UpdateProjectVariables = {
      id: ..., 
      name: ..., // optional
    };
    this.mutation.mutate(updateProjectVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., name: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateProjectVars);

    // You can also pass in a `UpdateProjectOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateProjectVars, this.options());
  }
}
```

## DeleteProject
You can execute the `DeleteProject` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteProject(options?: DeleteProjectOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables, DeleteProjectVariables>;
```

### Variables
The `DeleteProject` Mutation requires an argument of type `DeleteProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProject` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteProject` Mutation is of type `DeleteProjectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteProject`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteProjectVariables } from '@dataconnect/generated';
import { injectDeleteProject, DeleteProjectOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteProject();

  // You can also pass in a `DeleteProjectOptions` function (not object) to the Mutation injector function.
  options: DeleteProjectOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteProject(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteProject` Mutation requires an argument of type `DeleteProjectVariables`:
    const deleteProjectVars: DeleteProjectVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteProjectVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteProjectVars);

    // You can also pass in a `DeleteProjectOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteProjectVars, this.options());
  }
}
```

## CreateDocument
You can execute the `CreateDocument` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateDocument(options?: CreateDocumentOptions, injector?: Injector): CreateDataConnectMutationResult<CreateDocumentData, CreateDocumentVariables, CreateDocumentVariables>;
```

### Variables
The `CreateDocument` Mutation requires an argument of type `CreateDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateDocumentVariables {
  title: string;
  contentSnippet: string;
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateDocument` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateDocument` Mutation is of type `CreateDocumentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateDocumentData {
  document_insert: Document_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateDocument`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateDocumentVariables } from '@dataconnect/generated';
import { injectCreateDocument, CreateDocumentOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateDocument();

  // You can also pass in a `CreateDocumentOptions` function (not object) to the Mutation injector function.
  options: CreateDocumentOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateDocument(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateDocument` Mutation requires an argument of type `CreateDocumentVariables`:
    const createDocumentVars: CreateDocumentVariables = {
      title: ..., 
      contentSnippet: ..., 
      projectId: ..., 
    };
    this.mutation.mutate(createDocumentVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ title: ..., contentSnippet: ..., projectId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createDocumentVars);

    // You can also pass in a `CreateDocumentOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createDocumentVars, this.options());
  }
}
```

## UpdateDocument
You can execute the `UpdateDocument` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateDocument(options?: UpdateDocumentOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateDocumentData, UpdateDocumentVariables, UpdateDocumentVariables>;
```

### Variables
The `UpdateDocument` Mutation requires an argument of type `UpdateDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateDocumentVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that calling the `UpdateDocument` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateDocument` Mutation is of type `UpdateDocumentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateDocumentData {
  document_update?: Document_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateDocument`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateDocumentVariables } from '@dataconnect/generated';
import { injectUpdateDocument, UpdateDocumentOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateDocument();

  // You can also pass in a `UpdateDocumentOptions` function (not object) to the Mutation injector function.
  options: UpdateDocumentOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateDocument(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateDocument` Mutation requires an argument of type `UpdateDocumentVariables`:
    const updateDocumentVars: UpdateDocumentVariables = {
      id: ..., 
      title: ..., // optional
    };
    this.mutation.mutate(updateDocumentVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., title: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateDocumentVars);

    // You can also pass in a `UpdateDocumentOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateDocumentVars, this.options());
  }
}
```

## DeleteDocument
You can execute the `DeleteDocument` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteDocument(options?: DeleteDocumentOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteDocumentData, DeleteDocumentVariables, DeleteDocumentVariables>;
```

### Variables
The `DeleteDocument` Mutation requires an argument of type `DeleteDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteDocumentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteDocument` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteDocument` Mutation is of type `DeleteDocumentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteDocumentData {
  document_delete?: Document_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteDocument`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteDocumentVariables } from '@dataconnect/generated';
import { injectDeleteDocument, DeleteDocumentOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteDocument();

  // You can also pass in a `DeleteDocumentOptions` function (not object) to the Mutation injector function.
  options: DeleteDocumentOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteDocument(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteDocument` Mutation requires an argument of type `DeleteDocumentVariables`:
    const deleteDocumentVars: DeleteDocumentVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteDocumentVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteDocumentVars);

    // You can also pass in a `DeleteDocumentOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteDocumentVars, this.options());
  }
}
```

## CreateInsight
You can execute the `CreateInsight` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateInsight(options?: CreateInsightOptions, injector?: Injector): CreateDataConnectMutationResult<CreateInsightData, CreateInsightVariables, CreateInsightVariables>;
```

### Variables
The `CreateInsight` Mutation requires an argument of type `CreateInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateInsightVariables {
  question: string;
  answer: string;
  projectId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateInsight` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateInsight` Mutation is of type `CreateInsightData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateInsightData {
  insight_insert: Insight_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateInsight`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateInsightVariables } from '@dataconnect/generated';
import { injectCreateInsight, CreateInsightOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateInsight();

  // You can also pass in a `CreateInsightOptions` function (not object) to the Mutation injector function.
  options: CreateInsightOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateInsight(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateInsight` Mutation requires an argument of type `CreateInsightVariables`:
    const createInsightVars: CreateInsightVariables = {
      question: ..., 
      answer: ..., 
      projectId: ..., 
    };
    this.mutation.mutate(createInsightVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ question: ..., answer: ..., projectId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createInsightVars);

    // You can also pass in a `CreateInsightOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createInsightVars, this.options());
  }
}
```

## UpdateInsight
You can execute the `UpdateInsight` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateInsight(options?: UpdateInsightOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateInsightData, UpdateInsightVariables, UpdateInsightVariables>;
```

### Variables
The `UpdateInsight` Mutation requires an argument of type `UpdateInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateInsightVariables {
  id: UUIDString;
  answer?: string | null;
}
```
### Return Type
Recall that calling the `UpdateInsight` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateInsight` Mutation is of type `UpdateInsightData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInsightData {
  insight_update?: Insight_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateInsight`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateInsightVariables } from '@dataconnect/generated';
import { injectUpdateInsight, UpdateInsightOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateInsight();

  // You can also pass in a `UpdateInsightOptions` function (not object) to the Mutation injector function.
  options: UpdateInsightOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateInsight(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateInsight` Mutation requires an argument of type `UpdateInsightVariables`:
    const updateInsightVars: UpdateInsightVariables = {
      id: ..., 
      answer: ..., // optional
    };
    this.mutation.mutate(updateInsightVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., answer: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateInsightVars);

    // You can also pass in a `UpdateInsightOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateInsightVars, this.options());
  }
}
```

## DeleteInsight
You can execute the `DeleteInsight` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteInsight(options?: DeleteInsightOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteInsightData, DeleteInsightVariables, DeleteInsightVariables>;
```

### Variables
The `DeleteInsight` Mutation requires an argument of type `DeleteInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteInsightVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteInsight` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteInsight` Mutation is of type `DeleteInsightData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteInsightData {
  insight_delete?: Insight_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteInsight`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteInsightVariables } from '@dataconnect/generated';
import { injectDeleteInsight, DeleteInsightOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteInsight();

  // You can also pass in a `DeleteInsightOptions` function (not object) to the Mutation injector function.
  options: DeleteInsightOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteInsight(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteInsight` Mutation requires an argument of type `DeleteInsightVariables`:
    const deleteInsightVars: DeleteInsightVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteInsightVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteInsightVars);

    // You can also pass in a `DeleteInsightOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteInsightVars, this.options());
  }
}
```

## CreateProjectMember
You can execute the `CreateProjectMember` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateProjectMember(options?: CreateProjectMemberOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProjectMemberData, CreateProjectMemberVariables, CreateProjectMemberVariables>;
```

### Variables
The `CreateProjectMember` Mutation requires an argument of type `CreateProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
  role: string;
}
```
### Return Type
Recall that calling the `CreateProjectMember` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateProjectMember` Mutation is of type `CreateProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProjectMemberData {
  projectMember_insert: ProjectMember_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateProjectMember`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateProjectMemberVariables } from '@dataconnect/generated';
import { injectCreateProjectMember, CreateProjectMemberOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateProjectMember();

  // You can also pass in a `CreateProjectMemberOptions` function (not object) to the Mutation injector function.
  options: CreateProjectMemberOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateProjectMember(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateProjectMember` Mutation requires an argument of type `CreateProjectMemberVariables`:
    const createProjectMemberVars: CreateProjectMemberVariables = {
      projectId: ..., 
      userId: ..., 
      role: ..., 
    };
    this.mutation.mutate(createProjectMemberVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ projectId: ..., userId: ..., role: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createProjectMemberVars);

    // You can also pass in a `CreateProjectMemberOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createProjectMemberVars, this.options());
  }
}
```

## UpdateProjectMember
You can execute the `UpdateProjectMember` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateProjectMember(options?: UpdateProjectMemberOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProjectMemberData, UpdateProjectMemberVariables, UpdateProjectMemberVariables>;
```

### Variables
The `UpdateProjectMember` Mutation requires an argument of type `UpdateProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
  role: string;
}
```
### Return Type
Recall that calling the `UpdateProjectMember` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateProjectMember` Mutation is of type `UpdateProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProjectMemberData {
  projectMember_update?: ProjectMember_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateProjectMember`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateProjectMemberVariables } from '@dataconnect/generated';
import { injectUpdateProjectMember, UpdateProjectMemberOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateProjectMember();

  // You can also pass in a `UpdateProjectMemberOptions` function (not object) to the Mutation injector function.
  options: UpdateProjectMemberOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateProjectMember(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateProjectMember` Mutation requires an argument of type `UpdateProjectMemberVariables`:
    const updateProjectMemberVars: UpdateProjectMemberVariables = {
      projectId: ..., 
      userId: ..., 
      role: ..., 
    };
    this.mutation.mutate(updateProjectMemberVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ projectId: ..., userId: ..., role: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateProjectMemberVars);

    // You can also pass in a `UpdateProjectMemberOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateProjectMemberVars, this.options());
  }
}
```

## DeleteProjectMember
You can execute the `DeleteProjectMember` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteProjectMember(options?: DeleteProjectMemberOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteProjectMemberData, DeleteProjectMemberVariables, DeleteProjectMemberVariables>;
```

### Variables
The `DeleteProjectMember` Mutation requires an argument of type `DeleteProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProjectMember` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteProjectMember` Mutation is of type `DeleteProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProjectMemberData {
  projectMember_delete?: ProjectMember_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteProjectMember`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteProjectMemberVariables } from '@dataconnect/generated';
import { injectDeleteProjectMember, DeleteProjectMemberOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteProjectMember();

  // You can also pass in a `DeleteProjectMemberOptions` function (not object) to the Mutation injector function.
  options: DeleteProjectMemberOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteProjectMember(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteProjectMember` Mutation requires an argument of type `DeleteProjectMemberVariables`:
    const deleteProjectMemberVars: DeleteProjectMemberVariables = {
      projectId: ..., 
      userId: ..., 
    };
    this.mutation.mutate(deleteProjectMemberVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ projectId: ..., userId: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteProjectMemberVars);

    // You can also pass in a `DeleteProjectMemberOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteProjectMemberVars, this.options());
  }
}
```

