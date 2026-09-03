const { createUserRef, updateUserRef, deleteUserRef, getCurrentUserRef, listUsersRef, createProjectRef, updateProjectRef, deleteProjectRef, getProjectRef, listProjectsRef, createDocumentRef, updateDocumentRef, deleteDocumentRef, getDocumentRef, listDocumentsRef, createInsightRef, updateInsightRef, deleteInsightRef, getInsightRef, listInsightsRef, createProjectMemberRef, updateProjectMemberRef, deleteProjectMemberRef, getProjectMemberRef, listProjectMembersRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateUser = function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateUser = function injectUpdateUser(args, injector) {
  return injectDataConnectMutation(updateUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteUser = function injectDeleteUser(args, injector) {
  return injectDataConnectMutation(deleteUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetCurrentUser = function injectGetCurrentUser(options, injector) {
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

exports.injectListUsers = function injectListUsers(options, injector) {
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

exports.injectCreateProject = function injectCreateProject(args, injector) {
  return injectDataConnectMutation(createProjectRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateProject = function injectUpdateProject(args, injector) {
  return injectDataConnectMutation(updateProjectRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteProject = function injectDeleteProject(args, injector) {
  return injectDataConnectMutation(deleteProjectRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetProject = function injectGetProject(args, options, injector) {
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

exports.injectListProjects = function injectListProjects(options, injector) {
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

exports.injectCreateDocument = function injectCreateDocument(args, injector) {
  return injectDataConnectMutation(createDocumentRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateDocument = function injectUpdateDocument(args, injector) {
  return injectDataConnectMutation(updateDocumentRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteDocument = function injectDeleteDocument(args, injector) {
  return injectDataConnectMutation(deleteDocumentRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetDocument = function injectGetDocument(args, options, injector) {
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

exports.injectListDocuments = function injectListDocuments(options, injector) {
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

exports.injectCreateInsight = function injectCreateInsight(args, injector) {
  return injectDataConnectMutation(createInsightRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateInsight = function injectUpdateInsight(args, injector) {
  return injectDataConnectMutation(updateInsightRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteInsight = function injectDeleteInsight(args, injector) {
  return injectDataConnectMutation(deleteInsightRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetInsight = function injectGetInsight(args, options, injector) {
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

exports.injectListInsights = function injectListInsights(options, injector) {
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

exports.injectCreateProjectMember = function injectCreateProjectMember(args, injector) {
  return injectDataConnectMutation(createProjectMemberRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateProjectMember = function injectUpdateProjectMember(args, injector) {
  return injectDataConnectMutation(updateProjectMemberRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteProjectMember = function injectDeleteProjectMember(args, injector) {
  return injectDataConnectMutation(deleteProjectMemberRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetProjectMember = function injectGetProjectMember(args, options, injector) {
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

exports.injectListProjectMembers = function injectListProjectMembers(args, options, injector) {
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

