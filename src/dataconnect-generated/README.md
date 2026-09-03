# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
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

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    name: string;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetProject
You can execute the `GetProject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProject(vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;

interface GetProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
}
export const getProjectRef: GetProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProject(dc: DataConnect, vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;

interface GetProjectRef {
  ...
  (dc: DataConnect, vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
}
export const getProjectRef: GetProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectRef:
```typescript
const name = getProjectRef.operationName;
console.log(name);
```

### Variables
The `GetProject` query requires an argument of type `GetProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProjectData {
  project?: {
    name: string;
    owner: {
      name: string;
    };
  };
}
```
### Using `GetProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProject, GetProjectVariables } from '@dataconnect/generated';

// The `GetProject` query requires an argument of type `GetProjectVariables`:
const getProjectVars: GetProjectVariables = {
  id: ..., 
};

// Call the `getProject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProject(getProjectVars);
// Variables can be defined inline as well.
const { data } = await getProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProject(dataConnect, getProjectVars);

console.log(data.project);

// Or, you can use the `Promise` API.
getProject(getProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

### Using `GetProject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectRef, GetProjectVariables } from '@dataconnect/generated';

// The `GetProject` query requires an argument of type `GetProjectVariables`:
const getProjectVars: GetProjectVariables = {
  id: ..., 
};

// Call the `getProjectRef()` function to get a reference to the query.
const ref = getProjectRef(getProjectVars);
// Variables can be defined inline as well.
const ref = getProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectRef(dataConnect, getProjectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.project);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.project);
});
```

## ListProjects
You can execute the `ListProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsRef:
```typescript
const name = listProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListProjects` query has no variables.
### Return Type
Recall that executing the `ListProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
  } & Project_Key)[];
}
```
### Using `ListProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjects } from '@dataconnect/generated';


// Call the `listProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsRef } from '@dataconnect/generated';


// Call the `listProjectsRef()` function to get a reference to the query.
const ref = listProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## GetDocument
You can execute the `GetDocument` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDocument(vars: GetDocumentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDocumentData, GetDocumentVariables>;

interface GetDocumentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDocumentVariables): QueryRef<GetDocumentData, GetDocumentVariables>;
}
export const getDocumentRef: GetDocumentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDocument(dc: DataConnect, vars: GetDocumentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDocumentData, GetDocumentVariables>;

interface GetDocumentRef {
  ...
  (dc: DataConnect, vars: GetDocumentVariables): QueryRef<GetDocumentData, GetDocumentVariables>;
}
export const getDocumentRef: GetDocumentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDocumentRef:
```typescript
const name = getDocumentRef.operationName;
console.log(name);
```

### Variables
The `GetDocument` query requires an argument of type `GetDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDocumentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetDocument` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDocumentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDocumentData {
  document?: {
    title: string;
    contentSnippet: string;
  };
}
```
### Using `GetDocument`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDocument, GetDocumentVariables } from '@dataconnect/generated';

// The `GetDocument` query requires an argument of type `GetDocumentVariables`:
const getDocumentVars: GetDocumentVariables = {
  id: ..., 
};

// Call the `getDocument()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDocument(getDocumentVars);
// Variables can be defined inline as well.
const { data } = await getDocument({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDocument(dataConnect, getDocumentVars);

console.log(data.document);

// Or, you can use the `Promise` API.
getDocument(getDocumentVars).then((response) => {
  const data = response.data;
  console.log(data.document);
});
```

### Using `GetDocument`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDocumentRef, GetDocumentVariables } from '@dataconnect/generated';

// The `GetDocument` query requires an argument of type `GetDocumentVariables`:
const getDocumentVars: GetDocumentVariables = {
  id: ..., 
};

// Call the `getDocumentRef()` function to get a reference to the query.
const ref = getDocumentRef(getDocumentVars);
// Variables can be defined inline as well.
const ref = getDocumentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDocumentRef(dataConnect, getDocumentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.document);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.document);
});
```

## ListDocuments
You can execute the `ListDocuments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDocuments(options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;

interface ListDocumentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDocumentsData, undefined>;
}
export const listDocumentsRef: ListDocumentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDocuments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;

interface ListDocumentsRef {
  ...
  (dc: DataConnect): QueryRef<ListDocumentsData, undefined>;
}
export const listDocumentsRef: ListDocumentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDocumentsRef:
```typescript
const name = listDocumentsRef.operationName;
console.log(name);
```

### Variables
The `ListDocuments` query has no variables.
### Return Type
Recall that executing the `ListDocuments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDocumentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDocumentsData {
  documents: ({
    title: string;
    fileUrl?: string | null;
  })[];
}
```
### Using `ListDocuments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDocuments } from '@dataconnect/generated';


// Call the `listDocuments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDocuments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDocuments(dataConnect);

console.log(data.documents);

// Or, you can use the `Promise` API.
listDocuments().then((response) => {
  const data = response.data;
  console.log(data.documents);
});
```

### Using `ListDocuments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDocumentsRef } from '@dataconnect/generated';


// Call the `listDocumentsRef()` function to get a reference to the query.
const ref = listDocumentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDocumentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.documents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.documents);
});
```

## GetInsight
You can execute the `GetInsight` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInsight(vars: GetInsightVariables, options?: ExecuteQueryOptions): QueryPromise<GetInsightData, GetInsightVariables>;

interface GetInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInsightVariables): QueryRef<GetInsightData, GetInsightVariables>;
}
export const getInsightRef: GetInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInsight(dc: DataConnect, vars: GetInsightVariables, options?: ExecuteQueryOptions): QueryPromise<GetInsightData, GetInsightVariables>;

interface GetInsightRef {
  ...
  (dc: DataConnect, vars: GetInsightVariables): QueryRef<GetInsightData, GetInsightVariables>;
}
export const getInsightRef: GetInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInsightRef:
```typescript
const name = getInsightRef.operationName;
console.log(name);
```

### Variables
The `GetInsight` query requires an argument of type `GetInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInsightVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetInsight` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetInsightData {
  insight?: {
    question: string;
    answer: string;
  };
}
```
### Using `GetInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInsight, GetInsightVariables } from '@dataconnect/generated';

