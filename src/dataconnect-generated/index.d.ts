import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDocumentData {
  document_insert: Document_Key;
}

export interface CreateDocumentVariables {
  title: string;
  contentSnippet: string;
  projectId: UUIDString;
}

export interface CreateInsightData {
  insight_insert: Insight_Key;
}

export interface CreateInsightVariables {
  question: string;
  answer: string;
  projectId: UUIDString;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectMemberData {
  projectMember_insert: ProjectMember_Key;
}

export interface CreateProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
  role: string;
}

export interface CreateProjectVariables {
  name: string;
  description?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  name: string;
  email: string;
}

export interface DeleteDocumentData {
  document_delete?: Document_Key | null;
}

export interface DeleteDocumentVariables {
  id: UUIDString;
}

export interface DeleteInsightData {
  insight_delete?: Insight_Key | null;
}

export interface DeleteInsightVariables {
  id: UUIDString;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectMemberData {
  projectMember_delete?: ProjectMember_Key | null;
}

export interface DeleteProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface Document_Key {
  id: UUIDString;
  __typename?: 'Document_Key';
}

export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
  };
}

export interface GetDocumentData {
  document?: {
    title: string;
    contentSnippet: string;
  };
}

export interface GetDocumentVariables {
  id: UUIDString;
}

export interface GetInsightData {
  insight?: {
    question: string;
    answer: string;
  };
}

export interface GetInsightVariables {
  id: UUIDString;
}

export interface GetProjectData {
  project?: {
    name: string;
    owner: {
      name: string;
    };
  };
}

export interface GetProjectMemberData {
  projectMember?: {
    role: string;
  };
}

export interface GetProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
}

export interface GetProjectVariables {
  id: UUIDString;
}

export interface Insight_Key {
  id: UUIDString;
  __typename?: 'Insight_Key';
}

export interface ListDocumentsData {
  documents: ({
    title: string;
    fileUrl?: string | null;
  })[];
}

export interface ListInsightsData {
  insights: ({
    question: string;
    tags?: string[] | null;
  })[];
}

export interface ListProjectMembersData {
  projectMembers: ({
    user: {
      name: string;
    };
    role: string;
  })[];
}

export interface ListProjectMembersVariables {
  projectId: UUIDString;
}

export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    name: string;
  } & Project_Key)[];
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    name: string;
  } & User_Key)[];
}

export interface ProjectMember_Key {
  projectId: UUIDString;
  userId: UUIDString;
  __typename?: 'ProjectMember_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface UpdateDocumentData {
  document_update?: Document_Key | null;
}

export interface UpdateDocumentVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateInsightData {
  insight_update?: Insight_Key | null;
}

export interface UpdateInsightVariables {
  id: UUIDString;
  answer?: string | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectMemberData {
  projectMember_update?: ProjectMember_Key | null;
}

export interface UpdateProjectMemberVariables {
  projectId: UUIDString;
  userId: UUIDString;
  role: string;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  name?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface GetProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  operationName: string;
}
export const getProjectRef: GetProjectRef;

export function getProject(vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;
export function getProject(dc: DataConnect, vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface CreateDocumentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDocumentVariables): MutationRef<CreateDocumentData, CreateDocumentVariables>;
  operationName: string;
}
export const createDocumentRef: CreateDocumentRef;

export function createDocument(vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;
export function createDocument(dc: DataConnect, vars: CreateDocumentVariables): MutationPromise<CreateDocumentData, CreateDocumentVariables>;

interface UpdateDocumentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDocumentVariables): MutationRef<UpdateDocumentData, UpdateDocumentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDocumentVariables): MutationRef<UpdateDocumentData, UpdateDocumentVariables>;
  operationName: string;
}
export const updateDocumentRef: UpdateDocumentRef;

export function updateDocument(vars: UpdateDocumentVariables): MutationPromise<UpdateDocumentData, UpdateDocumentVariables>;
export function updateDocument(dc: DataConnect, vars: UpdateDocumentVariables): MutationPromise<UpdateDocumentData, UpdateDocumentVariables>;

interface DeleteDocumentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDocumentVariables): MutationRef<DeleteDocumentData, DeleteDocumentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteDocumentVariables): MutationRef<DeleteDocumentData, DeleteDocumentVariables>;
  operationName: string;
}
export const deleteDocumentRef: DeleteDocumentRef;

export function deleteDocument(vars: DeleteDocumentVariables): MutationPromise<DeleteDocumentData, DeleteDocumentVariables>;
export function deleteDocument(dc: DataConnect, vars: DeleteDocumentVariables): MutationPromise<DeleteDocumentData, DeleteDocumentVariables>;

interface GetDocumentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDocumentVariables): QueryRef<GetDocumentData, GetDocumentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDocumentVariables): QueryRef<GetDocumentData, GetDocumentVariables>;
  operationName: string;
}
export const getDocumentRef: GetDocumentRef;

export function getDocument(vars: GetDocumentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDocumentData, GetDocumentVariables>;
export function getDocument(dc: DataConnect, vars: GetDocumentVariables, options?: ExecuteQueryOptions): QueryPromise<GetDocumentData, GetDocumentVariables>;

interface ListDocumentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDocumentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDocumentsData, undefined>;
  operationName: string;
}
export const listDocumentsRef: ListDocumentsRef;

