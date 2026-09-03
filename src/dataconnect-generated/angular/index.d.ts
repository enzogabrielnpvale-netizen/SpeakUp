import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetCurrentUserData, ListUsersData, CreateProjectData, CreateProjectVariables, UpdateProjectData, UpdateProjectVariables, DeleteProjectData, DeleteProjectVariables, GetProjectData, GetProjectVariables, ListProjectsData, CreateDocumentData, CreateDocumentVariables, UpdateDocumentData, UpdateDocumentVariables, DeleteDocumentData, DeleteDocumentVariables, GetDocumentData, GetDocumentVariables, ListDocumentsData, CreateInsightData, CreateInsightVariables, UpdateInsightData, UpdateInsightVariables, DeleteInsightData, DeleteInsightVariables, GetInsightData, GetInsightVariables, ListInsightsData, CreateProjectMemberData, CreateProjectMemberVariables, UpdateProjectMemberData, UpdateProjectMemberVariables, DeleteProjectMemberData, DeleteProjectMemberVariables, GetProjectMemberData, GetProjectMemberVariables, ListProjectMembersData, ListProjectMembersVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateUserData, FirebaseError, CreateUserVariables>;
export function injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, CreateUserVariables, CreateUserVariables>;

type UpdateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateUserData, FirebaseError, UpdateUserVariables | void>;
export function injectUpdateUser(options?: UpdateUserOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateUserData, UpdateUserVariables, UpdateUserVariables | void>;

type DeleteUserOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteUserData, FirebaseError, undefined>;
export function injectDeleteUser(options?: DeleteUserOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteUserData, undefined, >;

export type GetCurrentUserOptions = () => Omit<CreateDataConnectQueryOptions<GetCurrentUserData, undefined>, 'queryFn'>;
export function injectGetCurrentUser(options?: GetCurrentUserOptions, injector?: Injector): CreateDataConnectQueryResult<GetCurrentUserData, undefined>;

export type ListUsersOptions = () => Omit<CreateDataConnectQueryOptions<ListUsersData, undefined>, 'queryFn'>;
export function injectListUsers(options?: ListUsersOptions, injector?: Injector): CreateDataConnectQueryResult<ListUsersData, undefined>;

type CreateProjectOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateProjectData, FirebaseError, CreateProjectVariables>;
export function injectCreateProject(options?: CreateProjectOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProjectData, CreateProjectVariables, CreateProjectVariables>;

type UpdateProjectOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateProjectData, FirebaseError, UpdateProjectVariables>;
export function injectUpdateProject(options?: UpdateProjectOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables, UpdateProjectVariables>;

type DeleteProjectOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteProjectData, FirebaseError, DeleteProjectVariables>;
export function injectDeleteProject(options?: DeleteProjectOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables, DeleteProjectVariables>;

type GetProjectArgs = GetProjectVariables | (() => GetProjectVariables);
export type GetProjectOptions = () => Omit<CreateDataConnectQueryOptions<GetProjectData, GetProjectVariables>, 'queryFn'>;
export function injectGetProject(args: GetProjectArgs, options?: GetProjectOptions, injector?: Injector): CreateDataConnectQueryResult<GetProjectData, GetProjectVariables>;

export type ListProjectsOptions = () => Omit<CreateDataConnectQueryOptions<ListProjectsData, undefined>, 'queryFn'>;
export function injectListProjects(options?: ListProjectsOptions, injector?: Injector): CreateDataConnectQueryResult<ListProjectsData, undefined>;

type CreateDocumentOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateDocumentData, FirebaseError, CreateDocumentVariables>;
export function injectCreateDocument(options?: CreateDocumentOptions, injector?: Injector): CreateDataConnectMutationResult<CreateDocumentData, CreateDocumentVariables, CreateDocumentVariables>;

type UpdateDocumentOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateDocumentData, FirebaseError, UpdateDocumentVariables>;
export function injectUpdateDocument(options?: UpdateDocumentOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateDocumentData, UpdateDocumentVariables, UpdateDocumentVariables>;

type DeleteDocumentOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteDocumentData, FirebaseError, DeleteDocumentVariables>;
export function injectDeleteDocument(options?: DeleteDocumentOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteDocumentData, DeleteDocumentVariables, DeleteDocumentVariables>;

type GetDocumentArgs = GetDocumentVariables | (() => GetDocumentVariables);
export type GetDocumentOptions = () => Omit<CreateDataConnectQueryOptions<GetDocumentData, GetDocumentVariables>, 'queryFn'>;
export function injectGetDocument(args: GetDocumentArgs, options?: GetDocumentOptions, injector?: Injector): CreateDataConnectQueryResult<GetDocumentData, GetDocumentVariables>;

export type ListDocumentsOptions = () => Omit<CreateDataConnectQueryOptions<ListDocumentsData, undefined>, 'queryFn'>;
export function injectListDocuments(options?: ListDocumentsOptions, injector?: Injector): CreateDataConnectQueryResult<ListDocumentsData, undefined>;

type CreateInsightOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateInsightData, FirebaseError, CreateInsightVariables>;
export function injectCreateInsight(options?: CreateInsightOptions, injector?: Injector): CreateDataConnectMutationResult<CreateInsightData, CreateInsightVariables, CreateInsightVariables>;

type UpdateInsightOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateInsightData, FirebaseError, UpdateInsightVariables>;
export function injectUpdateInsight(options?: UpdateInsightOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateInsightData, UpdateInsightVariables, UpdateInsightVariables>;

type DeleteInsightOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteInsightData, FirebaseError, DeleteInsightVariables>;
export function injectDeleteInsight(options?: DeleteInsightOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteInsightData, DeleteInsightVariables, DeleteInsightVariables>;

type GetInsightArgs = GetInsightVariables | (() => GetInsightVariables);
export type GetInsightOptions = () => Omit<CreateDataConnectQueryOptions<GetInsightData, GetInsightVariables>, 'queryFn'>;
export function injectGetInsight(args: GetInsightArgs, options?: GetInsightOptions, injector?: Injector): CreateDataConnectQueryResult<GetInsightData, GetInsightVariables>;

export type ListInsightsOptions = () => Omit<CreateDataConnectQueryOptions<ListInsightsData, undefined>, 'queryFn'>;
export function injectListInsights(options?: ListInsightsOptions, injector?: Injector): CreateDataConnectQueryResult<ListInsightsData, undefined>;

type CreateProjectMemberOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateProjectMemberData, FirebaseError, CreateProjectMemberVariables>;
export function injectCreateProjectMember(options?: CreateProjectMemberOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProjectMemberData, CreateProjectMemberVariables, CreateProjectMemberVariables>;

type UpdateProjectMemberOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateProjectMemberData, FirebaseError, UpdateProjectMemberVariables>;
export function injectUpdateProjectMember(options?: UpdateProjectMemberOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProjectMemberData, UpdateProjectMemberVariables, UpdateProjectMemberVariables>;

type DeleteProjectMemberOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteProjectMemberData, FirebaseError, DeleteProjectMemberVariables>;
export function injectDeleteProjectMember(options?: DeleteProjectMemberOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteProjectMemberData, DeleteProjectMemberVariables, DeleteProjectMemberVariables>;

type GetProjectMemberArgs = GetProjectMemberVariables | (() => GetProjectMemberVariables);
export type GetProjectMemberOptions = () => Omit<CreateDataConnectQueryOptions<GetProjectMemberData, GetProjectMemberVariables>, 'queryFn'>;
export function injectGetProjectMember(args: GetProjectMemberArgs, options?: GetProjectMemberOptions, injector?: Injector): CreateDataConnectQueryResult<GetProjectMemberData, GetProjectMemberVariables>;

type ListProjectMembersArgs = ListProjectMembersVariables | (() => ListProjectMembersVariables);
export type ListProjectMembersOptions = () => Omit<CreateDataConnectQueryOptions<ListProjectMembersData, ListProjectMembersVariables>, 'queryFn'>;
export function injectListProjectMembers(args: ListProjectMembersArgs, options?: ListProjectMembersOptions, injector?: Injector): CreateDataConnectQueryResult<ListProjectMembersData, ListProjectMembersVariables>;