// The `GetInsight` query requires an argument of type `GetInsightVariables`:
const getInsightVars: GetInsightVariables = {
  id: ..., 
};

// Call the `getInsight()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInsight(getInsightVars);
// Variables can be defined inline as well.
const { data } = await getInsight({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInsight(dataConnect, getInsightVars);

console.log(data.insight);

// Or, you can use the `Promise` API.
getInsight(getInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight);
});
```

### Using `GetInsight`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInsightRef, GetInsightVariables } from '@dataconnect/generated';

// The `GetInsight` query requires an argument of type `GetInsightVariables`:
const getInsightVars: GetInsightVariables = {
  id: ..., 
};

// Call the `getInsightRef()` function to get a reference to the query.
const ref = getInsightRef(getInsightVars);
// Variables can be defined inline as well.
const ref = getInsightRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInsightRef(dataConnect, getInsightVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.insight);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.insight);
});
```

## ListInsights
You can execute the `ListInsights` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listInsights(options?: ExecuteQueryOptions): QueryPromise<ListInsightsData, undefined>;

interface ListInsightsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInsightsData, undefined>;
}
export const listInsightsRef: ListInsightsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInsights(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInsightsData, undefined>;

interface ListInsightsRef {
  ...
  (dc: DataConnect): QueryRef<ListInsightsData, undefined>;
}
export const listInsightsRef: ListInsightsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInsightsRef:
```typescript
const name = listInsightsRef.operationName;
console.log(name);
```

### Variables
The `ListInsights` query has no variables.
### Return Type
Recall that executing the `ListInsights` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInsightsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInsightsData {
  insights: ({
    question: string;
    tags?: string[] | null;
  })[];
}
```
### Using `ListInsights`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInsights } from '@dataconnect/generated';


// Call the `listInsights()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInsights();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInsights(dataConnect);

console.log(data.insights);

// Or, you can use the `Promise` API.
listInsights().then((response) => {
  const data = response.data;
  console.log(data.insights);
});
```

### Using `ListInsights`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInsightsRef } from '@dataconnect/generated';


// Call the `listInsightsRef()` function to get a reference to the query.
const ref = listInsightsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInsightsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.insights);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.insights);
});
```

## GetProjectMember
You can execute the `GetProjectMember` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProjectMember(vars: GetProjectMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectMemberData, GetProjectMemberVariables>;

interface GetProjectMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectMemberVariables): QueryRef<GetProjectMemberData, GetProjectMemberVariables>;
}
export const getProjectMemberRef: GetProjectMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProjectMember(dc: DataConnect, vars: GetProjectMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectMemberData, GetProjectMemberVariables>;

interface GetProjectMemberRef {
  ...
  (dc: DataConnect, vars: GetProjectMemberVariables): QueryRef<GetProjectMemberData, GetProjectMemberVariables>;
}
export const getProjectMemberRef: GetProjectMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProjectMemberRef:
```typescript
const name = getProjectMemberRef.operationName;
console.log(name);
```

### Variables
The `GetProjectMember` query requires an argument of type `GetProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetProjectMember` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProjectMemberData {
  projectMember?: {
    role: string;
  };
}
```
### Using `GetProjectMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProjectMember, GetProjectMemberVariables } from '@dataconnect/generated';

