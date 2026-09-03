import { createUserRef, updateUserRef, deleteUserRef, getCurrentUserRef, listUsersRef, createProjectRef, updateProjectRef, deleteProjectRef, getProjectRef, listProjectsRef, createDocumentRef, updateDocumentRef, deleteDocumentRef, getDocumentRef, listDocumentsRef, createInsightRef, updateInsightRef, deleteInsightRef, getInsightRef, listInsightsRef, createProjectMemberRef, updateProjectMemberRef, deleteProjectMemberRef, getProjectMemberRef, listProjectMembersRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateUser(args, injector) {
  return injectDataConnectMutation(updateUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteUser(args, injector) {
  return injectDataConnectMutation(deleteUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetCurrentUser(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getCurrentUserRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUsers(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUsersRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateProject(args, injector) {
  return injectDataConnectMutation(createProjectRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateProject(args, injector) {
  return injectDataConnectMutation(updateProjectRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteProject(args, injector) {
  return injectDataConnectMutation(deleteProjectRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetProject(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getProjectRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListProjects(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listProjectsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateDocument(args, injector) {
  return injectDataConnectMutation(createDocumentRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateDocument(args, injector) {
  return injectDataConnectMutation(updateDocumentRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteDocument(args, injector) {
  return injectDataConnectMutation(deleteDocumentRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetDocument(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getDocumentRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListDocuments(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listDocumentsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateInsight(args, injector) {
  return injectDataConnectMutation(createInsightRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateInsight(args, injector) {
  return injectDataConnectMutation(updateInsightRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteInsight(args, injector) {
  return injectDataConnectMutation(deleteInsightRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetInsight(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getInsightRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListInsights(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listInsightsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateProjectMember(args, injector) {
  return injectDataConnectMutation(createProjectMemberRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateProjectMember(args, injector) {
  return injectDataConnectMutation(updateProjectMemberRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteProjectMember(args, injector) {
  return injectDataConnectMutation(deleteProjectMemberRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetProjectMember(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getProjectMemberRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListProjectMembers(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listProjectMembersRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