export function listDocuments(options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;
export function listDocuments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDocumentsData, undefined>;

interface CreateInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInsightVariables): MutationRef<CreateInsightData, CreateInsightVariables>;
  operationName: string;
}
export const createInsightRef: CreateInsightRef;

export function createInsight(vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;
export function createInsight(dc: DataConnect, vars: CreateInsightVariables): MutationPromise<CreateInsightData, CreateInsightVariables>;

interface UpdateInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInsightVariables): MutationRef<UpdateInsightData, UpdateInsightVariables>;
  operationName: string;
}
export const updateInsightRef: UpdateInsightRef;

export function updateInsight(vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;
export function updateInsight(dc: DataConnect, vars: UpdateInsightVariables): MutationPromise<UpdateInsightData, UpdateInsightVariables>;

interface DeleteInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteInsightVariables): MutationRef<DeleteInsightData, DeleteInsightVariables>;
  operationName: string;
}
export const deleteInsightRef: DeleteInsightRef;

export function deleteInsight(vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;
export function deleteInsight(dc: DataConnect, vars: DeleteInsightVariables): MutationPromise<DeleteInsightData, DeleteInsightVariables>;

interface GetInsightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInsightVariables): QueryRef<GetInsightData, GetInsightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInsightVariables): QueryRef<GetInsightData, GetInsightVariables>;
  operationName: string;
}
export const getInsightRef: GetInsightRef;

export function getInsight(vars: GetInsightVariables, options?: ExecuteQueryOptions): QueryPromise<GetInsightData, GetInsightVariables>;
export function getInsight(dc: DataConnect, vars: GetInsightVariables, options?: ExecuteQueryOptions): QueryPromise<GetInsightData, GetInsightVariables>;

interface ListInsightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInsightsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListInsightsData, undefined>;
  operationName: string;
}
export const listInsightsRef: ListInsightsRef;

export function listInsights(options?: ExecuteQueryOptions): QueryPromise<ListInsightsData, undefined>;
export function listInsights(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInsightsData, undefined>;

interface CreateProjectMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectMemberVariables): MutationRef<CreateProjectMemberData, CreateProjectMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectMemberVariables): MutationRef<CreateProjectMemberData, CreateProjectMemberVariables>;
  operationName: string;
}
export const createProjectMemberRef: CreateProjectMemberRef;

export function createProjectMember(vars: CreateProjectMemberVariables): MutationPromise<CreateProjectMemberData, CreateProjectMemberVariables>;
export function createProjectMember(dc: DataConnect, vars: CreateProjectMemberVariables): MutationPromise<CreateProjectMemberData, CreateProjectMemberVariables>;

interface UpdateProjectMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectMemberVariables): MutationRef<UpdateProjectMemberData, UpdateProjectMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectMemberVariables): MutationRef<UpdateProjectMemberData, UpdateProjectMemberVariables>;
  operationName: string;
}
export const updateProjectMemberRef: UpdateProjectMemberRef;

export function updateProjectMember(vars: UpdateProjectMemberVariables): MutationPromise<UpdateProjectMemberData, UpdateProjectMemberVariables>;
export function updateProjectMember(dc: DataConnect, vars: UpdateProjectMemberVariables): MutationPromise<UpdateProjectMemberData, UpdateProjectMemberVariables>;

interface DeleteProjectMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectMemberVariables): MutationRef<DeleteProjectMemberData, DeleteProjectMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectMemberVariables): MutationRef<DeleteProjectMemberData, DeleteProjectMemberVariables>;
  operationName: string;
}
export const deleteProjectMemberRef: DeleteProjectMemberRef;

export function deleteProjectMember(vars: DeleteProjectMemberVariables): MutationPromise<DeleteProjectMemberData, DeleteProjectMemberVariables>;
export function deleteProjectMember(dc: DataConnect, vars: DeleteProjectMemberVariables): MutationPromise<DeleteProjectMemberData, DeleteProjectMemberVariables>;

interface GetProjectMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectMemberVariables): QueryRef<GetProjectMemberData, GetProjectMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectMemberVariables): QueryRef<GetProjectMemberData, GetProjectMemberVariables>;
  operationName: string;
}
export const getProjectMemberRef: GetProjectMemberRef;

export function getProjectMember(vars: GetProjectMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectMemberData, GetProjectMemberVariables>;
export function getProjectMember(dc: DataConnect, vars: GetProjectMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectMemberData, GetProjectMemberVariables>;

interface ListProjectMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProjectMembersVariables): QueryRef<ListProjectMembersData, ListProjectMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProjectMembersVariables): QueryRef<ListProjectMembersData, ListProjectMembersVariables>;
  operationName: string;
}
export const listProjectMembersRef: ListProjectMembersRef;

export function listProjectMembers(vars: ListProjectMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectMembersData, ListProjectMembersVariables>;
export function listProjectMembers(dc: DataConnect, vars: ListProjectMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListProjectMembersData, ListProjectMembersVariables>;