// The `GetProjectMember` query requires an argument of type `GetProjectMemberVariables`:
const getProjectMemberVars: GetProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
};

// Call the `getProjectMember()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProjectMember(getProjectMemberVars);
// Variables can be defined inline as well.
const { data } = await getProjectMember({ projectId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProjectMember(dataConnect, getProjectMemberVars);

console.log(data.projectMember);

// Or, you can use the `Promise` API.
getProjectMember(getProjectMemberVars).then((response) => {
  const data = response.data;
  console.log(data.projectMember);
});
```

### Using `GetProjectMember`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProjectMemberRef, GetProjectMemberVariables } from '@dataconnect/generated';

// The `GetProjectMember` query requires an argument of type `GetProjectMemberVariables`:
const getProjectMemberVars: GetProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
};

// Call the `getProjectMemberRef()` function to get a reference to the query.
const ref = getProjectMemberRef(getProjectMemberVars);
// Variables can be defined inline as well.
const ref = getProjectMemberRef({ projectId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProjectMemberRef(dataConnect, getProjectMemberVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectMember);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectMember);
});
```

## ListProjectMembers
You can execute the `ListProjectMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjectMembers(vars: ListProjectMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectMembersData, ListProjectMembersVariables>;

interface ListProjectMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectMembersVariables): QueryRef<ListProjectMembersData, ListProjectMembersVariables>;
}
export const listProjectMembersRef: ListProjectMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjectMembers(dc: DataConnect, vars: ListProjectMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectMembersData, ListProjectMembersVariables>;

interface ListProjectMembersRef {
  ...
  (dc: DataConnect, vars: ListProjectMembersVariables): QueryRef<ListProjectMembersData, ListProjectMembersVariables>;
}
export const listProjectMembersRef: ListProjectMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectMembersRef:
```typescript
const name = listProjectMembersRef.operationName;
console.log(name);
```

### Variables
The `ListProjectMembers` query requires an argument of type `ListProjectMembersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProjectMembersVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProjectMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectMembersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectMembersData {
  projectMembers: ({
    user: {
      name: string;
    };
    role: string;
  })[];
}
```
### Using `ListProjectMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjectMembers, ListProjectMembersVariables } from '@dataconnect/generated';

// The `ListProjectMembers` query requires an argument of type `ListProjectMembersVariables`:
const listProjectMembersVars: ListProjectMembersVariables = {
  projectId: ..., 
};

// Call the `listProjectMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjectMembers(listProjectMembersVars);
// Variables can be defined inline as well.
const { data } = await listProjectMembers({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjectMembers(dataConnect, listProjectMembersVars);

console.log(data.projectMembers);

// Or, you can use the `Promise` API.
listProjectMembers(listProjectMembersVars).then((response) => {
  const data = response.data;
  console.log(data.projectMembers);
});
```

### Using `ListProjectMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectMembersRef, ListProjectMembersVariables } from '@dataconnect/generated';

// The `ListProjectMembers` query requires an argument of type `ListProjectMembersVariables`:
const listProjectMembersVars: ListProjectMembersVariables = {
  projectId: ..., 
};

// Call the `listProjectMembersRef()` function to get a reference to the query.
const ref = listProjectMembersRef(listProjectMembersVars);
// Variables can be defined inline as well.
const ref = listProjectMembersRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectMembersRef(dataConnect, listProjectMembersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projectMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projectMembers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  name: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  name: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ name: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  name: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ name: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  name: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ name: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  name: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ name: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation requires an argument of type `CreateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject(createProjectVars);
// Variables can be defined inline as well.
const { data } = await createProject({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect, createProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject(createProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef(createProjectVars);
// Variables can be defined inline as well.
const ref = createProjectRef({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect, createProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject, UpdateProjectVariables } from '@dataconnect/generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject(updateProjectVars);
// Variables can be defined inline as well.
const { data } = await updateProject({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect, updateProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject(updateProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef, UpdateProjectVariables } from '@dataconnect/generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef(updateProjectVars);
// Variables can be defined inline as well.
const ref = updateProjectRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect, updateProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## CreateDocument
You can execute the `CreateDocument` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDocument(vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;

interface CreateDocumentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
}
export const createDocumentRef: CreateDocumentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDocument(dc: DataConnect, vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;

interface CreateDocumentRef {
  ...
  (dc: DataConnect, vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
}
export const createDocumentRef: CreateDocumentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDocumentRef:
```typescript
const name = createDocumentRef.operationName;
console.log(name);
```

### Variables
The `CreateDocument` mutation requires an argument of type `CreateDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDocumentVariables {
  title: string;
  contentSnippet: string;
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateDocument` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDocumentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDocumentData {
  document_insert: Document_Key;
}
```
### Using `CreateDocument`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDocument, CreateDocumentVariables } from '@dataconnect/generated';

// The `CreateDocument` mutation requires an argument of type `CreateDocumentVariables`:
const createDocumentVars: CreateDocumentVariables = {
  title: ..., 
  contentSnippet: ..., 
  projectId: ..., 
};

// Call the `createDocument()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDocument(createDocumentVars);
// Variables can be defined inline as well.
const { data } = await createDocument({ title: ..., contentSnippet: ..., projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDocument(dataConnect, createDocumentVars);

console.log(data.document_insert);

// Or, you can use the `Promise` API.
createDocument(createDocumentVars).then((response) => {
  const data = response.data;
  console.log(data.document_insert);
});
```

### Using `CreateDocument`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDocumentRef, CreateDocumentVariables } from '@dataconnect/generated';

// The `CreateDocument` mutation requires an argument of type `CreateDocumentVariables`:
const createDocumentVars: CreateDocumentVariables = {
  title: ..., 
  contentSnippet: ..., 
  projectId: ..., 
};

// Call the `createDocumentRef()` function to get a reference to the mutation.
const ref = createDocumentRef(createDocumentVars);
// Variables can be defined inline as well.
const ref = createDocumentRef({ title: ..., contentSnippet: ..., projectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDocumentRef(dataConnect, createDocumentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.document_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.document_insert);
});
```

## UpdateDocument
You can execute the `UpdateDocument` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDocument(vars: UpdateDocumentVariables): MutationPromise<UpdateDocumentData, UpdateDocumentVariables>;

interface UpdateDocumentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDocumentVariables): MutationRef<UpdateDocumentData, UpdateDocumentVariables>;
}
export const updateDocumentRef: UpdateDocumentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDocument(dc: DataConnect, vars: UpdateDocumentVariables): MutationPromise<UpdateDocumentData, UpdateDocumentVariables>;

interface UpdateDocumentRef {
  ...
  (dc: DataConnect, vars: UpdateDocumentVariables): MutationRef<UpdateDocumentData, UpdateDocumentVariables>;
}
export const updateDocumentRef: UpdateDocumentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDocumentRef:
```typescript
const name = updateDocumentRef.operationName;
console.log(name);
```

### Variables
The `UpdateDocument` mutation requires an argument of type `UpdateDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDocumentVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateDocument` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDocumentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDocumentData {
  document_update?: Document_Key | null;
}
```
### Using `UpdateDocument`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDocument, UpdateDocumentVariables } from '@dataconnect/generated';

// The `UpdateDocument` mutation requires an argument of type `UpdateDocumentVariables`:
const updateDocumentVars: UpdateDocumentVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateDocument()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDocument(updateDocumentVars);
// Variables can be defined inline as well.
const { data } = await updateDocument({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDocument(dataConnect, updateDocumentVars);

console.log(data.document_update);

// Or, you can use the `Promise` API.
updateDocument(updateDocumentVars).then((response) => {
  const data = response.data;
  console.log(data.document_update);
});
```

### Using `UpdateDocument`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDocumentRef, UpdateDocumentVariables } from '@dataconnect/generated';

// The `UpdateDocument` mutation requires an argument of type `UpdateDocumentVariables`:
const updateDocumentVars: UpdateDocumentVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateDocumentRef()` function to get a reference to the mutation.
const ref = updateDocumentRef(updateDocumentVars);
// Variables can be defined inline as well.
const ref = updateDocumentRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDocumentRef(dataConnect, updateDocumentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.document_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.document_update);
});
```

## DeleteDocument
You can execute the `DeleteDocument` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDocument(vars: DeleteDocumentVariables): MutationPromise<DeleteDocumentData, DeleteDocumentVariables>;

interface DeleteDocumentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDocumentVariables): MutationRef<DeleteDocumentData, DeleteDocumentVariables>;
}
export const deleteDocumentRef: DeleteDocumentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDocument(dc: DataConnect, vars: DeleteDocumentVariables): MutationPromise<DeleteDocumentData, DeleteDocumentVariables>;

interface DeleteDocumentRef {
  ...
  (dc: DataConnect, vars: DeleteDocumentVariables): MutationRef<DeleteDocumentData, DeleteDocumentVariables>;
}
export const deleteDocumentRef: DeleteDocumentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDocumentRef:
```typescript
const name = deleteDocumentRef.operationName;
console.log(name);
```

### Variables
The `DeleteDocument` mutation requires an argument of type `DeleteDocumentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteDocumentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteDocument` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDocumentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDocumentData {
  document_delete?: Document_Key | null;
}
```
### Using `DeleteDocument`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDocument, DeleteDocumentVariables } from '@dataconnect/generated';

// The `DeleteDocument` mutation requires an argument of type `DeleteDocumentVariables`:
const deleteDocumentVars: DeleteDocumentVariables = {
  id: ..., 
};

// Call the `deleteDocument()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDocument(deleteDocumentVars);
// Variables can be defined inline as well.
const { data } = await deleteDocument({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDocument(dataConnect, deleteDocumentVars);

console.log(data.document_delete);

// Or, you can use the `Promise` API.
deleteDocument(deleteDocumentVars).then((response) => {
  const data = response.data;
  console.log(data.document_delete);
});
```

### Using `DeleteDocument`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDocumentRef, DeleteDocumentVariables } from '@dataconnect/generated';

// The `DeleteDocument` mutation requires an argument of type `DeleteDocumentVariables`:
const deleteDocumentVars: DeleteDocumentVariables = {
  id: ..., 
};

// Call the `deleteDocumentRef()` function to get a reference to the mutation.
const ref = deleteDocumentRef(deleteDocumentVars);
// Variables can be defined inline as well.
const ref = deleteDocumentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDocumentRef(dataConnect, deleteDocumentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.document_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.document_delete);
});
```

## CreateInsight
You can execute the `CreateInsight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInsight(vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;

interface CreateInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
}
export const createInsightRef: CreateInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInsight(dc: DataConnect, vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;

interface CreateInsightRef {
  ...
  (dc: DataConnect, vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
}
export const createInsightRef: CreateInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInsightRef:
```typescript
const name = createInsightRef.operationName;
console.log(name);
```

### Variables
The `CreateInsight` mutation requires an argument of type `CreateInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInsightVariables {
  question: string;
  answer: string;
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateInsight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInsightData {
  insight_insert: Insight_Key;
}
```
### Using `CreateInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInsight, CreateInsightVariables } from '@dataconnect/generated';

// The `CreateInsight` mutation requires an argument of type `CreateInsightVariables`:
const createInsightVars: CreateInsightVariables = {
  question: ..., 
  answer: ..., 
  projectId: ..., 
};

// Call the `createInsight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInsight(createInsightVars);
// Variables can be defined inline as well.
const { data } = await createInsight({ question: ..., answer: ..., projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInsight(dataConnect, createInsightVars);

console.log(data.insight_insert);

// Or, you can use the `Promise` API.
createInsight(createInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight_insert);
});
```

### Using `CreateInsight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInsightRef, CreateInsightVariables } from '@dataconnect/generated';

// The `CreateInsight` mutation requires an argument of type `CreateInsightVariables`:
const createInsightVars: CreateInsightVariables = {
  question: ..., 
  answer: ..., 
  projectId: ..., 
};

// Call the `createInsightRef()` function to get a reference to the mutation.
const ref = createInsightRef(createInsightVars);
// Variables can be defined inline as well.
const ref = createInsightRef({ question: ..., answer: ..., projectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInsightRef(dataConnect, createInsightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_insert);
});
```

## UpdateInsight
You can execute the `UpdateInsight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInsight(vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;

interface UpdateInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
}
export const updateInsightRef: UpdateInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInsight(dc: DataConnect, vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;

interface UpdateInsightRef {
  ...
  (dc: DataConnect, vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
}
export const updateInsightRef: UpdateInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInsightRef:
```typescript
const name = updateInsightRef.operationName;
console.log(name);
```

### Variables
The `UpdateInsight` mutation requires an argument of type `UpdateInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInsightVariables {
  id: UUIDString;
  answer?: string | null;
}
```
### Return Type
Recall that executing the `UpdateInsight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInsightData {
  insight_update?: Insight_Key | null;
}
```
### Using `UpdateInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInsight, UpdateInsightVariables } from '@dataconnect/generated';

// The `UpdateInsight` mutation requires an argument of type `UpdateInsightVariables`:
const updateInsightVars: UpdateInsightVariables = {
  id: ..., 
  answer: ..., // optional
};

// Call the `updateInsight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInsight(updateInsightVars);
// Variables can be defined inline as well.
const { data } = await updateInsight({ id: ..., answer: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInsight(dataConnect, updateInsightVars);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
updateInsight(updateInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

### Using `UpdateInsight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInsightRef, UpdateInsightVariables } from '@dataconnect/generated';

// The `UpdateInsight` mutation requires an argument of type `UpdateInsightVariables`:
const updateInsightVars: UpdateInsightVariables = {
  id: ..., 
  answer: ..., // optional
};

// Call the `updateInsightRef()` function to get a reference to the mutation.
const ref = updateInsightRef(updateInsightVars);
// Variables can be defined inline as well.
const ref = updateInsightRef({ id: ..., answer: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInsightRef(dataConnect, updateInsightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_update);
});
```

## DeleteInsight
You can execute the `DeleteInsight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteInsight(vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;

interface DeleteInsightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
}
export const deleteInsightRef: DeleteInsightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteInsight(dc: DataConnect, vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;

interface DeleteInsightRef {
  ...
  (dc: DataConnect, vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
}
export const deleteInsightRef: DeleteInsightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteInsightRef:
```typescript
const name = deleteInsightRef.operationName;
console.log(name);
```

### Variables
The `DeleteInsight` mutation requires an argument of type `DeleteInsightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteInsightVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteInsight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteInsightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteInsightData {
  insight_delete?: Insight_Key | null;
}
```
### Using `DeleteInsight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteInsight, DeleteInsightVariables } from '@dataconnect/generated';

// The `DeleteInsight` mutation requires an argument of type `DeleteInsightVariables`:
const deleteInsightVars: DeleteInsightVariables = {
  id: ..., 
};

// Call the `deleteInsight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteInsight(deleteInsightVars);
// Variables can be defined inline as well.
const { data } = await deleteInsight({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteInsight(dataConnect, deleteInsightVars);

console.log(data.insight_delete);

// Or, you can use the `Promise` API.
deleteInsight(deleteInsightVars).then((response) => {
  const data = response.data;
  console.log(data.insight_delete);
});
```

### Using `DeleteInsight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteInsightRef, DeleteInsightVariables } from '@dataconnect/generated';

// The `DeleteInsight` mutation requires an argument of type `DeleteInsightVariables`:
const deleteInsightVars: DeleteInsightVariables = {
  id: ..., 
};

// Call the `deleteInsightRef()` function to get a reference to the mutation.
const ref = deleteInsightRef(deleteInsightVars);
// Variables can be defined inline as well.
const ref = deleteInsightRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteInsightRef(dataConnect, deleteInsightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.insight_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.insight_delete);
});
```

## CreateProjectMember
You can execute the `CreateProjectMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProjectMember(vars: CreateProjectMemberVariables): MutationPromise<CreateProjectMemberData, CreateProjectMemberVariables>;

interface CreateProjectMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectMemberVariables): MutationRef<CreateProjectMemberData, CreateProjectMemberVariables>;
}
export const createProjectMemberRef: CreateProjectMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProjectMember(dc: DataConnect, vars: CreateProjectMemberVariables): MutationPromise<CreateProjectMemberData, CreateProjectMemberVariables>;

interface CreateProjectMemberRef {
  ...
  (dc: DataConnect, vars: CreateProjectMemberVariables): MutationRef<CreateProjectMemberData, CreateProjectMemberVariables>;
}
export const createProjectMemberRef: CreateProjectMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectMemberRef:
```typescript
const name = createProjectMemberRef.operationName;
console.log(name);
```

### Variables
The `CreateProjectMember` mutation requires an argument of type `CreateProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `CreateProjectMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectMemberData {
  projectMember_insert: ProjectMember_Key;
}
```
### Using `CreateProjectMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProjectMember, CreateProjectMemberVariables } from '@dataconnect/generated';

// The `CreateProjectMember` mutation requires an argument of type `CreateProjectMemberVariables`:
const createProjectMemberVars: CreateProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
  role: ..., 
};

// Call the `createProjectMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProjectMember(createProjectMemberVars);
// Variables can be defined inline as well.
const { data } = await createProjectMember({ projectId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProjectMember(dataConnect, createProjectMemberVars);

console.log(data.projectMember_insert);

// Or, you can use the `Promise` API.
createProjectMember(createProjectMemberVars).then((response) => {
  const data = response.data;
  console.log(data.projectMember_insert);
});
```

### Using `CreateProjectMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectMemberRef, CreateProjectMemberVariables } from '@dataconnect/generated';

// The `CreateProjectMember` mutation requires an argument of type `CreateProjectMemberVariables`:
const createProjectMemberVars: CreateProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
  role: ..., 
};

// Call the `createProjectMemberRef()` function to get a reference to the mutation.
const ref = createProjectMemberRef(createProjectMemberVars);
// Variables can be defined inline as well.
const ref = createProjectMemberRef({ projectId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectMemberRef(dataConnect, createProjectMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectMember_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectMember_insert);
});
```

## UpdateProjectMember
You can execute the `UpdateProjectMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProjectMember(vars: UpdateProjectMemberVariables): MutationPromise<UpdateProjectMemberData, UpdateProjectMemberVariables>;

interface UpdateProjectMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectMemberVariables): MutationRef<UpdateProjectMemberData, UpdateProjectMemberVariables>;
}
export const updateProjectMemberRef: UpdateProjectMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectMember(dc: DataConnect, vars: UpdateProjectMemberVariables): MutationPromise<UpdateProjectMemberData, UpdateProjectMemberVariables>;

interface UpdateProjectMemberRef {
  ...
  (dc: DataConnect, vars: UpdateProjectMemberVariables): MutationRef<UpdateProjectMemberData, UpdateProjectMemberVariables>;
}
export const updateProjectMemberRef: UpdateProjectMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectMemberRef:
```typescript
const name = updateProjectMemberRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectMember` mutation requires an argument of type `UpdateProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `UpdateProjectMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectMemberData {
  projectMember_update?: ProjectMember_Key | null;
}
```
### Using `UpdateProjectMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectMember, UpdateProjectMemberVariables } from '@dataconnect/generated';

// The `UpdateProjectMember` mutation requires an argument of type `UpdateProjectMemberVariables`:
const updateProjectMemberVars: UpdateProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
  role: ..., 
};

// Call the `updateProjectMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectMember(updateProjectMemberVars);
// Variables can be defined inline as well.
const { data } = await updateProjectMember({ projectId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectMember(dataConnect, updateProjectMemberVars);

console.log(data.projectMember_update);

// Or, you can use the `Promise` API.
updateProjectMember(updateProjectMemberVars).then((response) => {
  const data = response.data;
  console.log(data.projectMember_update);
});
```

### Using `UpdateProjectMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectMemberRef, UpdateProjectMemberVariables } from '@dataconnect/generated';

// The `UpdateProjectMember` mutation requires an argument of type `UpdateProjectMemberVariables`:
const updateProjectMemberVars: UpdateProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
  role: ..., 
};

// Call the `updateProjectMemberRef()` function to get a reference to the mutation.
const ref = updateProjectMemberRef(updateProjectMemberVars);
// Variables can be defined inline as well.
const ref = updateProjectMemberRef({ projectId: ..., userId: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectMemberRef(dataConnect, updateProjectMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectMember_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectMember_update);
});
```

## DeleteProjectMember
You can execute the `DeleteProjectMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProjectMember(vars: DeleteProjectMemberVariables): MutationPromise<DeleteProjectMemberData, DeleteProjectMemberVariables>;

interface DeleteProjectMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectMemberVariables): MutationRef<DeleteProjectMemberData, DeleteProjectMemberVariables>;
}
export const deleteProjectMemberRef: DeleteProjectMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProjectMember(dc: DataConnect, vars: DeleteProjectMemberVariables): MutationPromise<DeleteProjectMemberData, DeleteProjectMemberVariables>;

