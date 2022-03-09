/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter9787 = { 'updatedBy': { '$in': user } };
      const Blog6868 = await deleteBlog(BlogFilter9787);
      const BlogFilter0699 = { 'addedBy': { '$in': user } };
      const Blog4290 = await deleteBlog(BlogFilter0699);
      const userFilter9866 = { 'addedBy': { '$in': user } };
      const user3988 = await deleteUser(userFilter9866);
      const userFilter9662 = { 'updatedBy': { '$in': user } };
      const user2044 = await deleteUser(userFilter9662);
      const userTokensFilter8725 = { 'userId': { '$in': user } };
      const userTokens3459 = await deleteUserTokens(userTokensFilter8725);
      const userTokensFilter1827 = { 'addedBy': { '$in': user } };
      const userTokens6702 = await deleteUserTokens(userTokensFilter1827);
      const userTokensFilter9262 = { 'updatedBy': { '$in': user } };
      const userTokens5697 = await deleteUserTokens(userTokensFilter9262);
      const roleFilter9351 = { 'addedBy': { '$in': user } };
      const role3232 = await deleteRole(roleFilter9351);
      const roleFilter3833 = { 'updatedBy': { '$in': user } };
      const role7876 = await deleteRole(roleFilter3833);
      const projectRouteFilter1415 = { 'addedBy': { '$in': user } };
      const projectRoute4332 = await deleteProjectRoute(projectRouteFilter1415);
      const projectRouteFilter5137 = { 'updatedBy': { '$in': user } };
      const projectRoute6696 = await deleteProjectRoute(projectRouteFilter5137);
      const routeRoleFilter1386 = { 'addedBy': { '$in': user } };
      const routeRole9858 = await deleteRouteRole(routeRoleFilter1386);
      const routeRoleFilter2808 = { 'updatedBy': { '$in': user } };
      const routeRole3821 = await deleteRouteRole(routeRoleFilter2808);
      const userRoleFilter8191 = { 'userId': { '$in': user } };
      const userRole9999 = await deleteUserRole(userRoleFilter8191);
      const userRoleFilter7074 = { 'addedBy': { '$in': user } };
      const userRole7588 = await deleteUserRole(userRoleFilter7074);
      const userRoleFilter6203 = { 'updatedBy': { '$in': user } };
      const userRole3557 = await deleteUserRole(userRoleFilter6203);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter2059 = { 'roleId': { '$in': role } };
      const routeRole3274 = await deleteRouteRole(routeRoleFilter2059);
      const userRoleFilter0767 = { 'roleId': { '$in': role } };
      const userRole4739 = await deleteUserRole(userRoleFilter0767);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter8628 = { 'routeId': { '$in': projectroute } };
      const routeRole6944 = await deleteRouteRole(routeRoleFilter8628);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3542 = { 'updatedBy': { '$in': user } };
      const Blog1849 = await softDeleteBlog(BlogFilter3542, updateBody);
      const BlogFilter4352 = { 'addedBy': { '$in': user } };
      const Blog4849 = await softDeleteBlog(BlogFilter4352, updateBody);
      const userFilter3347 = { 'addedBy': { '$in': user } };
      const user8895 = await softDeleteUser(userFilter3347, updateBody);
      const userFilter5880 = { 'updatedBy': { '$in': user } };
      const user9884 = await softDeleteUser(userFilter5880, updateBody);
      const userTokensFilter4361 = { 'userId': { '$in': user } };
      const userTokens3192 = await softDeleteUserTokens(userTokensFilter4361, updateBody);
      const userTokensFilter7370 = { 'addedBy': { '$in': user } };
      const userTokens4965 = await softDeleteUserTokens(userTokensFilter7370, updateBody);
      const userTokensFilter1855 = { 'updatedBy': { '$in': user } };
      const userTokens0788 = await softDeleteUserTokens(userTokensFilter1855, updateBody);
      const roleFilter5451 = { 'addedBy': { '$in': user } };
      const role5803 = await softDeleteRole(roleFilter5451, updateBody);
      const roleFilter8344 = { 'updatedBy': { '$in': user } };
      const role3877 = await softDeleteRole(roleFilter8344, updateBody);
      const projectRouteFilter1624 = { 'addedBy': { '$in': user } };
      const projectRoute5969 = await softDeleteProjectRoute(projectRouteFilter1624, updateBody);
      const projectRouteFilter8397 = { 'updatedBy': { '$in': user } };
      const projectRoute0955 = await softDeleteProjectRoute(projectRouteFilter8397, updateBody);
      const routeRoleFilter1119 = { 'addedBy': { '$in': user } };
      const routeRole5269 = await softDeleteRouteRole(routeRoleFilter1119, updateBody);
      const routeRoleFilter3397 = { 'updatedBy': { '$in': user } };
      const routeRole0344 = await softDeleteRouteRole(routeRoleFilter3397, updateBody);
      const userRoleFilter5984 = { 'userId': { '$in': user } };
      const userRole6403 = await softDeleteUserRole(userRoleFilter5984, updateBody);
      const userRoleFilter0940 = { 'addedBy': { '$in': user } };
      const userRole6176 = await softDeleteUserRole(userRoleFilter0940, updateBody);
      const userRoleFilter7569 = { 'updatedBy': { '$in': user } };
      const userRole2590 = await softDeleteUserRole(userRoleFilter7569, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6381 = { 'roleId': { '$in': role } };
      const routeRole4793 = await softDeleteRouteRole(routeRoleFilter6381, updateBody);
      const userRoleFilter7539 = { 'roleId': { '$in': role } };
      const userRole3371 = await softDeleteUserRole(userRoleFilter7539, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter3555 = { 'routeId': { '$in': projectroute } };
      const routeRole9392 = await softDeleteRouteRole(routeRoleFilter3555, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