interface DeleteProjectMemberRef {
  ...
  (dc: DataConnect, vars: DeleteProjectMemberVariables): MutationRef<DeleteProjectMemberData, DeleteProjectMemberVariables>;
}
export const deleteProjectMemberRef: DeleteProjectMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectMemberRef:
```typescript
const name = deleteProjectMemberRef.operationName;
console.log(name);
```

### Variables
The `DeleteProjectMember` mutation requires an argument of type `DeleteProjectMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProjectMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectMemberData {
  projectMember_delete?: ProjectMember_Key | null;
}
```
### Using `DeleteProjectMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProjectMember, DeleteProjectMemberVariables } from '@dataconnect/generated';

// The `DeleteProjectMember` mutation requires an argument of type `DeleteProjectMemberVariables`:
const deleteProjectMemberVars: DeleteProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
};

// Call the `deleteProjectMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProjectMember(deleteProjectMemberVars);
// Variables can be defined inline as well.
const { data } = await deleteProjectMember({ projectId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProjectMember(dataConnect, deleteProjectMemberVars);

console.log(data.projectMember_delete);

// Or, you can use the `Promise` API.
deleteProjectMember(deleteProjectMemberVars).then((response) => {
  const data = response.data;
  console.log(data.projectMember_delete);
});
```

### Using `DeleteProjectMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectMemberRef, DeleteProjectMemberVariables } from '@dataconnect/generated';

// The `DeleteProjectMember` mutation requires an argument of type `DeleteProjectMemberVariables`:
const deleteProjectMemberVars: DeleteProjectMemberVariables = {
  projectId: ..., 
  userId: ..., 
};

// Call the `deleteProjectMemberRef()` function to get a reference to the mutation.
const ref = deleteProjectMemberRef(deleteProjectMemberVars);
// Variables can be defined inline as well.
const ref = deleteProjectMemberRef({ projectId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectMemberRef(dataConnect, deleteProjectMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.projectMember_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.projectMember_delete);
});
```

